import { IInsertTagTransactionDTO } from '@domain/tags/dtos/insert-tag-transaction-dto';
import { ITagTransaction } from '@domain/tags/entities/tagTransaction.entity';
import { IInsertTagTransactionRepository } from '@domain/tags/repositories/tag-transactions.repositories/insert-tag-transaction.repository';
import { IFindByTagNumberRepository } from '@domain/tags/repositories/tag.repositories/find-by-tag-number.repository';
import { InsertWebHookUseCase } from './insert-webhook.usecase';
import { BadRequestException } from '@nestjs/common';


// Mock the repositories
class MockInsertTagTransactionRepository implements IInsertTagTransactionRepository {
  async execute(insertDTO: IInsertTagTransactionDTO): Promise<ITagTransaction> {
    return {} as ITagTransaction;
  }
}

class MockFindByTagNumberRepository implements IFindByTagNumberRepository {
  async execute(tagNumber: string): Promise<ITagTransaction | null> {
    return null;
  }
}

describe('InsertWebHookUseCase', () => {
  let insertWebHookUseCase: InsertWebHookUseCase;
  let insertTagTransactionRepo: IInsertTagTransactionRepository;
  let findByTagNumberRepo: IFindByTagNumberRepository;

  beforeEach(() => {
    insertTagTransactionRepo = new MockInsertTagTransactionRepository();
    findByTagNumberRepo = new MockFindByTagNumberRepository();
    insertWebHookUseCase = new InsertWebHookUseCase(insertTagTransactionRepo, findByTagNumberRepo);
  });

  it('should insert tag transaction if tag exists', async () => {
    const insertDTO: IInsertTagTransactionDTO = {
      paymentInstrument: 'tag1',
      id: '',
      transactionId: '',
      transactionOriginId: '',
      postingDate: undefined,
      transactionTypeCode: '',
      transactionDate: undefined,
      creditEntry: false,
      summary: '',
      paymentInstrumentType: '',
      paymentInstrumentTypeCode: 0,
      amount: 0,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
      disputes: []
    };

    // Mock the repository to return a tag for 'tag1'
    findByTagNumberRepo.execute = jest.fn().mockResolvedValue({ tagNumber: 'tag1' });

    const result: ITagTransaction = await insertWebHookUseCase.execute(insertDTO);

    expect(result).toBeDefined();
  });

  it('should throw BadRequestException if tag does not exist', async () => {
    const insertDTO: IInsertTagTransactionDTO = {
      paymentInstrument: 'tag1',
      id: '',
      transactionId: '',
      transactionOriginId: '',
      postingDate: undefined,
      transactionTypeCode: '',
      transactionDate: undefined,
      creditEntry: false,
      summary: '',
      paymentInstrumentType: '',
      paymentInstrumentTypeCode: 0,
      amount: 0,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
      disputes: []
    };

    // Mock the repository to return null for 'tag1'
    findByTagNumberRepo.execute = jest.fn().mockResolvedValue(null);

    await expect(insertWebHookUseCase.execute(insertDTO)).rejects.toThrowError(BadRequestException);
  });
});

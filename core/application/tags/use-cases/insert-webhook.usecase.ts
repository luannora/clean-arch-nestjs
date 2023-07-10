import { IInsertTagTransactionDTO } from '@domain/tags/dtos/insert-tag-transaction-dto';
import { ITagTransaction } from '@domain/tags/entities/tagTransaction.entity';
import { IInsertTagTransactionRepository } from '@domain/tags/repositories/tag-transactions.repositories/insert-tag-transaction.repository';
import { IFindByTagNumberRepository } from '@domain/tags/repositories/tag.repositories/find-by-tag-number.repository';
import { IInsertWebHookUseCase } from '@domain/tags/use-cases/insert-webhook.usecase';
import { BadRequestException } from '@nestjs/common';


export class InsertWebHookUseCase implements IInsertWebHookUseCase {
  constructor(
    private readonly insertTagTransactionRepo: IInsertTagTransactionRepository,
    private readonly findByTagNumberRepo: IFindByTagNumberRepository
  ) { }

  async execute(insertDTO: IInsertTagTransactionDTO): Promise<ITagTransaction> {
    const tag = await this.findByTagNumberRepo.execute(insertDTO.paymentInstrument)

    if (!tag) {
      throw new BadRequestException("Tag não cadastrada")
    }

    const insertedTagTransaction = await this.insertTagTransactionRepo.execute(insertDTO);
    return insertedTagTransaction
  }
}

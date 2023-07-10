import { HttpExceptionEnum } from '@domain/_protocols/errors/http.enum';
import { HttpError } from '@domain/_protocols/errors/http.error';
import { IAccount } from '@domain/account/entities/account.entity';
import { IInsertAccountVersionsRepository } from '@domain/account/repositories/insert-account-versions.repository';
import { IInsertAccountRepository } from '@domain/account/repositories/insert-account.repository';
import { ICreateAccountUseCase } from '@domain/account/use-cases/create-account.usercase';
import { IFindByUUIDUserRepository } from '@domain/user/repositories/find-by-uuid-user.repository';
import { IUpdateUserRepository } from '@domain/user/repositories/update-user.repository';
import { CreateAccountUserCase } from './create-account.usercase';
import { IUser } from '@domain/user/entities/user.entity';
import { MoveTypeEnum } from '@domain/account/entities/account_versions.entity';



// Mock the repositories
class MockInsertAccountRepository implements IInsertAccountRepository {
  async execute(accountData: any): Promise<IAccount | null> {
    return { id: 'account-id', balance: 0, createdAt: null, updatedAt: null } as IAccount;
  }
}

class MockInsertAccountVersionsRepository implements IInsertAccountVersionsRepository {
  async execute(accountVersionData: any): Promise<any | null> {
    return { id: 'account-version-id', account: accountVersionData.account, balance: 0, moveType: MoveTypeEnum.Born, createdAt: null, updatedAt: null };
  }
}

class MockFindByUUIDUserRepository implements IFindByUUIDUserRepository {
  async execute(userId: string): Promise<any | null> {
    return { id: userId };
  }
}

class MockUpdateUserRepository implements IUpdateUserRepository {
  async execute(user: any): Promise<any> { }
}

describe('CreateAccountUserCase', () => {
  let createAccountUserCase: ICreateAccountUseCase;
  let insertAccountRepo: IInsertAccountRepository;
  let insertAccountVersionsRepo: IInsertAccountVersionsRepository;
  let findUserRepo: IFindByUUIDUserRepository;
  let updateUserRepo: IUpdateUserRepository;

  beforeEach(() => {
    insertAccountRepo = new MockInsertAccountRepository();
    insertAccountVersionsRepo = new MockInsertAccountVersionsRepository();
    findUserRepo = new MockFindByUUIDUserRepository();
    updateUserRepo = new MockUpdateUserRepository();
    createAccountUserCase = new CreateAccountUserCase(
      insertAccountRepo,
      insertAccountVersionsRepo,
      findUserRepo,
      updateUserRepo
    );
  });

  it('should create an account for a valid user', async () => {
    const userId = '123';

    const result: IAccount = await createAccountUserCase.execute(userId);

    expect(result).toBeDefined();
  });

  it('should throw an HttpError with NOT_FOUND code if user is not found', async () => {
    const userId = '456';

    // Mock the repository to return null for the user

    findUserRepo.execute = jest.fn().mockImplementation(() => {
      throw new HttpError({
        code: HttpExceptionEnum.NOT_FOUND,
        message:
          'Não foi possivel criar a conta, ID do usuário não localizado: ' +
          userId,
      })
    });

    try {
      await createAccountUserCase.execute(userId)
    } catch (error) {
      await expect(error).rejects.toThrowError(
        new HttpError({
          code: HttpExceptionEnum.NOT_FOUND,
          message:
            'Não foi possivel criar a conta, ID do usuário não localizado: ' +
            userId,
        })


      );
    }
  });

  it('should throw an HttpError with CONFLICT code if account insertion fails', async () => {
    const userId = '789';

    // Mock the repository to return null for the account
    insertAccountRepo.execute = jest.fn().mockResolvedValue(null);

    await expect(createAccountUserCase.execute(userId)).rejects.toThrowError(
      new HttpError({
        code: HttpExceptionEnum.CONFLICT,
        message: 'Falha ao inserir account: UserID: ' + userId,
      })
    );
  });

  it('should throw an HttpError with CONFLICT code if account version insertion fails', async () => {
    const userId = '101112';

    // Mock the repository to return null for the account version
    insertAccountVersionsRepo.execute = jest.fn().mockResolvedValue(null);

    await expect(createAccountUserCase.execute(userId)).rejects.toThrowError(
      new HttpError({
        code: HttpExceptionEnum.CONFLICT,
        message: 'Falha ao inserir account version: UserID: ' + userId,
      })
    );
  });
});
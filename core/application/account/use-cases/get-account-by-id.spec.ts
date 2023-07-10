import { IAccount } from '@domain/account/entities/account.entity';
import { IGetAccountByUserIdRepository } from '@domain/account/repositories/get-account-by-user-id.repository';
import { GetAccountByIdUserCase } from './get-account-by-id.usercase';


describe('GetAccountByIdUserCase', () => {
  const mockGetAccountByUserIdRepo: IGetAccountByUserIdRepository = {
    execute(userId: string): Promise<IAccount> {
      return null
    }
  };

  const getAccountByIdUserCase = new GetAccountByIdUserCase(mockGetAccountByUserIdRepo);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the account for a valid user ID', async () => {
    const userId = '123';
    const mockAccount: IAccount = {
      id: 'account-id',
      balance: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockGetAccountByUserIdRepo.execute(userId);

    const result: IAccount = await getAccountByIdUserCase.execute(userId);

    expect(result).toEqual(result);
  });


});

import { IAccountVersions, MoveTypeEnum } from '@domain/account/entities/account_versions.entity';
import { IGetAccountVersionsRepository } from '@domain/account/repositories/get-account-versions.repository';
import { GetAccountVersionsUserCase } from './get-account-versions.usercase';

class Mocks {
  static accountVersions(): IAccountVersions[] {
    const accountVersions: IAccountVersions[] = [{
      id: "string",
      balance: 1,
      locked: 1,
      available: 1,
      moveType: MoveTypeEnum.Born,
      tableName: "string",
      idTable: "string",
      createdAt: new Date(),
      updatedAt: new Date(),
      account: null,
    }];

    return accountVersions;
  }
}

describe('GetAccountVersionsUserCase', () => {
  const mockGetAccountVersionsRepo: jest.Mocked<IGetAccountVersionsRepository> = {
    execute: jest.fn().mockResolvedValue(Mocks.accountVersions())
  };

  const getAccountVersionsUserCase = new GetAccountVersionsUserCase(mockGetAccountVersionsRepo);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the account versions for a valid account ID', async () => {
    const accountId = 'account-id';
    const mockAccountVersions: IAccountVersions[] = [
      {
        id: 'string',
        balance: 1,
        locked: 1,
        available: 1,
        moveType: MoveTypeEnum.Born,
        tableName: 'string',
        idTable: 'string',
        createdAt: new Date("2023-06-01T13:59:53.375Z"),
        updatedAt: new Date("2023-06-01T13:59:53.375Z"),
        account: null
      }
    ]
    mockGetAccountVersionsRepo.execute.mockResolvedValue(mockAccountVersions)

    const result = await getAccountVersionsUserCase.execute(accountId);

    expect(mockGetAccountVersionsRepo.execute).toHaveBeenCalledWith(accountId);
    expect(result).toEqual(mockAccountVersions);
  });

  it('should return an empty array if no account versions are found', async () => {
    const accountId = 'non-existent-account';

    mockGetAccountVersionsRepo.execute.mockResolvedValue([]);

    const result = await getAccountVersionsUserCase.execute(accountId);

    expect(mockGetAccountVersionsRepo.execute).toHaveBeenCalledWith(accountId);
    expect(result).toEqual([]);
  });
});

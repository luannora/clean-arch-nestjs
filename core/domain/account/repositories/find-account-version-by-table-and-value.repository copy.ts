import { IAccountVersions } from '../entities/account_versions.entity';

export interface IFindAccountVersionsByTableAndValueRepository {
  execute(
    accountId: string,
    moveType: string,
    balance: number,
    tableId: string,
    tableName: string,
  ): Promise<IAccountVersions>;
}

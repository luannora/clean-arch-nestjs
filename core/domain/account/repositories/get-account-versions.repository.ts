import { IAccount } from '../entities/account.entity';
import { IAccountVersions } from '../entities/account_versions.entity';

export interface IGetAccountVersionsRepository {
  execute(accountId): Promise<IAccountVersions[]>;
}

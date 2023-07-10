import { IAccount } from '../entities/account.entity';
import { IAccountVersions } from '../entities/account_versions.entity';

export interface IGetAccountVersionsUseCase {
  execute(accountId: string): Promise<IAccountVersions[]>;
}

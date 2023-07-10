import { IAccountVersions } from '../entities/account_versions.entity';

export interface IInsertAccountVersionsRepository {
  execute(insertDTO: IAccountVersions): Promise<IAccountVersions>;
}

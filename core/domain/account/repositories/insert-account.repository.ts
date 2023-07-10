import { IAccount } from '../entities/account.entity';

export interface IInsertAccountRepository {
  execute(insertDTO: IAccount): Promise<IAccount>;
}

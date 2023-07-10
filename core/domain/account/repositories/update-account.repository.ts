import { IAccount } from '../entities/account.entity';

export interface IUpdateAccountRepository {
  execute(updateDTO: IAccount): Promise<IAccount>;
}

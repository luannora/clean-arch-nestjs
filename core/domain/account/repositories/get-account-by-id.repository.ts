import { IAccount } from '../entities/account.entity';

export interface IGetAccountByIdRepository {
  execute(accountId): Promise<IAccount>;
}

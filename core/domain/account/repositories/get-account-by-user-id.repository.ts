import { IAccount } from '../entities/account.entity';

export interface IGetAccountByUserIdRepository {
  execute(userId: string): Promise<IAccount>;
}

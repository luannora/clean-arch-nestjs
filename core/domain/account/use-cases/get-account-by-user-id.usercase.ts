import { IAccount } from '../entities/account.entity';

export interface IGetAccountByUserIdUseCase {
  execute(userId: string): Promise<IAccount>;
}

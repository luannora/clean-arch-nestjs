import { IAccount } from '../entities/account.entity';

export interface ICreateAccountUseCase {
  execute(userId: string): Promise<IAccount>;
}

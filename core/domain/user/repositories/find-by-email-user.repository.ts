import { IUser } from '../entities/user.entity';

export interface IFindByEmailUserRepository {
  execute(email: string): Promise<IUser>;
}

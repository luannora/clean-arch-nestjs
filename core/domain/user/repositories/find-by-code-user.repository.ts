import { IUser } from '../entities/user.entity';

export interface IFindByCodeUserRepository {
  execute(code: string): Promise<IUser>;
}

import { IUser } from '../entities/user.entity';

export interface IFindByUUIDUserRepository {
  execute(uuid: string): Promise<IUser>;
}

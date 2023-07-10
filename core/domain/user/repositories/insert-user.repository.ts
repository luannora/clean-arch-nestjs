import { IUser } from '../entities/user.entity';

export interface IInsertUserRepository {
  execute(userDTO: IUser): Promise<IUser>;
}

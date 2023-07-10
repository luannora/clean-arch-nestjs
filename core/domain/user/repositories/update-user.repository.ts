import { IUser } from '../entities/user.entity';

export interface IUpdateUserRepository {
  execute(userDTO: IUser): Promise<IUser>;
}

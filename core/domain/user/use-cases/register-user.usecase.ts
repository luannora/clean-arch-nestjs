import { IRegisterUserDTO } from '../dtos/register-user.dto';
import { IUser } from '../entities/user.entity';

export interface IRegisterUserUseCase {
  execute(userDTO: IRegisterUserDTO): Promise<IUser>;
}

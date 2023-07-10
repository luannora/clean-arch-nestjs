import { ILoginDTO } from '../dtos/login.dto';
import { IUser } from '../entities/user.entity';

export interface ILoginUserUseCase {
  execute(userDTO: ILoginDTO): Promise<IUser>;
}

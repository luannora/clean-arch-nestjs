import { IRedefinePasswordDTO } from '../dtos/redefinePasswordDTO';
import { IUser } from '../entities/user.entity';

export interface IRedefinePasswordUseCase {
  execute(redefinePasswordDTO: IRedefinePasswordDTO): Promise<IUser>;
}

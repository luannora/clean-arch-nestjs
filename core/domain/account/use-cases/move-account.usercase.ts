import { IMovementAccountDto } from '../dto/movement-account.dto';
import { IAccount } from '../entities/account.entity';

export interface IMoveAccountUseCase {
  execute(paramsDTO: IMovementAccountDto): Promise<IAccount>;
}

import { IPasswordRecoveryDTO } from '../dtos/password-recovery.dto';

export interface IPasswordRecoveryUseCase {
  execute(passwordRecoveryDTO: IPasswordRecoveryDTO): Promise<string>;
}

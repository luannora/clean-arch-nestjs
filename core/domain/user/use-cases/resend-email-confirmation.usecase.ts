import { IResendEmailConfirmationDTO } from '../dtos/resend-email-confirmation.dto';

export interface IResendEmailConfirmationUseCase {
  execute(data: IResendEmailConfirmationDTO): Promise<boolean>;
}

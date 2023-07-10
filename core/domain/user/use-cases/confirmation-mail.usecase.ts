import { IConfirmationMailDTO } from '../dtos/confirmation-mail.dto';

export interface IConfirmationMailUseCase {
  execute(data: IConfirmationMailDTO): Promise<boolean>;
}

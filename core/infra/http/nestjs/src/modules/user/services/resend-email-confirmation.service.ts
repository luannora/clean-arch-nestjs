/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { IResendEmailConfirmationUseCase } from '@domain/user/use-cases/resend-email-confirmation.usecase';
import { ResendConfirmationEmailDTO } from '../dtos/resend-confirmation-email.dto';

@Injectable()
export class ResendEmailConfirmationService {
  constructor(
    private readonly resendConfirmationEmailUC: IResendEmailConfirmationUseCase,
  ) {}

  async execute(params: ResendConfirmationEmailDTO) {
    return await this.resendConfirmationEmailUC.execute(params);
  }
}

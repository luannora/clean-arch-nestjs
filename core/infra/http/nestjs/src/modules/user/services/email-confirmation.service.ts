/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { IConfirmationMailUseCase } from '@domain/user/use-cases/confirmation-mail.usecase';
import { ConfirmationEmailDTO } from '../dtos/confirmation-email.dto';

@Injectable()
export class EmailConfirmationService {
  constructor(private readonly confirmationEmailUC: IConfirmationMailUseCase) {}

  async execute(params: ConfirmationEmailDTO) {
    return await this.confirmationEmailUC.execute(params);
  }
}

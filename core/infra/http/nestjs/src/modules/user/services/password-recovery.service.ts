/*
https://docs.nestjs.com/providers#services
*/
import { Injectable } from '@nestjs/common';
import { IPasswordRecoveryUseCase } from '@domain/user/use-cases/password-recovery.usecase';
import { PasswordRecoveryDTO } from '../dtos/passoword-recovery.dto';

@Injectable()
export class PasswordRecoveryService {
  constructor(private readonly passwordRecoveryUC: IPasswordRecoveryUseCase) {}

  async execute(params: PasswordRecoveryDTO) {
    return await this.passwordRecoveryUC.execute(params);
  }
}

/*
https://docs.nestjs.com/providers#services
*/

import { IRegisterUserUseCase } from '@domain/user/use-cases/register-user.usecase';
import { Injectable } from '@nestjs/common';
import { RegisterUserDTO } from '../dtos/register-user.dto';

@Injectable()
export class RegisterUserService {
  constructor(private readonly registerUC: IRegisterUserUseCase) {}

  async execute(params: RegisterUserDTO) {
    return await this.registerUC.execute(params);
  }
}

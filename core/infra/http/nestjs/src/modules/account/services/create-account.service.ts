import { ICreateAccountUseCase } from '@domain/account/use-cases/create-account.usercase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAccountService {
  constructor(private readonly createAccountUC: ICreateAccountUseCase) {}

  async execute(userId: string) {
    return await this.createAccountUC.execute(userId);
  }
}

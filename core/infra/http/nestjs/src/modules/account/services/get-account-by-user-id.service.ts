import { IGetAccountByUserIdUseCase } from '@domain/account/use-cases/get-account-by-user-id.usercase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAccountByUserIdService {
  constructor(
    private readonly getAccountByUserIdUC: IGetAccountByUserIdUseCase,
  ) {}

  async execute(userId: string) {
    return await this.getAccountByUserIdUC.execute(userId);
  }
}

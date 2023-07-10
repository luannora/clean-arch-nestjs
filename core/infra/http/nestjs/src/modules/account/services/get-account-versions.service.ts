import { IAccount } from '@domain/account/entities/account.entity';
import { IGetAccountVersionsUseCase } from '@domain/account/use-cases/get-account-versions.usercase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAccountVersionsService {
  constructor(
    private readonly getAccountVersionsUC: IGetAccountVersionsUseCase,
  ) {}

  async execute(accountId: string) {
    return await this.getAccountVersionsUC.execute(accountId);
  }
}

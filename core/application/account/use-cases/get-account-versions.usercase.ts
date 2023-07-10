import { IAccountVersions } from '@domain/account/entities/account_versions.entity';
import { IGetAccountVersionsRepository } from '@domain/account/repositories/get-account-versions.repository';
import { IGetAccountVersionsUseCase } from '@domain/account/use-cases/get-account-versions.usercase';

export class GetAccountVersionsUserCase implements IGetAccountVersionsUseCase {
  constructor(
    private readonly getAccountVersionRepo: IGetAccountVersionsRepository,
  ) {}

  async execute(accountId: string): Promise<IAccountVersions[]> {
    const result = await this.getAccountVersionRepo.execute(accountId);
    return result;
  }
}

import { Inject } from '@nestjs/common';
import { RepositoryProxyModule } from 'core/infra/http/nestjs/src/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import { IAccount } from '@domain/account/entities/account.entity';
import { IAccountVersions } from '@domain/account/entities/account_versions.entity';
import { IGetAccountVersionsRepository } from '@domain/account/repositories/get-account-versions.repository';

export class GetAccountVersionsRepository
  implements IGetAccountVersionsRepository
{
  constructor(
    @Inject(RepositoryProxyModule.ACCOUNT_VERSIONS_REPOSITORY)
    private readonly accountVersionsRepo: Repository<IAccountVersions>,
  ) {}

  async execute(accountId: string): Promise<IAccountVersions[]> {
    let result = await this.accountVersionsRepo
      .createQueryBuilder('account_versions')
      .where('"account_id" = :accountId', {
        accountId: accountId,
      })
      .orderBy('created_at', 'DESC')
      .getMany();
    return result;
  }
}

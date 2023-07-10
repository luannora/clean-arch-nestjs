import { Inject } from '@nestjs/common';
import { RepositoryProxyModule } from 'core/infra/http/nestjs/src/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import { IAccount } from '@domain/account/entities/account.entity';
import { IGetAccountByIdRepository } from '@domain/account/repositories/get-account-by-id.repository';

export class GetAccountByIdRepository implements IGetAccountByIdRepository {
  constructor(
    @Inject(RepositoryProxyModule.ACCOUNT_REPOSITORY)
    private readonly accountRepo: Repository<IAccount>,
  ) {}

  async execute(accountId: string): Promise<IAccount> {
    let result = await this.accountRepo
      .createQueryBuilder('account')
      .where('id = :accountId', {
        accountId: accountId,
      })
      .getOne();

    return result;
  }
}

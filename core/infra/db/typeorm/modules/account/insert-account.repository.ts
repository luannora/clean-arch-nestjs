import { Inject } from '@nestjs/common';
import { RepositoryProxyModule } from 'core/infra/http/nestjs/src/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import { IInsertAccountRepository } from '@domain/account/repositories/insert-account.repository';
import { IAccount } from '@domain/account/entities/account.entity';

export class InsertAccountRepository implements IInsertAccountRepository {
  constructor(
    @Inject(RepositoryProxyModule.ACCOUNT_REPOSITORY)
    private readonly accountRepo: Repository<IAccount>,
  ) {}

  async execute(insertDTO: IAccount): Promise<IAccount> {
    const accId = (await this.accountRepo.save(insertDTO)).id;
    return this.accountRepo.findOne({
      where: { id: accId },
    });
  }
}

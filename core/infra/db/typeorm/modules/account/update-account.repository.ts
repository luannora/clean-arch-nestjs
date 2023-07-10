import { Inject } from '@nestjs/common';
import { RepositoryProxyModule } from 'core/infra/http/nestjs/src/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import { IAccount } from '@domain/account/entities/account.entity';
import { IUpdateAccountRepository } from '@domain/account/repositories/update-account.repository';

export class UpdateAccountRepository implements IUpdateAccountRepository {
  constructor(
    @Inject(RepositoryProxyModule.ACCOUNT_REPOSITORY)
    private readonly accountRepo: Repository<IAccount>,
  ) {}

  async execute(insertDTO: IAccount): Promise<IAccount> {
    if (!insertDTO.id) return null;
    const { affected } = await this.accountRepo.update(insertDTO.id, insertDTO);
    if (affected === 0) return null;
    return this.accountRepo.findOne({ where: { id: insertDTO.id } });
  }
}

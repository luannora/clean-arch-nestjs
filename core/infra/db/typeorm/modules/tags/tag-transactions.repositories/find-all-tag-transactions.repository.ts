import { ITagTransaction } from '@domain/tags/entities/tagTransaction.entity';
import { IFindAllTagTransactionsRepository } from '@domain/tags/repositories/tag-transactions.repositories/find-all-tag-transactions.repository';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class FindAllTagTransactionsRepository
  implements IFindAllTagTransactionsRepository {
  constructor(
    @Inject(RepositoryProxyModule.TAG_TRANSACTIONS_REPOSITORY)
    private readonly tagTransactionsRepo: Repository<ITagTransaction>,
  ) { }

  async execute(): Promise<ITagTransaction[]> {
    let tagTrasactions = await this.tagTransactionsRepo.find()
    return tagTrasactions;
  }
}

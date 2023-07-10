import { ITagTransaction } from '@domain/tags/entities/tagTransaction.entity';
import { IGetTagTransactionByIdRepository } from '@domain/tags/repositories/tag-transactions.repositories/get-tag-transaction-by-id.repository';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class GetTagTransactionByIdRepository
  implements IGetTagTransactionByIdRepository {
  constructor(
    @Inject(RepositoryProxyModule.TAG_TRANSACTIONS_REPOSITORY)
    private readonly tagTransactionsRepo: Repository<ITagTransaction>,
  ) { }

  async execute(tagTransactionsId: string): Promise<ITagTransaction> {
    let tagTransaction = await this.tagTransactionsRepo.findOne({ where: { id: tagTransactionsId } })
    return tagTransaction;
  }
}

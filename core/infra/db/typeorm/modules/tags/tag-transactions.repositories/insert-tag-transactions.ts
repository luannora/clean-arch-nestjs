import { ITagTransaction } from '@domain/tags/entities/tagTransaction.entity';
import { IInsertTagTransactionRepository } from '@domain/tags/repositories/tag-transactions.repositories/insert-tag-transaction.repository';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class InsertTagTransactionsRepository implements IInsertTagTransactionRepository {
  constructor(
    @Inject(RepositoryProxyModule.TAG_TRANSACTIONS_REPOSITORY)
    private readonly tagTransactionsRepo: Repository<ITagTransaction>,
  ) { }

  async execute(insertDTO: ITagTransaction): Promise<ITagTransaction> {
    const tagTransactionId = (await this.tagTransactionsRepo.save(insertDTO)).id;
    return this.tagTransactionsRepo.findOne({
      where: { id: tagTransactionId },
    });
  }
}
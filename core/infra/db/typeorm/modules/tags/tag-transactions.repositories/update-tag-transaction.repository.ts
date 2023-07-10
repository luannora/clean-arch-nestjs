import { ITagTransaction } from '@domain/tags/entities/tagTransaction.entity';
import { IUpdateTagTransactionRepository } from '@domain/tags/repositories/tag-transactions.repositories/update-tag-transaction.repository';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class UpdateTagTransactionRepository implements IUpdateTagTransactionRepository {
  constructor(
    @Inject(RepositoryProxyModule.TAG_TRANSACTIONS_REPOSITORY)
    private readonly tagTransactionsRepo: Repository<ITagTransaction>,
  ) { }

  async execute(insertDTO: ITagTransaction): Promise<ITagTransaction> {
    if (!insertDTO.id) return null;
    const { affected } = await this.tagTransactionsRepo.update(insertDTO.id, insertDTO);
    if (affected === 0) return null;
    return this.tagTransactionsRepo.findOne({ where: { id: insertDTO.id } });
  }
}
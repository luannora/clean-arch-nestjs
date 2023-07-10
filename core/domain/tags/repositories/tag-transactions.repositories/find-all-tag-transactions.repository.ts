import { ITagTransaction } from '@domain/tags/entities/tagTransaction.entity';

export interface IFindAllTagTransactionsRepository {
  execute(): Promise<ITagTransaction[]>;
}
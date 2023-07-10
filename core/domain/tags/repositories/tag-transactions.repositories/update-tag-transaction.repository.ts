import { ITagTransaction } from '@domain/tags/entities/tagTransaction.entity';

export interface IUpdateTagTransactionRepository {
  execute(updateDTO: ITagTransaction): Promise<ITagTransaction>;
}

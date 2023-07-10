import { ITagTransaction } from '@domain/tags/entities/tagTransaction.entity';

export interface IInsertTagTransactionRepository {
  execute(insertDTO: ITagTransaction): Promise<ITagTransaction>;
}

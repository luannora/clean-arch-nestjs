import { IInsertTagTransactionDTO } from '../dtos/insert-tag-transaction-dto';
import { ITagTransaction } from '../entities/tagTransaction.entity';

export interface IInsertWebHookUseCase {
  execute(tagTransactionDTO: IInsertTagTransactionDTO): Promise<ITagTransaction>;
}

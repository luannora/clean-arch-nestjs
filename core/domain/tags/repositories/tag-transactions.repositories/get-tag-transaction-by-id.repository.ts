import { ITagTransaction } from '@domain/tags/entities/tagTransaction.entity';


export interface IGetTagTransactionByIdRepository {
  execute(tagTransactionId: string): Promise<ITagTransaction>;
}

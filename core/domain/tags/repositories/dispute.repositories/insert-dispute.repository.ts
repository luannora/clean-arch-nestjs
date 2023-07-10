import { IDispute } from '@domain/tags/entities/dispute.entity';
import { ITag } from '../../entities/tags.entity';

export interface IInsertDisputeRepository {
  execute(insertDTO: IDispute): Promise<IDispute>;
}

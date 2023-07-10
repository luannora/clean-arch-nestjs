import { IDispute } from '@domain/tags/entities/dispute.entity';

export interface IUpdateDisputeRepository {
  execute(updateDTO: IDispute): Promise<IDispute>;
}

import { IDispute } from '@domain/tags/entities/dispute.entity';

export interface IGetDisputeByIdRepository {
  execute(disputeId: string): Promise<IDispute>;
}

import { IDispute } from '@domain/tags/entities/dispute.entity';

export interface IFindAllDisputesRepository {
  execute(): Promise<IDispute[]>;
}

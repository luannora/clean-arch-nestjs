import { IDispute } from '@domain/tags/entities/dispute.entity';
import { IGetDisputeByIdRepository } from '@domain/tags/repositories/dispute.repositories/get-dispute-by-id.repository';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class GetDisputeByIdRepository
  implements IGetDisputeByIdRepository {
  constructor(
    @Inject(RepositoryProxyModule.DISPUTE_REPOSITORY)
    private readonly disputeRepo: Repository<IDispute>,
  ) { }

  async execute(disputeId: string): Promise<IDispute> {
    let dispute = await this.disputeRepo.findOne({ where: { id: disputeId } })
    return dispute;
  }
}

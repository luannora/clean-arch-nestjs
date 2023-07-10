import { IDispute } from '@domain/tags/entities/dispute.entity';
import { IFindAllDisputesRepository } from '@domain/tags/repositories/dispute.repositories/find-all-disputes.repository';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class FindAllDisputeRepository
  implements IFindAllDisputesRepository {
  constructor(
    @Inject(RepositoryProxyModule.DISPUTE_REPOSITORY)
    private readonly disputeRepo: Repository<IDispute>,
  ) { }

  async execute(): Promise<IDispute[]> {
    let disputes = await this.disputeRepo.find()
    return disputes;
  }
}

import { IDispute } from '@domain/tags/entities/dispute.entity';
import { IInsertDisputeRepository } from '@domain/tags/repositories/dispute.repositories/insert-dispute.repository';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class InsertDisputeRepository implements IInsertDisputeRepository {
  constructor(
    @Inject(RepositoryProxyModule.DISPUTE_REPOSITORY)
    private readonly disputeRepo: Repository<IDispute>,
  ) { }

  async execute(insertDTO: IDispute): Promise<IDispute> {
    const disputeId = (await this.disputeRepo.save(insertDTO)).id;
    return this.disputeRepo.findOne({
      where: { id: disputeId },
    });
  }
}
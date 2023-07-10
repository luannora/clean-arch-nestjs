import { IDispute } from '@domain/tags/entities/dispute.entity';
import { IUpdateDisputeRepository } from '@domain/tags/repositories/dispute.repositories/update-dispute.repository';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class UpdateDisputeRepository implements IUpdateDisputeRepository {
  constructor(
    @Inject(RepositoryProxyModule.DISPUTE_REPOSITORY)
    private readonly disputeRepo: Repository<IDispute>,
  ) { }

  async execute(insertDTO: IDispute): Promise<IDispute> {
    if (!insertDTO.id) return null;
    const { affected } = await this.disputeRepo.update(insertDTO.id, insertDTO);
    if (affected === 0) return null;
    return this.disputeRepo.findOne({ where: { id: insertDTO.id } });
  }
}
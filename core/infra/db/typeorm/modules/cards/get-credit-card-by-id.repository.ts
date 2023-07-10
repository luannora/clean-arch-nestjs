import { ICreditCard } from '@domain/cards/entities/credit_card.entity';
import { IGetcreditCardByIdRepository } from '@domain/cards/repositories/get-cred-card-by-id.repository';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class GetCreditCardByIdRepository
  implements IGetcreditCardByIdRepository {
  constructor(
    @Inject(RepositoryProxyModule.CREDIT_CARDS_REPOSITORY)
    private readonly creditCardRepo: Repository<ICreditCard>,
  ) { }

  async execute(creditCardId: string): Promise<ICreditCard> {
    return await this.creditCardRepo.findOne({ where: { id: creditCardId } })
  }
}
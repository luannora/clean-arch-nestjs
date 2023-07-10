import { ICreditCard } from '@domain/cards/entities/credit_card.entity';
import { IFindAllCreditCardsRepository } from '@domain/cards/repositories/find-all-cred-cards.repository';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class FindAllCreditCardsRepository
  implements IFindAllCreditCardsRepository {
  constructor(
    @Inject(RepositoryProxyModule.CREDIT_CARDS_REPOSITORY)
    private readonly creditCardRepo: Repository<ICreditCard>,
  ) { }

  async execute(): Promise<ICreditCard[]> {
    let creditCards = await this.creditCardRepo.find()
    return creditCards;
  }
}

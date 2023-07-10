import { ICreditCard } from '@domain/cards/entities/credit_card.entity';
import { IInsertCreditCardRepository } from '@domain/cards/repositories/insert-credit-card.repository';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class InsertCreditCardRepository implements IInsertCreditCardRepository {
  constructor(
    @Inject(RepositoryProxyModule.CREDIT_CARDS_REPOSITORY)
    private readonly creditCardRepo: Repository<ICreditCard>,
  ) {}

  async execute(insertDTO: ICreditCard): Promise<ICreditCard> {
    const id = (await this.creditCardRepo.save(insertDTO)).id;
    return this.creditCardRepo.findOne({
      where: { id: id },
    });
  }
}

import { ICreditCard } from '@domain/cards/entities/credit_card.entity';
import { IUpdateCreditCardRepository } from '@domain/cards/repositories/update-credit-card.repository';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class UpdateCreditCardRepository implements IUpdateCreditCardRepository {
  constructor(
    @Inject(RepositoryProxyModule.CREDIT_CARDS_REPOSITORY)
    private readonly creditCardRepo: Repository<ICreditCard>,
  ) {}

  async execute(insertDTO: ICreditCard): Promise<ICreditCard> {
    if (!insertDTO.id) return null;
    const { affected } = await this.creditCardRepo.update(
      insertDTO.id,
      insertDTO,
    );
    if (affected === 0) return null;
    return this.creditCardRepo.findOne({ where: { id: insertDTO.id } });
  }
}

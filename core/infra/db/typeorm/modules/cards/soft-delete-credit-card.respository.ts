import { ICreditCard } from '@domain/cards/entities/credit_card.entity';
import { ISoftDeleteCreditCardRepository } from '@domain/cards/repositories/soft-delete-cred-card.repository';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class SoftDeleteCreditCardRepository implements ISoftDeleteCreditCardRepository {
  constructor(
    @Inject(RepositoryProxyModule.CREDIT_CARDS_REPOSITORY)
    private readonly creditCardrepo: Repository<ICreditCard>,
  ) { }

  async execute(id: string): Promise<boolean> {
    let result = await this.creditCardrepo.softDelete(id);

    if (result.affected != 0) {
      return true;
    } else {
      return false;
    }
  }
}

import { ICreditCard } from '../entities/credit_card.entity';

export interface IUpdateCreditCardRepository {
  execute(updateDTO: ICreditCard): Promise<ICreditCard>;
}

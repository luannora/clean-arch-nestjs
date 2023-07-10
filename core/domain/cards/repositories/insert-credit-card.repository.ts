import { ICreditCard } from '../entities/credit_card.entity';

export interface IInsertCreditCardRepository {
  execute(insertDTO: ICreditCard): Promise<ICreditCard>;
}

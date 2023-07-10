import { ICreditCard } from '../entities/credit_card.entity';

export interface IFindAllCreditCardsRepository {
  execute(): Promise<ICreditCard[]>;
}

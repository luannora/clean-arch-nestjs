import { ICreditCard } from '../entities/credit_card.entity';

export interface IGetcreditCardByIdRepository {
  execute(credit_card_id: string): Promise<ICreditCard>;
}

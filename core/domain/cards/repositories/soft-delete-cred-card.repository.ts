export interface ISoftDeleteCreditCardRepository {
  execute(credCardId: string): Promise<boolean>;
}

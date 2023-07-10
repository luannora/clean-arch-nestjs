import { IAccount } from '@domain/account/entities/account.entity';
import { IGetAccountByUserIdRepository } from '@domain/account/repositories/get-account-by-user-id.repository';
import { IGetAccountByUserIdUseCase } from '@domain/account/use-cases/get-account-by-user-id.usercase';

export class GetAccountByIdUserCase implements IGetAccountByUserIdUseCase {
  constructor(
    private readonly getAccountByUserIdRepo: IGetAccountByUserIdRepository,
  ) {}

  async execute(userId: string): Promise<IAccount> {
    const result = await this.getAccountByUserIdRepo.execute(userId);
    return result;
  }
}

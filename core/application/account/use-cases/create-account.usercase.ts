import { HttpExceptionEnum } from '@domain/_protocols/errors/http.enum';
import { HttpError } from '@domain/_protocols/errors/http.error';
import { IAccount } from '@domain/account/entities/account.entity';
import { MoveTypeEnum } from '@domain/account/entities/account_versions.entity';
import { IInsertAccountVersionsRepository } from '@domain/account/repositories/insert-account-versions.repository';
import { IInsertAccountRepository } from '@domain/account/repositories/insert-account.repository';
import { ICreateAccountUseCase } from '@domain/account/use-cases/create-account.usercase';
import { IFindByUUIDUserRepository } from '@domain/user/repositories/find-by-uuid-user.repository';
import { IUpdateUserRepository } from '@domain/user/repositories/update-user.repository';

export class CreateAccountUserCase implements ICreateAccountUseCase {
  constructor(
    private readonly insertAccountRepo: IInsertAccountRepository,
    private readonly insertAccountVersionsRepo: IInsertAccountVersionsRepository,
    private readonly findUserRepo: IFindByUUIDUserRepository,
    private readonly updateUserRepo: IUpdateUserRepository,
  ) {}

  async execute(userId: string): Promise<IAccount> {
    const user = await this.findUserRepo.execute(userId);

    if (!user) {
      throw new HttpError({
        code: HttpExceptionEnum.NOT_FOUND,
        message:
          'Não foi possivel criar a conta, ID do usuário não localizado: ' +
          userId,
      });
    }

    const account = await this.insertAccountRepo.execute({});

    if (!account) {
      throw new HttpError({
        code: HttpExceptionEnum.CONFLICT,
        message: 'Falha ao inserir account: UserID: ' + userId,
      });
    }

    const accountV = await this.insertAccountVersionsRepo.execute({
      account: account,
      balance: 0,
      moveType: MoveTypeEnum.Born,
    });

    if (!accountV) {
      throw new HttpError({
        code: HttpExceptionEnum.CONFLICT,
        message: 'Falha ao inserir account version: UserID: ' + userId,
      });
    }

    user.account = account;
    await this.updateUserRepo.execute(user);

    return account;
  }
}

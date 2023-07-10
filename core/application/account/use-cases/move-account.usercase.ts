import { HttpExceptionEnum } from '@domain/_protocols/errors/http.enum';
import { HttpError } from '@domain/_protocols/errors/http.error';
import { IMovementAccountDto } from '@domain/account/dto/movement-account.dto';
import { IAccount } from '@domain/account/entities/account.entity';
import { MoveTypeEnum } from '@domain/account/entities/account_versions.entity';
import { IFindAccountVersionsByTableAndValueRepository } from '@domain/account/repositories/find-account-version-by-table-and-value.repository copy';
import { IGetAccountByIdRepository } from '@domain/account/repositories/get-account-by-id.repository';
import { IInsertAccountVersionsRepository } from '@domain/account/repositories/insert-account-versions.repository';
import { IUpdateAccountRepository } from '@domain/account/repositories/update-account.repository';
import { IMoveAccountUseCase } from '@domain/account/use-cases/move-account.usercase';

export class MoveAccountUseCase implements IMoveAccountUseCase {
  constructor(
    private readonly insertAccountVersionRepo: IInsertAccountVersionsRepository,
    private readonly updateAccountRepo: IUpdateAccountRepository,
    private readonly findAccountByIdRepo: IGetAccountByIdRepository,
    private readonly findAccountVersionByTableAndValue: IFindAccountVersionsByTableAndValueRepository,
  ) {}

  async execute(paramsDTO: IMovementAccountDto): Promise<IAccount> {
    try {
      let result = await this.findAccountByIdRepo.execute(paramsDTO.accountId);

      if (!result) {
        throw 'Não foi possível localizar account';
      }

      await this.checkDuplicated(paramsDTO, result);

      switch (paramsDTO.moveType) {
        case MoveTypeEnum.Credit:
          await this.credit(paramsDTO, result);
          break;
        case MoveTypeEnum.Debit:
          await this.debit(paramsDTO, result);
          break;
        case MoveTypeEnum.Lock:
          await this.lock(paramsDTO, result);

          break;
        case MoveTypeEnum.Unlock:
          await this.unlock(paramsDTO, result);
          break;
      }

      result = await this.findAccountByIdRepo.execute(paramsDTO.accountId);

      return result;
    } catch (error) {
      throw new HttpError({
        code: HttpExceptionEnum.BAD_REQUEST,
        message: error,
      });
    }
  }

  private async credit(params: IMovementAccountDto, account: IAccount) {
    await this.doMovement(params, account);
  }

  private async debit(params: IMovementAccountDto, account: IAccount) {
    params.value = params.value * -1;
    await this.checkMovement(params, account);
    await this.doMovement(params, account);
  }

  private async lock(params: IMovementAccountDto, account: IAccount) {
    await this.doLock(params, account);
  }

  private async unlock(params: IMovementAccountDto, account: IAccount) {
    await this.doUnlock(params, account);
  }

  private async checkMovement(params: IMovementAccountDto, account: IAccount) {
    account.available = +account.available;
    account.locked = +account.locked;
    account.balance = +account.balance;
    let afterMovement = account.available + params.value;

    // Regra de negócio: Saldo não pode ser negativo, caso necessário pode remover e colocar em outro use case
    if (afterMovement < 0) {
      throw 'Saldo insuficiente';
    } else {
      return true;
    }
  }

  private async checkDuplicated(
    params: IMovementAccountDto,
    account: IAccount,
  ) {
    // Prevenindo movimentos duplicados
    let checkDuplicated = await this.findAccountVersionByTableAndValue.execute(
      account.id,
      params.moveType,
      params.value,
      params.tableId,
      params.tableName,
    );
    if (checkDuplicated) {
      throw 'Falha ao realizar operação movimento duplicado';
    }
  }

  private async doMovement(params: IMovementAccountDto, account: IAccount) {
    let balance: number = +account.balance;
    let locked: number = account.locked;
    let available: number = account.available;

    balance = balance + Number(params.value);
    available = balance - locked;

    await this.updateAccountRepo.execute({
      id: params.accountId,
      balance,
      locked,
      available,
    });

    let insertMovAccVersion = {
      available: 0,
      locked: 0,
      balance: params.value,
      moveType: params.moveType,
      idTable: params.tableId,
      tableName: params.tableName,
      account: { id: account.id },
    };

    await this.insertAccountVersionRepo.execute(insertMovAccVersion);
  }

  private async doLock(params: IMovementAccountDto, account: IAccount) {
    let balance: number = +account.balance;
    let locked: number = params.value;
    let available: number = account.available;
    balance = balance;
    available = balance - locked;

    account.balance = balance;
    account.locked = locked;
    account.available = available;

    await this.updateAccountRepo.execute(account);

    let insertMovAccVersion = {
      accountId: params.accountId,
      available: 0,
      locked: locked,
      balance: 0,
      moveType: params.moveType,
      idTable: params.tableId,
      tableName: params.tableName,
      account: account,
    };

    await this.insertAccountVersionRepo.execute(insertMovAccVersion);
  }

  private async doUnlock(params: IMovementAccountDto, account: IAccount) {
    let balance: number = +account.balance;
    let unlocked: number = params.value;
    let available: number = account.available;

    balance = balance;
    available = available + unlocked;

    account.balance = balance;
    account.locked = account.locked - unlocked;
    account.available = available;

    await this.updateAccountRepo.execute(account);

    let insertMovAccVersion = {
      accountId: params.accountId,
      available: 0,
      locked: unlocked * -1,
      balance: 0,
      moveType: params.moveType,
      idTable: params.tableId,
      tableName: params.tableName,
      account: account,
    };

    await this.insertAccountVersionRepo.execute(insertMovAccVersion);
  }
}

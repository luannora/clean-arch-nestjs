import { Inject } from '@nestjs/common';
import { RepositoryProxyModule } from 'core/infra/http/nestjs/src/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import { IFindAccountVersionsByTableAndValueRepository } from '@domain/account/repositories/find-account-version-by-table-and-value.repository copy';
import { IAccountVersions } from '@domain/account/entities/account_versions.entity';

export class FindAccountVersionsByTableAndValueRepository
  implements IFindAccountVersionsByTableAndValueRepository
{
  constructor(
    @Inject(RepositoryProxyModule.ACCOUNT_VERSIONS_REPOSITORY)
    private readonly accountVRepo: Repository<IAccountVersions>,
  ) {}

  async execute(
    accountId: string,
    moveType: string,
    balance: number,
    tableId: string,
    tableName: string,
  ): Promise<IAccountVersions> {
    let result = await this.accountVRepo
      .createQueryBuilder('account_versions')
      .where('"account_id" = :accountId', { accountId: accountId })
      .andWhere('"move_type" = :moveType', { moveType: moveType })
      .andWhere('"table_name" = :tableName', {
        tableName: tableName,
      })
      .andWhere('"id_table" = :tableId', { tableId: tableId })
      .andWhere('"balance" = :balance', { balance: balance })
      .getOne();

    return result;
  }
}

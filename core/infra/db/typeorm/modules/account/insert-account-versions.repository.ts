import { Inject } from '@nestjs/common';
import { RepositoryProxyModule } from 'core/infra/http/nestjs/src/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import { IInsertAccountVersionsRepository } from '@domain/account/repositories/insert-account-versions.repository';
import { IAccountVersions } from '@domain/account/entities/account_versions.entity';

export class InsertAccountVersionsRepository
  implements IInsertAccountVersionsRepository
{
  constructor(
    @Inject(RepositoryProxyModule.ACCOUNT_VERSIONS_REPOSITORY)
    private readonly accountVRepo: Repository<IAccountVersions>,
  ) {}

  async execute(insertDTO: IAccountVersions): Promise<IAccountVersions> {
    const accVId = (await this.accountVRepo.save(insertDTO)).id;
    return this.accountVRepo.findOne({
      where: { id: accVId },
    });
  }
}

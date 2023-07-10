import { ITaxes } from '@domain/taxes/entities/taxes.entity';
import { IFindLastTaxeActiveRepository } from '@domain/taxes/repositories/find-last-taxe-active.repository';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class FindLastTaxeActiveRepository
  implements IFindLastTaxeActiveRepository {
  constructor(
    @Inject(RepositoryProxyModule.TAXES_REPOSITORY)
    private readonly taxesRepo: Repository<ITaxes>,
  ) { }

  async execute(): Promise<ITaxes> {
    return await this.taxesRepo.query(
      `SELECT MAX(DATE(startAt)) 
        FROM taxes
        WHERE active = TRUE
      `
    )
  }
}

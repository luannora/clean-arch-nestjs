/*
https://docs.nestjs.com/modules
*/

import { DatabaseModule } from '@infra/db/typeorm/datasource/database.module';
import { Module } from '@nestjs/common';
import { RepositoryProxyModule } from '../../proxy/repository.proxy.module';
import { FindLastTaxeActiveRepository } from '@infra/db/typeorm/modules/taxes/repositories/find-last-taxe-active.repository';
import { Repository } from 'typeorm';
import { ITaxes } from '@domain/taxes/entities/taxes.entity';

@Module({
    imports: [DatabaseModule, RepositoryProxyModule.register(),],
    controllers: [],
    providers: [
        /**
     * Repositories
     */
        {
            provide: FindLastTaxeActiveRepository,
            useFactory: (findLastTaxeActiveRepo: Repository<ITaxes>) =>
                new FindLastTaxeActiveRepository(findLastTaxeActiveRepo),
            inject: [RepositoryProxyModule.TAXES_REPOSITORY],
        },
    ],
})
export class TaxesModule { }

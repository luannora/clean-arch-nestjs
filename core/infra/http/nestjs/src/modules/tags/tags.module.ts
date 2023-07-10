import { Module } from '@nestjs/common';
import { RepositoryProxyModule } from '../../proxy/repository.proxy.module';
import { DatabaseModule } from '@infra/db/typeorm/datasource/database.module';
import { InsertWebHookController } from './controller/insert-webhook.controller';
import { InsertTagTransactionsRepository } from '@infra/db/typeorm/modules/tags/tag-transactions.repositories/insert-tag-transactions';
import { Repository } from 'typeorm';
import { ITagTransaction } from '@domain/tags/entities/tagTransaction.entity';
import { InsertWebHookUseCase } from '@application/tags/use-cases/insert-webhook.usecase';
import { IInsertTagTransactionRepository } from '@domain/tags/repositories/tag-transactions.repositories/insert-tag-transaction.repository';
import { InsertWebHookService } from './services/insert-web-hook.service';
import { FindByTagNumberRepository } from '@infra/db/typeorm/modules/tags/tag.repositories/find-by-tag-number.repository';
import { ITag } from '@domain/tags/entities/tags.entity';
import { ImportTagsController } from './controller/import-tags.controller';
import { ImportTagsService } from './services/import-tags.service';
import { ImportTagsUseCase } from '@application/tags/use-cases/import-tags.usecase';
import { InsertTagRepository } from '@infra/db/typeorm/modules/tags/tag.repositories/insert-tag.repositoy';
import { ActiveTagController } from './controller/active-tag.controller';
import { BlockTagController } from './controller/block-tag.controller';
import { ActiveTagUseCase } from '@application/tags/use-cases/active-tag.usecase';
import { FindVehicleByIdRepository } from '@infra/db/typeorm/modules/vehicle/find-vehicle-by-id.repository';
import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';
import { GetTagByIdRepository } from '@infra/db/typeorm/modules/tags/tag.repositories/get-tag-by-id.repository';
import { GreenPassAdapter } from '@infra/adapters/greenpass-adapter/greenpass-adapter';
import { HttpModule, HttpService } from '@nestjs/axios';
import { UpdateTagRepository } from '@infra/db/typeorm/modules/tags/tag.repositories/update-tag.repository';
import { BlockTagUseCase } from '@application/tags/use-cases/block-tag.usecase';
import { ActiveTagService } from './services/active-tag.service';
import { BlockTagService } from './services/block-tag.service';

import { FindTagTransactionsByTagIdService } from './services/find-tag-transactions-by-tag-id.service';
import { FindTagTransactionsByTagIdController } from './controller/find-tag-transactions-by-tag-id';
import { FindTransactionByTagIdRepository } from '@infra/db/typeorm/modules/tags/tag-transactions.repositories/find-transaction-by-tag-id';
import { FindTagTransactionsByTagIdUseCase } from '@application/tags/use-cases/find-tag-transactions-by-tag-id.usecase';


@Module({
  imports: [DatabaseModule, RepositoryProxyModule.register(), HttpModule],
  controllers: [
    InsertWebHookController,
    ImportTagsController,
    ActiveTagController,
    BlockTagController,
    FindTagTransactionsByTagIdController,

  ],
  providers: [
    /**
     * Repositories
     */
    {
      provide: FindTransactionByTagIdRepository,
      useFactory: (tagRepo: Repository<ITag>) =>
        new FindTransactionByTagIdRepository(tagRepo),
      inject: [RepositoryProxyModule.TAG_REPOSITORY],
    },
    {
      provide: InsertTagTransactionsRepository,
      useFactory: (tagTransactionRepo: Repository<ITagTransaction>) =>
        new InsertTagTransactionsRepository(tagTransactionRepo),
      inject: [RepositoryProxyModule.TAG_TRANSACTIONS_REPOSITORY],
    },
    {
      provide: InsertTagRepository,
      useFactory: (tagRepo: Repository<ITag>) =>
        new InsertTagRepository(tagRepo),
      inject: [RepositoryProxyModule.TAG_REPOSITORY],
    },
    {
      provide: UpdateTagRepository,
      useFactory: (tagRepo: Repository<ITag>) =>
        new UpdateTagRepository(tagRepo),
      inject: [RepositoryProxyModule.TAG_REPOSITORY],
    },
    {
      provide: FindByTagNumberRepository,
      useFactory: (tagRepo: Repository<ITag>) =>
        new FindByTagNumberRepository(tagRepo),
      inject: [RepositoryProxyModule.TAG_REPOSITORY],
    },
    {
      provide: GetTagByIdRepository,
      useFactory: (tagRepo: Repository<ITag>) =>
        new GetTagByIdRepository(tagRepo),
      inject: [RepositoryProxyModule.TAG_REPOSITORY],
    },
    {
      provide: FindVehicleByIdRepository,
      useFactory: (repo: Repository<IVehicle>) =>
        new FindVehicleByIdRepository(repo),
      inject: [RepositoryProxyModule.VEHICLE_REPOSITORY],
    },
    /**
     * UseCases
     */
    {
      provide: InsertWebHookUseCase,
      useFactory: (
        tagTransactionRepository: IInsertTagTransactionRepository,
        findByTagNumberRepository: FindByTagNumberRepository,
      ) =>
        new InsertWebHookUseCase(
          tagTransactionRepository,
          findByTagNumberRepository,
        ),
      inject: [InsertTagTransactionsRepository, FindByTagNumberRepository],
    },
    {
      provide: ImportTagsUseCase,
      useFactory: (
        insertTagsRepo: InsertTagRepository,
        findByTagNumberRepository: FindByTagNumberRepository,
      ) => new ImportTagsUseCase(insertTagsRepo, findByTagNumberRepository),
      inject: [InsertTagRepository, FindByTagNumberRepository],
    },

    {
      provide: ActiveTagUseCase,
      useFactory: (
        getTagByIdRepository: GetTagByIdRepository,
        getVehicleByIdRepository: FindVehicleByIdRepository,
        greenPassAdapter: GreenPassAdapter,
        updateTagRepository: UpdateTagRepository,
      ) =>
        new ActiveTagUseCase(
          getTagByIdRepository,
          getVehicleByIdRepository,
          greenPassAdapter,
          updateTagRepository,
        ),
      inject: [
        GetTagByIdRepository,
        FindVehicleByIdRepository,
        GreenPassAdapter,
        UpdateTagRepository,
      ],
    },

    {
      provide: BlockTagUseCase,
      useFactory: (
        getTagByIdRepository: GetTagByIdRepository,
        greenPassAdapter: GreenPassAdapter,
        updateTagRepository: UpdateTagRepository,
      ) =>
        new BlockTagUseCase(
          getTagByIdRepository,
          greenPassAdapter,
          updateTagRepository,
        ),
      inject: [GetTagByIdRepository, GreenPassAdapter, UpdateTagRepository],
    },
    {
      provide: FindTagTransactionsByTagIdUseCase,
      useFactory: (
        findTagTransactionsByTagIdRepo: FindTransactionByTagIdRepository,
      ) =>
        new FindTagTransactionsByTagIdUseCase(
          findTagTransactionsByTagIdRepo
        ),
      inject: [FindTransactionByTagIdRepository],
    },
    /**
     * Handlers
     */
    {
      provide: InsertWebHookService,
      useFactory: (insertWebHookUseCase: InsertWebHookUseCase) =>
        new InsertWebHookService(insertWebHookUseCase),
      inject: [InsertWebHookUseCase],
    },
    {
      provide: ImportTagsService,
      useFactory: (importTagsUC: ImportTagsUseCase) =>
        new ImportTagsService(importTagsUC),
      inject: [ImportTagsUseCase],
    },

    {
      provide: ActiveTagService,
      useFactory: (activeTagUC: ActiveTagUseCase) =>
        new ActiveTagService(activeTagUC),
      inject: [ActiveTagUseCase],
    },

    {
      provide: BlockTagService,
      useFactory: (blockTagUC: BlockTagUseCase) =>
        new BlockTagService(blockTagUC),
      inject: [BlockTagUseCase],
    },
    {
      provide: FindTagTransactionsByTagIdService,
      useFactory: (findTagTransactionsByTagIdUseCase: FindTagTransactionsByTagIdUseCase) =>
        new FindTagTransactionsByTagIdService(findTagTransactionsByTagIdUseCase),
      inject: [FindTagTransactionsByTagIdUseCase],
    },

    /**
     * Adapters
     */
    {
      provide: GreenPassAdapter,
      useFactory: (httpService: HttpService) =>
        new GreenPassAdapter(httpService),
      inject: [HttpService],
    },
  ],
})
export class TagsModule { }

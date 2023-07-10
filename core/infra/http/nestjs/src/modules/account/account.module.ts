/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/db/typeorm/datasource/database.module';
import { RepositoryProxyModule } from '../../proxy/repository.proxy.module';
import { IAccount } from '@domain/account/entities/account.entity';
import { Repository } from 'typeorm';
import { InsertAccountRepository } from '@infra/db/typeorm/modules/account/insert-account.repository';
import { InsertAccountVersionsRepository } from '@infra/db/typeorm/modules/account/insert-account-versions.repository';
import { IAccountVersions } from '@domain/account/entities/account_versions.entity';
import { UpdateAccountRepository } from '@infra/db/typeorm/modules/account/update-account.repository';
import { CreateAccountUserCase } from '@application/account/use-cases/create-account.usercase';
import { FindByUUIDUserRepository } from '@infra/db/typeorm/modules/user/find-by-uuid-user.repository';
import { IUser } from '@domain/user/entities/user.entity';
import { CreateAccountService } from './services/create-account.service';
import { CreateAccountEventListener } from './controller/create-account.event';
import { UpdateUserRepository } from '@infra/db/typeorm/modules/user/update-user.repository';
import { GetAccountUserController } from './controller/get-account-user.controller';
import { GetAccountByUserIdService } from './services/get-account-by-user-id.service';
import { GetAccountVersionsService } from './services/get-account-versions.service';
import { GetAccountByUserIdRepository } from '@infra/db/typeorm/modules/account/get-account-by-user-id.repository';
import { GetAccountByIdUserCase } from '@application/account/use-cases/get-account-by-id.usercase';
import { GetAccountVersionsRepository } from '@infra/db/typeorm/modules/account/get-account-versions.repository';
import { GetAccountVersionsUserCase } from '@application/account/use-cases/get-account-versions.usercase';
import { GetAccountVersionsController } from './controller/get-account-versions.controller';
import { GetAccountByIdRepository } from '@infra/db/typeorm/modules/account/get-account-by-id.repository';
import { MoveAccountUseCase } from '@application/account/use-cases/move-account.usercase';
import { MovementAccountService } from './services/movement-account.service';
import { MovementAccountController } from './controller/movement-account.controller';
import { FindAccountVersionsByTableAndValueRepository } from '@infra/db/typeorm/modules/account/find-account-version-by-table-and-value.repository';

@Module({
  imports: [DatabaseModule, RepositoryProxyModule.register()],
  controllers: [
    GetAccountUserController,
    GetAccountVersionsController,
    MovementAccountController,
  ],
  providers: [
    CreateAccountEventListener,
    CreateAccountService,
    GetAccountByUserIdService,
    GetAccountVersionsService,
    /**
     * Repositories
     */
    {
      provide: InsertAccountRepository,
      useFactory: (accountRepo: Repository<IAccount>) =>
        new InsertAccountRepository(accountRepo),
      inject: [RepositoryProxyModule.ACCOUNT_REPOSITORY],
    },
    {
      provide: UpdateAccountRepository,
      useFactory: (accountRepo: Repository<IAccount>) =>
        new UpdateAccountRepository(accountRepo),
      inject: [RepositoryProxyModule.ACCOUNT_REPOSITORY],
    },
    {
      provide: InsertAccountVersionsRepository,
      useFactory: (accountVRepo: Repository<IAccountVersions>) =>
        new InsertAccountVersionsRepository(accountVRepo),
      inject: [RepositoryProxyModule.ACCOUNT_VERSIONS_REPOSITORY],
    },
    {
      provide: FindByUUIDUserRepository,
      useFactory: (userRepo: Repository<IUser>) =>
        new FindByUUIDUserRepository(userRepo),
      inject: [RepositoryProxyModule.USER_REPOSITORY],
    },
    {
      provide: UpdateUserRepository,
      useFactory: (userRepo: Repository<IUser>) =>
        new UpdateUserRepository(userRepo),
      inject: [RepositoryProxyModule.USER_REPOSITORY],
    },
    {
      provide: GetAccountByUserIdRepository,
      useFactory: (userRepo: Repository<IUser>) =>
        new GetAccountByUserIdRepository(userRepo),
      inject: [RepositoryProxyModule.USER_REPOSITORY],
    },
    {
      provide: GetAccountVersionsRepository,
      useFactory: (accountVesionRepo: Repository<IAccountVersions>) =>
        new GetAccountVersionsRepository(accountVesionRepo),
      inject: [RepositoryProxyModule.ACCOUNT_VERSIONS_REPOSITORY],
    },
    {
      provide: GetAccountByIdRepository,
      useFactory: (accountRepo: Repository<IAccount>) =>
        new GetAccountByIdRepository(accountRepo),
      inject: [RepositoryProxyModule.ACCOUNT_REPOSITORY],
    },
    {
      provide: FindAccountVersionsByTableAndValueRepository,
      useFactory: (accountVRepo: Repository<IAccountVersions>) =>
        new FindAccountVersionsByTableAndValueRepository(accountVRepo),
      inject: [RepositoryProxyModule.ACCOUNT_VERSIONS_REPOSITORY],
    },

    /**
     * UseCases
     */
    {
      provide: CreateAccountUserCase,
      useFactory: (
        insertAccountRep: InsertAccountRepository,
        insertAccountVRepo: InsertAccountVersionsRepository,
        findByUUIDUSerRepo: FindByUUIDUserRepository,
        updateUserRepo: UpdateUserRepository,
      ) =>
        new CreateAccountUserCase(
          insertAccountRep,
          insertAccountVRepo,
          findByUUIDUSerRepo,
          updateUserRepo,
        ),
      inject: [
        InsertAccountRepository,
        InsertAccountVersionsRepository,
        FindByUUIDUserRepository,
        UpdateUserRepository,
      ],
    },
    {
      provide: GetAccountByIdUserCase,
      useFactory: (getAccountByUserIdRepo: GetAccountByUserIdRepository) =>
        new GetAccountByIdUserCase(getAccountByUserIdRepo),
      inject: [GetAccountByUserIdRepository],
    },
    {
      provide: GetAccountVersionsUserCase,
      useFactory: (getAccountVersionsRepo: GetAccountVersionsRepository) =>
        new GetAccountVersionsUserCase(getAccountVersionsRepo),
      inject: [GetAccountVersionsRepository],
    },
    {
      provide: MoveAccountUseCase,
      useFactory: (
        insertAccountVersionRepo: InsertAccountVersionsRepository,
        updateAccountRepo: UpdateAccountRepository,
        findAccountByIdRepo: GetAccountByIdRepository,
        findAccountVersionByTableAndValue: FindAccountVersionsByTableAndValueRepository,
      ) =>
        new MoveAccountUseCase(
          insertAccountVersionRepo,
          updateAccountRepo,
          findAccountByIdRepo,
          findAccountVersionByTableAndValue,
        ),
      inject: [
        InsertAccountVersionsRepository,
        UpdateAccountRepository,
        GetAccountByIdRepository,
        FindAccountVersionsByTableAndValueRepository,
      ],
    },

    /**
     * Handlers
     */
    {
      provide: CreateAccountService,
      useFactory: (createAccountUC: CreateAccountUserCase) =>
        new CreateAccountService(createAccountUC),
      inject: [CreateAccountUserCase],
    },
    {
      provide: GetAccountByUserIdService,
      useFactory: (getAccountByUserIdUC: GetAccountByIdUserCase) =>
        new GetAccountByUserIdService(getAccountByUserIdUC),
      inject: [GetAccountByIdUserCase],
    },
    {
      provide: GetAccountVersionsService,
      useFactory: (getAccountVersionsUC: GetAccountVersionsUserCase) =>
        new GetAccountVersionsService(getAccountVersionsUC),
      inject: [GetAccountVersionsUserCase],
    },
    {
      provide: MovementAccountService,
      useFactory: (moveAccountUC: MoveAccountUseCase) =>
        new MovementAccountService(moveAccountUC),
      inject: [MoveAccountUseCase],
    },

    /**
     * Adapters
     */
  ],
  exports: [],
})
export class AccountModule {}

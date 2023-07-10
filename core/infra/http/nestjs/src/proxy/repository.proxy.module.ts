import { DatabaseModule } from '@infra/db/typeorm/datasource/database.module';
import { DB_POSTGRES } from '@infra/db/typeorm/datasource/database.providers';
import { AccountVesionsSchema } from '@infra/db/typeorm/entities/account-versions.entity';
import { AccountSchema } from '@infra/db/typeorm/entities/account.entity';
import { AddressSchema } from '@infra/db/typeorm/entities/address.entity';
import { CredtCardSchema } from '@infra/db/typeorm/entities/credit_card.entity';
import { DisputeSchema } from '@infra/db/typeorm/entities/dispute.entity';
import { TagTransactionSchema } from '@infra/db/typeorm/entities/tagTransaction.entity';
import { TagSchema } from '@infra/db/typeorm/entities/tags.entity';
import TaxesSchema from '@infra/db/typeorm/entities/taxes.entity';
import { VehicleCategorySchema } from '@infra/db/typeorm/entities/vehicle-category.entity';
import { VehicleSchema } from '@infra/db/typeorm/entities/vehicle.entity';
import { DynamicModule, Module } from '@nestjs/common';
import { UserSchema } from 'core/infra/db/typeorm/entities/user.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [DatabaseModule],
})
export class RepositoryProxyModule {
  static USER_REPOSITORY = 'UserRepository';
  static ADDRESS_REPOSITORY = 'AddressRepository';
  static ACCOUNT_REPOSITORY = 'AccountRepository';
  static ACCOUNT_VERSIONS_REPOSITORY = 'AccountVersionsRepository';
  static DISPUTE_REPOSITORY = 'DisputeRepository';
  static VEHICLE_REPOSITORY = 'VehicleRepository';
  static VEHICLE_CATEGORY_REPOSITORY = 'VehicleCategoryRepository';
  static TAG_REPOSITORY = 'TagRepository';
  static TAG_TRANSACTIONS_REPOSITORY = 'TagTransactionsRepository';
  static CREDIT_CARDS_REPOSITORY = 'CreditCardRepository';
  static TAXES_REPOSITORY = 'TaxesRepository';

  static register(): DynamicModule {
    return {
      module: RepositoryProxyModule,
      providers: [
        {
          provide: RepositoryProxyModule.CREDIT_CARDS_REPOSITORY,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(CredtCardSchema),
          inject: [DB_POSTGRES],
        },
        {
          provide: RepositoryProxyModule.USER_REPOSITORY,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(UserSchema),
          inject: [DB_POSTGRES],
        },
        {
          provide: RepositoryProxyModule.ADDRESS_REPOSITORY,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(AddressSchema),
          inject: [DB_POSTGRES],
        },
        {
          provide: RepositoryProxyModule.ACCOUNT_REPOSITORY,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(AccountSchema),
          inject: [DB_POSTGRES],
        },

        {
          provide: RepositoryProxyModule.ACCOUNT_VERSIONS_REPOSITORY,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(AccountVesionsSchema),
          inject: [DB_POSTGRES],
        },
        {
          provide: RepositoryProxyModule.VEHICLE_REPOSITORY,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(VehicleSchema),
          inject: [DB_POSTGRES],
        },
        {
          provide: RepositoryProxyModule.VEHICLE_CATEGORY_REPOSITORY,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(VehicleCategorySchema),
          inject: [DB_POSTGRES],
        },
        {
          provide: RepositoryProxyModule.TAG_REPOSITORY,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(TagSchema),
          inject: [DB_POSTGRES],
        },
        {
          provide: RepositoryProxyModule.TAG_TRANSACTIONS_REPOSITORY,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(TagTransactionSchema),
          inject: [DB_POSTGRES],
        },
        {
          provide: RepositoryProxyModule.DISPUTE_REPOSITORY,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(DisputeSchema),
          inject: [DB_POSTGRES],
        },
        {
          provide: RepositoryProxyModule.TAXES_REPOSITORY,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(TaxesSchema),
          inject: [DB_POSTGRES],
        },
      ],
      exports: [
        RepositoryProxyModule.USER_REPOSITORY,
        RepositoryProxyModule.ADDRESS_REPOSITORY,
        RepositoryProxyModule.ACCOUNT_REPOSITORY,
        RepositoryProxyModule.ACCOUNT_VERSIONS_REPOSITORY,
        RepositoryProxyModule.VEHICLE_REPOSITORY,
        RepositoryProxyModule.VEHICLE_CATEGORY_REPOSITORY,
        RepositoryProxyModule.TAG_REPOSITORY,
        RepositoryProxyModule.TAG_TRANSACTIONS_REPOSITORY,
        RepositoryProxyModule.DISPUTE_REPOSITORY,
        RepositoryProxyModule.CREDIT_CARDS_REPOSITORY,
        RepositoryProxyModule.TAXES_REPOSITORY,
      ],
    };
  }
}

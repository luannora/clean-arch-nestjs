import { MockModule } from './modules/mock/mock.module';
import { TaxesModule } from './modules/taxes/taxes.module';
import { CardsModule } from './modules/cards/cards.module';
import { AccountModule } from './modules/account/account.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@infra/db/typeorm/datasource/database.module';
import { RepositoryProxyModule } from './proxy/repository.proxy.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AddressModule } from './modules/address/address.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { TagsModule } from './modules/tags/tags.module';

@Module({
  imports: [
    TaxesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    DatabaseModule,
    RepositoryProxyModule,

    /**
     * App Modules
     */
    UserModule,
    AddressModule,
    AuthModule,
    AccountModule,
    VehicleModule,
    TagsModule,
    CardsModule,
    MockModule,
  ],
  controllers: [],
  providers: [],
  exports: [AuthModule],
})
export class AppModule {}

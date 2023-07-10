import { DatabaseModule } from '@infra/db/typeorm/datasource/database.module';
import { RepositoryProxyModule } from '../../proxy/repository.proxy.module';
import { Module } from '@nestjs/common';
import { ZipCodeController } from './controller/zip-code.controller';
import { FindZipCodeUseCase } from '@application/address/use-cases/find-zip-code.usecase';
import { GetCepAdapter } from '@infra/adapters/get-cep-adapter/get-cep.adapter';
import { FindZipCodeService } from './services/find-zip-code.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, RepositoryProxyModule.register(), HttpModule],
  controllers: [ZipCodeController],
  providers: [
    /**
     * Repositories
     */

    /**
     * UseCases
     */
    {
      provide: FindZipCodeUseCase,
      useFactory: (getCepAdater: GetCepAdapter) =>
        new FindZipCodeUseCase(getCepAdater),
      inject: [GetCepAdapter],
    },

    /**
     * Handlers
     */
    {
      provide: FindZipCodeService,
      useFactory: (findZipCodeUC: FindZipCodeUseCase) =>
        new FindZipCodeService(findZipCodeUC),
      inject: [FindZipCodeUseCase],
    },

    /**
     * Adapters
     */
    {
      provide: GetCepAdapter,
      useFactory: (httpService: HttpService) => new GetCepAdapter(httpService),
      inject: [HttpService],
    },
  ],
  exports: [],
})
export class AddressModule {}

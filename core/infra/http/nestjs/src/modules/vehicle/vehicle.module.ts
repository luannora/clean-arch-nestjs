import { DatabaseModule } from '@infra/db/typeorm/datasource/database.module';
import { RepositoryProxyModule } from '../../proxy/repository.proxy.module';
import { Module } from '@nestjs/common';
import { InsertVehicleController } from './controller/insert-vehicle.controller';
import { InsertVehicleUserUseCase } from '@application/vehicle/use-cases/insert-vehicle.usecase';
import { InsertVehicleRepository } from '@infra/db/typeorm/modules/vehicle/insert-vehicle.repository';
import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';
import { Repository } from 'typeorm';
import { UpdateVehicleRepository } from '@infra/db/typeorm/modules/vehicle/update-vehicle.repository';
import { DeleteVehicleRepository } from '@infra/db/typeorm/modules/vehicle/delete-vehicle.repository';
import { FindVehicleByIdRepository } from '@infra/db/typeorm/modules/vehicle/find-vehicle-by-id.repository';
import { FindVehicleByPlateRepository } from '@infra/db/typeorm/modules/vehicle/find-vehicle-by-plate.repository';
import { FindVehiclesRepository } from '@infra/db/typeorm/modules/vehicle/find-vehicles.repository';
import { FindByUUIDUserRepository } from '@infra/db/typeorm/modules/user/find-by-uuid-user.repository';
import { IUser } from '@domain/user/entities/user.entity';
import { InsertVehicleService } from './services/insert-vehicle.service';
import { UpdateVehicleController } from './controller/update-vehicle.controller';
import { UpdateVehicleUseCase } from '@application/vehicle/use-cases/update-vehicle.usecase';
import { UpdateVehicleService } from './services/update-vehicle.service';
import { DeleteVehicleController } from './controller/delete-vehicle.controller';
import { DeleteVehicleUseCase } from '@application/vehicle/use-cases/delete-vehicle.usecase';
import { DeleteVehicleService } from './services/delete-vehicle.service';
import { FindVehicleUseCase } from '@application/vehicle/use-cases/find-vehicles.usecase';
import { FindVehicleService } from './services/find-vehicle.service';
import { FindVehicleController } from './controller/find-vehicle.controller';
import { FindVehicleCategoriesRepository } from '@infra/db/typeorm/modules/vehicle/find-vehicle-categories.repository';
import { IVehicleCategory } from '@domain/vehicle/entities/vehicle-category.entity';
import { FindVehicleCategoriesUseCase } from '@application/vehicle/use-cases/find-vehicle-categories.usecase';
import { FindVehicleCategoriesService } from './services/find-vehicle-categories.service';
import { FindVehicleCategoriesController } from './controller/find-vehicle-categories.controller';

@Module({
  imports: [DatabaseModule, RepositoryProxyModule.register()],
  controllers: [
    InsertVehicleController,
    UpdateVehicleController,
    DeleteVehicleController,
    FindVehicleController,
    FindVehicleCategoriesController,
  ],
  providers: [
    /**
     * Repositories
     */
    {
      provide: InsertVehicleRepository,
      useFactory: (repo: Repository<IVehicle>) =>
        new InsertVehicleRepository(repo),
      inject: [RepositoryProxyModule.VEHICLE_REPOSITORY],
    },
    {
      provide: UpdateVehicleRepository,
      useFactory: (repo: Repository<IVehicle>) =>
        new UpdateVehicleRepository(repo),
      inject: [RepositoryProxyModule.VEHICLE_REPOSITORY],
    },
    {
      provide: DeleteVehicleRepository,
      useFactory: (repo: Repository<IVehicle>) =>
        new DeleteVehicleRepository(repo),
      inject: [RepositoryProxyModule.VEHICLE_REPOSITORY],
    },
    {
      provide: FindVehicleByIdRepository,
      useFactory: (repo: Repository<IVehicle>) =>
        new FindVehicleByIdRepository(repo),
      inject: [RepositoryProxyModule.VEHICLE_REPOSITORY],
    },
    {
      provide: FindVehicleByPlateRepository,
      useFactory: (repo: Repository<IVehicle>) =>
        new FindVehicleByPlateRepository(repo),
      inject: [RepositoryProxyModule.VEHICLE_REPOSITORY],
    },
    {
      provide: FindVehiclesRepository,
      useFactory: (repo: Repository<IVehicle>) =>
        new FindVehiclesRepository(repo),
      inject: [RepositoryProxyModule.VEHICLE_REPOSITORY],
    },
    {
      provide: FindByUUIDUserRepository,
      useFactory: (userRepo: Repository<IUser>) =>
        new FindByUUIDUserRepository(userRepo),
      inject: [RepositoryProxyModule.USER_REPOSITORY],
    },
    {
      provide: FindVehicleCategoriesRepository,
      useFactory: (repo: Repository<IVehicleCategory>) =>
        new FindVehicleCategoriesRepository(repo),
      inject: [RepositoryProxyModule.VEHICLE_CATEGORY_REPOSITORY],
    },

    /**
     * UseCases
     */
    {
      provide: InsertVehicleUserUseCase,
      useFactory: (
        inserVehicleRepo: InsertVehicleRepository,
        findVehicleByPlateRepo: FindVehicleByPlateRepository,
        findUserByIdRepo: FindByUUIDUserRepository,
      ) =>
        new InsertVehicleUserUseCase(
          inserVehicleRepo,
          findVehicleByPlateRepo,
          findUserByIdRepo,
        ),
      inject: [
        InsertVehicleRepository,
        FindVehicleByPlateRepository,
        FindByUUIDUserRepository,
      ],
    },

    {
      provide: UpdateVehicleUseCase,
      useFactory: (
        updateVehicleRepo: UpdateVehicleRepository,
        findVehicleByIdRepo: FindVehicleByIdRepository,
      ) => new UpdateVehicleUseCase(updateVehicleRepo, findVehicleByIdRepo),
      inject: [UpdateVehicleRepository, FindVehicleByIdRepository],
    },
    {
      provide: DeleteVehicleUseCase,
      useFactory: (deleteVehicleRepo: DeleteVehicleRepository) =>
        new DeleteVehicleUseCase(deleteVehicleRepo),
      inject: [DeleteVehicleRepository],
    },

    {
      provide: FindVehicleUseCase,
      useFactory: (findVehicleRepo: FindVehiclesRepository) =>
        new FindVehicleUseCase(findVehicleRepo),
      inject: [FindVehiclesRepository],
    },

    {
      provide: FindVehicleCategoriesUseCase,
      useFactory: (findVehicleCategoryRepo: FindVehicleCategoriesRepository) =>
        new FindVehicleCategoriesUseCase(findVehicleCategoryRepo),
      inject: [FindVehicleCategoriesRepository],
    },

    /**
     * Handlers
     */
    {
      provide: InsertVehicleService,
      useFactory: (insertVehicleUC: InsertVehicleUserUseCase) =>
        new InsertVehicleService(insertVehicleUC),
      inject: [InsertVehicleUserUseCase],
    },

    {
      provide: UpdateVehicleService,
      useFactory: (updateVehicleUC: UpdateVehicleUseCase) =>
        new UpdateVehicleService(updateVehicleUC),
      inject: [UpdateVehicleUseCase],
    },

    {
      provide: DeleteVehicleService,
      useFactory: (deleteVehicleUC: DeleteVehicleUseCase) =>
        new DeleteVehicleService(deleteVehicleUC),
      inject: [DeleteVehicleUseCase],
    },

    {
      provide: FindVehicleService,
      useFactory: (findVehicleUC: FindVehicleUseCase) =>
        new FindVehicleService(findVehicleUC),
      inject: [FindVehicleUseCase],
    },

    {
      provide: FindVehicleCategoriesService,
      useFactory: (findVehicleCategoryUC: FindVehicleCategoriesUseCase) =>
        new FindVehicleCategoriesService(findVehicleCategoryUC),
      inject: [FindVehicleCategoriesUseCase],
    },

    /**
     * Adapters
     */
  ],
  exports: [],
})
export class VehicleModule {}

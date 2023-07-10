import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';

import { RepositoryProxyModule } from '@nest/src/proxy/repository.proxy.module';
import { IFindVehicleCategoriesRepository } from '@domain/vehicle/repositories/find-vehicle-categories.repository';
import { IVehicleCategory } from '@domain/vehicle/entities/vehicle-category.entity';

export class FindVehicleCategoriesRepository
  implements IFindVehicleCategoriesRepository
{
  constructor(
    @Inject(RepositoryProxyModule.VEHICLE_CATEGORY_REPOSITORY)
    private readonly repo: Repository<IVehicleCategory>,
  ) {}

  async execute(): Promise<IVehicleCategory[]> {
    return this.repo.find();
  }
}

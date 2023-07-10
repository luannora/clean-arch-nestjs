import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';

import { RepositoryProxyModule } from '@nest/src/proxy/repository.proxy.module';
import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';
import { IFindVehicleByPlateRepository } from '@domain/vehicle/repositories/find-vehicle-by-plate.repository';

export class FindVehicleByPlateRepository
  implements IFindVehicleByPlateRepository
{
  constructor(
    @Inject(RepositoryProxyModule.VEHICLE_REPOSITORY)
    private readonly repo: Repository<IVehicle>,
  ) {}

  execute(plate: string, userId: string): Promise<IVehicle> {
    return this.repo.findOne({ where: { plate: plate, user: { id: userId } } });
  }
}

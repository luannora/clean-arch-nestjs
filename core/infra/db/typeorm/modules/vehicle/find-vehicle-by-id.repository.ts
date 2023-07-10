import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';

import { RepositoryProxyModule } from '@nest/src/proxy/repository.proxy.module';
import { IFindVehicleByIdRepository } from '@domain/vehicle/repositories/find-vehicle-by-id.repository';
import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';

export class FindVehicleByIdRepository implements IFindVehicleByIdRepository {
  constructor(
    @Inject(RepositoryProxyModule.VEHICLE_REPOSITORY)
    private readonly repo: Repository<IVehicle>,
  ) {}

  execute(id: string): Promise<IVehicle> {
    return this.repo.findOne({ where: { id: id } });
  }
}

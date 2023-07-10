import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { RepositoryProxyModule } from '@nest/src/proxy/repository.proxy.module';
import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';
import { IInsertVehicleRepository } from '@domain/vehicle/repositories/insert-vehicle.repository';

export class InsertVehicleRepository implements IInsertVehicleRepository {
  constructor(
    @Inject(RepositoryProxyModule.VEHICLE_REPOSITORY)
    private readonly repo: Repository<IVehicle>,
  ) {}

  async execute(paramsDTO: IVehicle): Promise<IVehicle> {
    return await this.repo.save(paramsDTO);
  }
}

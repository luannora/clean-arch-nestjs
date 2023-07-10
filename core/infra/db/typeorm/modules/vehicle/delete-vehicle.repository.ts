import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { RepositoryProxyModule } from '@nest/src/proxy/repository.proxy.module';
import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';
import { IDeleteVehicleRepository } from '@domain/vehicle/repositories/delete-vehicle.repository';

export class DeleteVehicleRepository implements IDeleteVehicleRepository {
  constructor(
    @Inject(RepositoryProxyModule.VEHICLE_REPOSITORY)
    private readonly repo: Repository<IVehicle>,
  ) {}

  async execute(id: string): Promise<boolean> {
    let result = await this.repo.softDelete(id);

    if (result.affected != 0) {
      return true;
    } else {
      return false;
    }
  }
}

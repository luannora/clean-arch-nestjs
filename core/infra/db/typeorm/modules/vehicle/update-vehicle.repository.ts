import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';
import { IUpdateVehicleRepository } from '@domain/vehicle/repositories/update-vehicle.repository';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class UpdateVehicleRepository implements IUpdateVehicleRepository {
  constructor(
    @Inject(RepositoryProxyModule.VEHICLE_REPOSITORY)
    private readonly repo: Repository<IVehicle>,
  ) {}

  async execute(paramsDTO: IVehicle): Promise<IVehicle | null> {
    const { affected } = await this.repo.update(paramsDTO.id, {
      observation: paramsDTO.observation,
    });
    if (affected === 0) return null;
    return this.repo.findOne({ where: { id: paramsDTO.id } });
  }
}

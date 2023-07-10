import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';
import { IFindVehicleByIdRepository } from '@domain/vehicle/repositories/find-vehicle-by-id.repository';
import { IFindVehicleByIdUseCase } from '@domain/vehicle/use-cases/find-vehicle-by-id.usecase';

export class FindVehicleByIdUseCase implements IFindVehicleByIdUseCase {
  constructor(
    private readonly findVehicleRepository: IFindVehicleByIdRepository,
  ) {}

  async execute(id: string): Promise<IVehicle> {
    return await this.findVehicleRepository.execute(id);
  }
}

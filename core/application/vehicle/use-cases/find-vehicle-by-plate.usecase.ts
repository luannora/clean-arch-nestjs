import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';
import { IFindVehicleByPlateRepository } from '@domain/vehicle/repositories/find-vehicle-by-plate.repository';
import { IFindVehicleByPlateUseCase } from '@domain/vehicle/use-cases/find-vehicle-by-plate.usecase';

export class FindVehicleByPlateUseCase implements IFindVehicleByPlateUseCase {
  constructor(
    private readonly findVehicleRepository: IFindVehicleByPlateRepository,
  ) {}

  async execute(plate: string, userId: string): Promise<IVehicle> {
    return await this.findVehicleRepository.execute(plate, userId);
  }
}

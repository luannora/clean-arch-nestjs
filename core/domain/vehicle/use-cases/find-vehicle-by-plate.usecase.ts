import { IVehicle } from '../entities/vehicle.entity';

export interface IFindVehicleByPlateUseCase {
  execute(plate: string, userId: string): Promise<IVehicle>;
}

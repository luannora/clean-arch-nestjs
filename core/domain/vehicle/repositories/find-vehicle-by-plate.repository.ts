import { IVehicle } from '../entities/vehicle.entity';

export interface IFindVehicleByPlateRepository {
  execute(plate: string, userId: string): Promise<IVehicle>;
}

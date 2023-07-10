import { IVehicle } from '../entities/vehicle.entity';

export interface IFindVehicleByIdRepository {
  execute(id: string): Promise<IVehicle>;
}

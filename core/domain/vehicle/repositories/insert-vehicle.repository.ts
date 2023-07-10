import { IVehicle } from '../entities/vehicle.entity';

export interface IInsertVehicleRepository {
  execute(paramsDTO: IVehicle): Promise<IVehicle>;
}

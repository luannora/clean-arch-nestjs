import { IVehicle } from '../entities/vehicle.entity';

export interface IUpdateVehicleRepository {
  execute(paramsDTO: IVehicle): Promise<IVehicle>;
}

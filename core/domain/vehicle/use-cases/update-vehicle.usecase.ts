import { IVehicle } from '../entities/vehicle.entity';

export interface IUpdateVehicleUseCase {
  execute(paramsDTO: IVehicle): Promise<IVehicle>;
}

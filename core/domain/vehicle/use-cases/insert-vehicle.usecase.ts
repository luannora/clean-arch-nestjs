import { IVehicle } from '../entities/vehicle.entity';

export interface IInsertVehicleUserUseCase {
  execute(paramsDTO: IVehicle, userId: string): Promise<IVehicle>;
}

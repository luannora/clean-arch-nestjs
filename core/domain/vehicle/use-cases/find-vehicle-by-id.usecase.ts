import { IVehicle } from '../entities/vehicle.entity';

export interface IFindVehicleByIdUseCase {
  execute(id: string): Promise<IVehicle>;
}

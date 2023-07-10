import { IVehicle } from '../entities/vehicle.entity';

export interface IResponseFindAllVehiclesDto {
  length: number;
  data: IVehicle[];
}

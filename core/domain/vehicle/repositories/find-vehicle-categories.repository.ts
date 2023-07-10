import { IVehicleCategory } from '../entities/vehicle-category.entity';

export interface IFindVehicleCategoriesRepository {
  execute(): Promise<IVehicleCategory[]>;
}

import { IVehicleCategory } from '../entities/vehicle-category.entity';

export interface IFindVehicleCategoriesUseCase {
  execute(): Promise<IVehicleCategory[]>;
}

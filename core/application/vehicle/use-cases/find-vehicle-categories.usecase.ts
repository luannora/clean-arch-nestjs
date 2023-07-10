import { IVehicleCategory } from '@domain/vehicle/entities/vehicle-category.entity';
import { IFindVehicleCategoriesRepository } from '@domain/vehicle/repositories/find-vehicle-categories.repository';
import { IFindVehicleCategoriesUseCase } from '@domain/vehicle/use-cases/find-vehicle-categories.usecase';

export class FindVehicleCategoriesUseCase
  implements IFindVehicleCategoriesUseCase
{
  constructor(
    private readonly findVehicleCategoriesRepository: IFindVehicleCategoriesRepository,
  ) {}

  async execute(): Promise<IVehicleCategory[]> {
    return await this.findVehicleCategoriesRepository.execute();
  }
}

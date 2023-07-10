import { IFindVehicleCategoriesUseCase } from '@domain/vehicle/use-cases/find-vehicle-categories.usecase';

export class FindVehicleCategoriesService {
  constructor(
    private readonly findVehicleCategoryUC: IFindVehicleCategoriesUseCase,
  ) {}

  async execute() {
    return await this.findVehicleCategoryUC.execute();
  }
}

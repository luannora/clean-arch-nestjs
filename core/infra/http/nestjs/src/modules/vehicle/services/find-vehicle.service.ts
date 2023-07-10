import { IFindVehicleUseCase } from '@domain/vehicle/use-cases/find-vehicles.usecase';
import { RequestFindAllVehiclesDTO } from '../dtos/request-find-all-vehicles.dto';

export class FindVehicleService {
  constructor(private readonly findVehicleUC: IFindVehicleUseCase) {}

  async execute(paramsDTO: RequestFindAllVehiclesDTO, userId: string) {
    return await this.findVehicleUC.execute(paramsDTO, userId);
  }
}

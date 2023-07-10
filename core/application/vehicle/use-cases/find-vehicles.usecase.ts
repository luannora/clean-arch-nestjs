import { IRequestFindAllVehiclesDTO } from '@domain/vehicle/dtos/request-find-all-vehicles.dto';
import { IResponseFindAllVehiclesDto } from '@domain/vehicle/dtos/response-find-all-vehicles.dto';
import { IFindVehiclesRepository } from '@domain/vehicle/repositories/find-vehicles.repository';
import { IFindVehicleUseCase } from '@domain/vehicle/use-cases/find-vehicles.usecase';

export class FindVehicleUseCase implements IFindVehicleUseCase {
  constructor(
    private readonly findVehiclesRepository: IFindVehiclesRepository,
  ) {}

  async execute(
    paramsDTO: IRequestFindAllVehiclesDTO,
    userId: string,
  ): Promise<IResponseFindAllVehiclesDto> {
    return await this.findVehiclesRepository.execute(paramsDTO, userId);
  }
}

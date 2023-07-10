import { HttpExceptionEnum } from '@domain/_protocols/errors/http.enum';
import { HttpError } from '@domain/_protocols/errors/http.error';
import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';
import { IFindVehicleByIdRepository } from '@domain/vehicle/repositories/find-vehicle-by-id.repository';
import { IUpdateVehicleRepository } from '@domain/vehicle/repositories/update-vehicle.repository';
import { IUpdateVehicleUseCase } from '@domain/vehicle/use-cases/update-vehicle.usecase';
import { validate as isValidUUID } from 'uuid';

export class UpdateVehicleUseCase implements IUpdateVehicleUseCase {
  constructor(
    private readonly updateVehicleRepository: IUpdateVehicleRepository,
    private readonly findVehicleByIdRepository: IFindVehicleByIdRepository,
  ) {}
  async execute(paramsDTO: IVehicle): Promise<IVehicle> {
    if (!isValidUUID(paramsDTO.id)) {
      throw new HttpError({
        code: HttpExceptionEnum.NOT_FOUND,
        message: 'ID Inválido',
      });
    }

    let vehicleExists = await this.findVehicleByIdRepository.execute(
      paramsDTO.id,
    );

    if (!vehicleExists) {
      throw new HttpError({
        code: HttpExceptionEnum.NOT_FOUND,
        message: 'Veículo não localizado',
      });
    }

    let update = await this.updateVehicleRepository.execute(paramsDTO);
    return update;
  }
}

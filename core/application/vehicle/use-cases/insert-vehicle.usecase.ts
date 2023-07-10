import { HttpExceptionEnum } from '@domain/_protocols/errors/http.enum';
import { HttpError } from '@domain/_protocols/errors/http.error';
import { IFindByUUIDUserRepository } from '@domain/user/repositories/find-by-uuid-user.repository';
import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';
import { IFindVehicleByPlateRepository } from '@domain/vehicle/repositories/find-vehicle-by-plate.repository';
import { IInsertVehicleRepository } from '@domain/vehicle/repositories/insert-vehicle.repository';
import { IInsertVehicleUserUseCase } from '@domain/vehicle/use-cases/insert-vehicle.usecase';

export class InsertVehicleUserUseCase implements IInsertVehicleUserUseCase {
  constructor(
    private readonly insertVehicleRepository: IInsertVehicleRepository,
    private readonly findVehicleByPlateRepository: IFindVehicleByPlateRepository,
    private readonly findUserByIdRepository: IFindByUUIDUserRepository,
  ) {}
  async execute(paramsDTO: IVehicle, userId: string): Promise<IVehicle> {
    let vehicleExists = await this.findVehicleByPlateRepository.execute(
      paramsDTO.plate,
      userId,
    );

    if (vehicleExists) {
      throw new HttpError({
        code: HttpExceptionEnum.CONFLICT,
        message: 'Veículo já cadastrado',
      });
    }

    let user = await this.findUserByIdRepository.execute(userId);
    paramsDTO.user = user;
    let inserted = await this.insertVehicleRepository.execute(paramsDTO);
    delete inserted.user;
    return inserted;
  }
}

/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';
import { IUpdateVehicleUseCase } from '@domain/vehicle/use-cases/update-vehicle.usecase';

@Injectable()
export class UpdateVehicleService {
  constructor(private readonly updateVehicleUC: IUpdateVehicleUseCase) {}

  async execute(paramsDTO: IVehicle) {
    return await this.updateVehicleUC.execute(paramsDTO);
  }
}

/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { IInsertVehicleUserUseCase } from '@domain/vehicle/use-cases/insert-vehicle.usecase';
import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';

@Injectable()
export class InsertVehicleService {
  constructor(private readonly insertVehicleUC: IInsertVehicleUserUseCase) {}

  async execute(paramsDTO: IVehicle, userId: string) {
    return await this.insertVehicleUC.execute(paramsDTO, userId);
  }
}

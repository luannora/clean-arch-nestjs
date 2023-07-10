/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { IDeleteVehicleUseCase } from '@domain/vehicle/use-cases/delete-vehicle.usecase';

@Injectable()
export class DeleteVehicleService {
  constructor(private readonly deleteVehicleUC: IDeleteVehicleUseCase) {}

  async execute(vehicleId: string) {
    return await this.deleteVehicleUC.execute(vehicleId);
  }
}

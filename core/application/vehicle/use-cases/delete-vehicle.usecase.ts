import { HttpExceptionEnum } from '@domain/_protocols/errors/http.enum';
import { HttpError } from '@domain/_protocols/errors/http.error';
import { IDeleteVehicleRepository } from '@domain/vehicle/repositories/delete-vehicle.repository';
import { IDeleteVehicleUseCase } from '@domain/vehicle/use-cases/delete-vehicle.usecase';
import { validate as isValidUUID } from 'uuid';

export class DeleteVehicleUseCase implements IDeleteVehicleUseCase {
  constructor(
    private readonly deleteVehicleRepository: IDeleteVehicleRepository,
  ) {}

  async execute(id: string): Promise<any> {
    if (!isValidUUID(id)) {
      throw new HttpError({
        code: HttpExceptionEnum.NOT_FOUND,
        message: 'ID Inválido',
      });
    }

    let result = await this.deleteVehicleRepository.execute(id);
    if (result) {
      return {
        success: true,
        message: 'Veículo deletado com sucesso',
        data: null,
      };
    } else {
      throw {
        success: false,
        message: 'Falha ao deletar veículo',
        data: null,
      };
    }
  }
}

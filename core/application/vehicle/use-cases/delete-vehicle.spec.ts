import { HttpExceptionEnum } from '@domain/_protocols/errors/http.enum';
import { HttpError } from '@domain/_protocols/errors/http.error';
import { IDeleteVehicleRepository } from '@domain/vehicle/repositories/delete-vehicle.repository';
import { DeleteVehicleUseCase } from './delete-vehicle.usecase';

describe('DeleteVehicleUseCase', () => {
  let deleteVehicleUseCase: DeleteVehicleUseCase;
  let deleteVehicleRepository: jest.Mocked<IDeleteVehicleRepository>;

  beforeEach(() => {
    deleteVehicleRepository = {
      execute: jest.fn(),
    } as jest.Mocked<IDeleteVehicleRepository>;
    deleteVehicleUseCase = new DeleteVehicleUseCase(deleteVehicleRepository);
  });

  it('should delete a vehicle and return success response', async () => {
    const id = 'valid-id';
    deleteVehicleRepository.execute.mockResolvedValue(true);

    const result = await deleteVehicleUseCase.execute(id);
    console.log(result)

    expect(deleteVehicleRepository.execute).toHaveBeenCalledWith(id);
    expect(result).toEqual({
      success: true,
      message: 'Veículo deletado com sucesso',
      data: null,
    });
  });

  it('should throw HttpError when given an invalid ID', async () => {
    const id = 'invalid-id';
    deleteVehicleRepository.execute.mockResolvedValue(true);

    await expect(deleteVehicleUseCase.execute(id)).rejects.toThrow(HttpError);
    expect(deleteVehicleRepository.execute).not.toHaveBeenCalled();
  });

  it('should throw an error when failed to delete a vehicle', async () => {
    const id = 'valid-id';
    deleteVehicleRepository.execute.mockResolvedValue(false);

    await expect(deleteVehicleUseCase.execute(id)).rejects.toEqual({
      success: false,
      message: 'Falha ao deletar veículo',
      data: null,
    });
    expect(deleteVehicleRepository.execute).toHaveBeenCalledWith(id);
  });
});

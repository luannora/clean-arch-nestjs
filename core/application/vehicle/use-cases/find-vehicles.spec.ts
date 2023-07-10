import { IRequestFindAllVehiclesDTO } from '@domain/vehicle/dtos/request-find-all-vehicles.dto';
import { IFindVehiclesRepository } from '@domain/vehicle/repositories/find-vehicles.repository';

import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';
import { FindVehicleUseCase } from './find-vehicles.usecase';

describe('FindVehicleUseCase', () => {
  let findVehicleUseCase: FindVehicleUseCase;
  let findVehiclesRepository: jest.Mocked<IFindVehiclesRepository>;

  beforeEach(() => {
    findVehiclesRepository = {
      execute: jest.fn(),
    } as jest.Mocked<IFindVehiclesRepository>;
    findVehicleUseCase = new FindVehicleUseCase(findVehiclesRepository);
  });

  it('should return the list of vehicles', async () => {
    const paramsDTO: IRequestFindAllVehiclesDTO = {
      plate: 'ABC123',
      page: 1,
      limit: 10,
      orderBy: 'createdAt',
      orderDirection: 'desc',
    };
    const userId = 'user-id';
    const vehicles: IVehicle[] = [];

    findVehiclesRepository.execute.mockResolvedValue({
      data: vehicles,
      length: 1
    });

    const result = await findVehicleUseCase.execute(paramsDTO, userId);

    expect(findVehiclesRepository.execute).toHaveBeenCalledWith(paramsDTO, userId);
    expect(result).toEqual({
      data: vehicles,
      length: 1
    });
  });

  it('should return an empty list of vehicles', async () => {
    const paramsDTO: IRequestFindAllVehiclesDTO = {
      page: 1,
      limit: 10,
    };
    const userId = 'user-id';
    const vehicles: IVehicle[] = [];

    findVehiclesRepository.execute.mockResolvedValue({
      data: vehicles,
      length: 1
    });

    const result = await findVehicleUseCase.execute(paramsDTO, userId);

    expect(findVehiclesRepository.execute).toHaveBeenCalledWith(paramsDTO, userId);
    expect(result).toEqual({
      data: vehicles,
      length: 1,
    });
  });
});

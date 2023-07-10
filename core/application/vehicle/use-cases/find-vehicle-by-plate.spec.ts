import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';
import { IFindVehicleByPlateRepository } from '@domain/vehicle/repositories/find-vehicle-by-plate.repository';
import { FindVehicleByPlateUseCase } from './find-vehicle-by-plate.usecase';
import { IUser } from '@domain/user/entities/user.entity';

describe('FindVehicleByPlateUseCase', () => {
  let findVehicleByPlateUseCase: FindVehicleByPlateUseCase;
  let findVehicleRepository: jest.Mocked<IFindVehicleByPlateRepository>;

  beforeEach(() => {
    findVehicleRepository = {
      execute: jest.fn(),
    } as jest.Mocked<IFindVehicleByPlateRepository>;
    findVehicleByPlateUseCase = new FindVehicleByPlateUseCase(findVehicleRepository);
  });

  it('should return the vehicle when found', async () => {
    const plate = 'ABC1234';
    const userId = 'user-id';
    const vehicle: IVehicle = {
      id: 'vehicle-id',
      plate,
      axles: 2,
      observation: 'Some observation',
      user: {} as IUser,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    findVehicleRepository.execute.mockResolvedValue(vehicle);

    const result = await findVehicleByPlateUseCase.execute(plate, userId);

    expect(findVehicleRepository.execute).toHaveBeenCalledWith(plate, userId);
    expect(result).toEqual(vehicle);
  });

  it('should return null when vehicle is not found', async () => {
    const plate = 'non-existent-plate';
    const userId = 'user-id';
    findVehicleRepository.execute.mockResolvedValue(null);

    const result = await findVehicleByPlateUseCase.execute(plate, userId);

    expect(findVehicleRepository.execute).toHaveBeenCalledWith(plate, userId);
    expect(result).toBeNull();
  });
});

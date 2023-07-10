import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';
import { IFindVehicleByIdRepository } from '@domain/vehicle/repositories/find-vehicle-by-id.repository';
import { FindVehicleByIdUseCase } from './find-vehicle-by-id.usecase';
import { IUser } from '@domain/user/entities/user.entity';

describe('FindVehicleByIdUseCase', () => {
  let findVehicleByIdUseCase: FindVehicleByIdUseCase;
  let findVehicleRepository: jest.Mocked<IFindVehicleByIdRepository>;

  beforeEach(() => {
    findVehicleRepository = {
      execute: jest.fn(),
    } as jest.Mocked<IFindVehicleByIdRepository>;
    findVehicleByIdUseCase = new FindVehicleByIdUseCase(findVehicleRepository);
  });

  it('should return the vehicle when found', async () => {
    const id = 'valid-id';
    const vehicle: IVehicle = {
      id,
      plate: 'ABC1234',
      axles: 2,
      observation: 'Some observation',
      user: {} as IUser,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    findVehicleRepository.execute.mockResolvedValue(vehicle);

    const result = await findVehicleByIdUseCase.execute(id);

    expect(findVehicleRepository.execute).toHaveBeenCalledWith(id);
    expect(result).toEqual(vehicle);
  });

  it('should return null when vehicle is not found', async () => {
    const id = 'non-existent-id';
    findVehicleRepository.execute.mockResolvedValue(null);

    const result = await findVehicleByIdUseCase.execute(id);

    expect(findVehicleRepository.execute).toHaveBeenCalledWith(id);
    expect(result).toBeNull();
  });
});


import { IInsertVehicleRepository } from '@domain/vehicle/repositories/insert-vehicle.repository';
import { IFindVehicleByPlateRepository } from '@domain/vehicle/repositories/find-vehicle-by-plate.repository';
import { IFindByUUIDUserRepository } from '@domain/user/repositories/find-by-uuid-user.repository';
import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';
import { IUser, UserRoleEnum, UserStatusEnum } from '@domain/user/entities/user.entity';
import { HttpExceptionEnum } from '@domain/_protocols/errors/http.enum';
import { HttpError } from '@domain/_protocols/errors/http.error';
import { InsertVehicleUserUseCase } from './insert-vehicle.usecase';

describe('InsertVehicleUserUseCase', () => {
  let insertVehicleUserUseCase: InsertVehicleUserUseCase;
  let insertVehicleRepository: jest.Mocked<IInsertVehicleRepository>;
  let findVehicleByPlateRepository: jest.Mocked<IFindVehicleByPlateRepository>;
  let findUserByIdRepository: jest.Mocked<IFindByUUIDUserRepository>;

  beforeEach(() => {
    insertVehicleRepository = {
      execute: jest.fn(),
    } as jest.Mocked<IInsertVehicleRepository>;
    findVehicleByPlateRepository = {
      execute: jest.fn(),
    } as jest.Mocked<IFindVehicleByPlateRepository>;
    findUserByIdRepository = {
      execute: jest.fn(),
    } as jest.Mocked<IFindByUUIDUserRepository>;
    insertVehicleUserUseCase = new InsertVehicleUserUseCase(
      insertVehicleRepository,
      findVehicleByPlateRepository,
      findUserByIdRepository,
    );
  });

  it('should insert a new vehicle and return the inserted vehicle', async () => {
    const paramsDTO: IVehicle = {
      plate: 'ABC123',
      axles: 4,
      observation: 'Some observation',
    };
    const userId = 'user-id';
    const user: IUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      bornDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: UserStatusEnum.ACTIVE,
      role: UserRoleEnum.ADMIN,
      temporaryPassword: 'temp123',
      update_temporary_pass: new Date(),
    };
    const insertedVehicle: IVehicle = {
      id: 'vehicle-id',
      plate: 'ABC123',
      axles: 4,
      observation: 'Some observation',
      user,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    findVehicleByPlateRepository.execute.mockResolvedValue(null);
    findUserByIdRepository.execute.mockResolvedValue(user);
    insertVehicleRepository.execute.mockResolvedValue(insertedVehicle);

    const result = await insertVehicleUserUseCase.execute(paramsDTO, userId);

    expect(findVehicleByPlateRepository.execute).toHaveBeenCalledWith(
      paramsDTO.plate,
      userId,
    );
    expect(findUserByIdRepository.execute).toHaveBeenCalledWith(userId);
    expect(insertVehicleRepository.execute).toHaveBeenCalledWith(paramsDTO);
    expect(result).toEqual(insertedVehicle);
  });

  it('should throw an HttpError if the vehicle already exists', async () => {
    const paramsDTO: IVehicle = {
      plate: 'ABC123',
      axles: 4,
      observation: 'Some observation',
    };
    const userId = 'user-id';
    const user: IUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      bornDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: UserStatusEnum.ACTIVE,
      role: UserRoleEnum.ADMIN,
      temporaryPassword: 'temp123',
      update_temporary_pass: new Date(),
    };

    findVehicleByPlateRepository.execute.mockResolvedValue(paramsDTO);
    findUserByIdRepository.execute.mockResolvedValue(user);

    try {
      await insertVehicleUserUseCase.execute(paramsDTO, userId)
    } catch (error) {
      expect(findVehicleByPlateRepository.execute).toHaveBeenCalledWith(
        paramsDTO.plate,
        userId,
      );
    }

    expect(insertVehicleRepository.execute).not.toHaveBeenCalled();
  });
});

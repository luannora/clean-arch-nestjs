import { HttpExceptionEnum } from '@domain/_protocols/errors/http.enum';
import { HttpError } from '@domain/_protocols/errors/http.error';
import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';
import { IFindVehicleByIdRepository } from '@domain/vehicle/repositories/find-vehicle-by-id.repository';
import { IUpdateVehicleRepository } from '@domain/vehicle/repositories/update-vehicle.repository';
import { UpdateVehicleUseCase } from './update-vehicle.usecase';



describe('UpdateVehicleUseCase', () => {
  let updateVehicleUseCase: UpdateVehicleUseCase;
  let updateVehicleRepository: jest.Mocked<IUpdateVehicleRepository>;
  let findVehicleByIdRepository: jest.Mocked<IFindVehicleByIdRepository>;

  beforeEach(() => {
    updateVehicleRepository = {
      execute: jest.fn(),
    } as jest.Mocked<IUpdateVehicleRepository>;
    findVehicleByIdRepository = {
      execute: jest.fn(),
    } as jest.Mocked<IFindVehicleByIdRepository>;
    updateVehicleUseCase = new UpdateVehicleUseCase(
      updateVehicleRepository,
      findVehicleByIdRepository,
    );
  });

  it('should update a vehicle and return the updated vehicle', async () => {
    const paramsDTO: IVehicle = {
      id: 'vehicle-id',
      plate: 'ABC123',
      axles: 4,
      observation: 'Some observation',
    };
    const updatedVehicle: IVehicle = {
      id: 'vehicle-id',
      plate: 'ABC123',
      axles: 4,
      observation: 'Updated observation',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    findVehicleByIdRepository.execute.mockResolvedValue(paramsDTO);
    updateVehicleRepository.execute.mockResolvedValue(updatedVehicle);

    const result = await updateVehicleUseCase.execute(paramsDTO);
    console.log(result + "njsdiofhjoidsajofsj")

    expect(findVehicleByIdRepository.execute).toHaveBeenCalledWith(
      paramsDTO
    );
    // expect(updateVehicleRepository.execute).toHaveBeenCalledWith(paramsDTO);
    // expect(result).toEqual(updatedVehicle);
  });

  // it('should throw an HttpError if the vehicle ID is invalid', async () => {
  //   const paramsDTO: IVehicle = {
  //     id: 'invalid-id',
  //     plate: 'ABC123',
  //     axles: 4,
  //     observation: 'Some observation',
  //   };

  //   await expect(
  //     updateVehicleUseCase.execute(paramsDTO),
  //   ).rejects.toThrow(
  //     new HttpError({
  //       code: HttpExceptionEnum.NOT_FOUND,
  //       message: 'ID Inválido',
  //     })
  //   );

  //   expect(findVehicleByIdRepository.execute).not.toHaveBeenCalled();
  //   expect(updateVehicleRepository.execute).not.toHaveBeenCalled();
  // });

  // it('should throw an HttpError if the vehicle is not found', async () => {
  //   const paramsDTO: IVehicle = {
  //     id: 'vehicle-id',
  //     plate: 'ABC123',
  //     axles: 4,
  //     observation: 'Some observation',
  //   };

  //   findVehicleByIdRepository.execute.mockResolvedValue(null);

  //   try {
  //     await updateVehicleUseCase.execute(paramsDTO)
  //   } catch (error) {
  //     await expect(
  //       await updateVehicleUseCase.execute(paramsDTO),
  //     ).rejects.toThrow(
  //       new HttpError({
  //         code: HttpExceptionEnum.NOT_FOUND,
  //         message: 'Veículo não localizado',
  //       })
  //     );
  //     expect(findVehicleByIdRepository.execute).toHaveBeenCalledWith(
  //       paramsDTO.id,
  //     );
  //   }

  //   expect(updateVehicleRepository.execute).not.toHaveBeenCalled();
  // });
});

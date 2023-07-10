import { IRequestFindAllVehiclesDTO } from '../dtos/request-find-all-vehicles.dto';
import { IResponseFindAllVehiclesDto } from '../dtos/response-find-all-vehicles.dto';

export interface IFindVehiclesRepository {
  execute(
    paramsDTO: IRequestFindAllVehiclesDTO,
    userId: string,
  ): Promise<IResponseFindAllVehiclesDto>;
}

import { IPaginate } from '@domain/_protocols/dtos/paginate.dto';

export interface IRequestFindAllVehiclesDTO extends IPaginate {
  plate?: string;
}

import { IRequestFindAllVehiclesDTO } from '@domain/vehicle/dtos/request-find-all-vehicles.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginateDTO } from '../../../_shared/dtos/paginate.dto';

export class RequestFindAllVehiclesDTO
  extends PaginateDTO
  implements IRequestFindAllVehiclesDTO
{
  @ApiPropertyOptional()
  plate?: string;
}

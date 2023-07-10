import { IResponseFindAllVehiclesDto } from '@domain/vehicle/dtos/response-find-all-vehicles.dto';
import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseFindAllVehiclesDTO implements IResponseFindAllVehiclesDto {
  @ApiProperty()
  length: number;

  @ApiProperty()
  data: IVehicle[];
}

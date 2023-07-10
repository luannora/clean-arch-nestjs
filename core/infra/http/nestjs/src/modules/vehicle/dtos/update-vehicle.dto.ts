import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateVehicleDTO {
  @ApiProperty()
  @IsString()
  observation: string;
}

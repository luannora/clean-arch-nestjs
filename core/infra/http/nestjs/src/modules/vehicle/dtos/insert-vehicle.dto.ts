import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InsertVehicleDTO {
  @ApiProperty()
  @IsString()
  plate: string;

  @ApiProperty()
  @IsString()
  vehicleCategoryId: string;

  @ApiPropertyOptional()
  @IsString()
  observation: string;
}

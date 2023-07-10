import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterAddressDTO {
  @ApiProperty()
  @IsString()
  addressName: string;

  @ApiProperty()
  @IsString()
  addressZipCode: string;

  @ApiProperty()
  @IsString()
  addressNumber: string;

  @ApiProperty()
  @IsString()
  addressComplement: string;

  @ApiProperty()
  @IsString()
  federalState: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  district: string;
}

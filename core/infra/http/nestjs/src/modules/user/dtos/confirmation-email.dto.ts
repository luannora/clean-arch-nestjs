import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ConfirmationEmailDTO {
  @ApiProperty()
  @IsNotEmpty()
  code: string;
}

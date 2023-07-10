import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResendConfirmationEmailDTO {
  @ApiProperty()
  @IsNotEmpty()
  email: string;
}

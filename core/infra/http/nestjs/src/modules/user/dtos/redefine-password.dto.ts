import { IRedefinePasswordDTO } from '@domain/user/dtos/redefinePasswordDTO';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RedefinePasswordDTO implements IRedefinePasswordDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  newPasswordConfirm: string;

  @ApiProperty()
  @IsNotEmpty()
  newPassword: string;
}

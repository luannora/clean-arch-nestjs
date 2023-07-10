import { IPasswordRecoveryDTO } from '@domain/user/dtos/password-recovery.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class PasswordRecoveryDTO implements IPasswordRecoveryDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  emailOrDocument: string;
}

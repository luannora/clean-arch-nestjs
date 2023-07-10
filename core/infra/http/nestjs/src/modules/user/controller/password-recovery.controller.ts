import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { PasswordRecoveryDTO } from '../dtos/passoword-recovery.dto';
import { PasswordRecoveryService } from '../services/password-recovery.service';

@Controller('password-recovery')
export class PasswordRecoveryController {
  constructor(
    private readonly passwordRecoveryService: PasswordRecoveryService,
  ) {}

  @Post('send-email')
  async handle(@Body() data: PasswordRecoveryDTO) {
    try {
      return await this.passwordRecoveryService.execute(data);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}

import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResendEmailConfirmationService } from '../services/resend-email-confirmation.service';
import { ResendConfirmationEmailDTO } from '../dtos/resend-confirmation-email.dto';

@Controller('resend-email-confirmation')
export class ResendEmailConfirmationController {
  constructor(
    private readonly resendConfirmatinUserService: ResendEmailConfirmationService,
  ) {}

  @ApiTags('user')
  @Post()
  async handle(@Body() params: ResendConfirmationEmailDTO) {
    try {
      return await this.resendConfirmatinUserService.execute(params);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

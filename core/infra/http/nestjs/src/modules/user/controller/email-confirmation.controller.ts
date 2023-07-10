import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailConfirmationService } from '../services/email-confirmation.service';
import { ConfirmationEmailDTO } from '../dtos/confirmation-email.dto';

@Controller('email-confirmation')
export class EmailConfirmationUserController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @ApiTags('user')
  @Post()
  async handle(@Body() params: ConfirmationEmailDTO) {
    try {
      return await this.emailConfirmationService.execute(params);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

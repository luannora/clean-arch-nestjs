import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDTO } from '../dtos/register-user.dto';
import { RegisterUserService } from '../services/register-user.service';

@Controller('register-user')
export class RegisterUserController {
  constructor(private readonly registerUserService: RegisterUserService) {}

  @ApiTags('user')
  @Post()
  async handle(@Body() data: RegisterUserDTO) {
    try {
      return await this.registerUserService.execute(data);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

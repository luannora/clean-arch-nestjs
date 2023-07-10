/*
https://docs.nestjs.com/controllers#controllers
*/

import { IAccount } from '@domain/account/entities/account.entity';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadGatewayResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MovementAccountDTO } from '../dtos/movement-account.dto';
import { MovementAccountService } from '../services/movement-account.service';

@Controller('account')
export class MovementAccountController {
  constructor(private readonly moveAccountService: MovementAccountService) {}
  @ApiTags('account')
  @Post('test-move-account')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadGatewayResponse({ description: 'Bad Gateway' })
  async getAccount(@Body() params: MovementAccountDTO): Promise<IAccount> {
    try {
      return await this.moveAccountService.execute(params);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

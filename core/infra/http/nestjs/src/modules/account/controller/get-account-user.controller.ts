/*
https://docs.nestjs.com/controllers#controllers
*/

import { IAccount } from '@domain/account/entities/account.entity';
import {
  BadRequestException,
  Controller,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadGatewayResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetAccountByUserIdService } from '../services/get-account-by-user-id.service';

@Controller('account')
export class GetAccountUserController {
  constructor(
    private readonly getAccountByUserIdService: GetAccountByUserIdService,
  ) {}
  @ApiTags('account')
  @Get('')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadGatewayResponse({ description: 'Bad Gateway' })
  async getAccount(@Request() req): Promise<IAccount> {
    try {
      return await this.getAccountByUserIdService.execute(req.user.id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

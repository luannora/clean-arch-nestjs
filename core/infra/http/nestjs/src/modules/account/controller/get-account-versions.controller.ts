/*
https://docs.nestjs.com/controllers#controllers
*/

import { IAccount } from '@domain/account/entities/account.entity';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
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
import { IAccountVersions } from '@domain/account/entities/account_versions.entity';
import { GetAccountVersionsService } from '../services/get-account-versions.service';

@Controller('account')
export class GetAccountVersionsController {
  constructor(
    private readonly getAccountVersionsService: GetAccountVersionsService,
  ) {}
  @ApiTags('account')
  @Get(':accountId/versions')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadGatewayResponse({ description: 'Bad Gateway' })
  async getAccount(
    @Param('accountId') accountId: string,
  ): Promise<IAccountVersions[]> {
    try {
      return await this.getAccountVersionsService.execute(accountId);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

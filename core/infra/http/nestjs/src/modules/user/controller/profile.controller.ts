/*
https://docs.nestjs.com/controllers#controllers
*/

import { IUser } from '@domain/user/entities/user.entity';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadGatewayResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

@Controller()
export class ProfileController {
  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadGatewayResponse({ description: 'Bad Gateway' })
  async getProfile(@Request() req): Promise<IUser> {
    delete req.user.password;
    return req.user;
  }
}

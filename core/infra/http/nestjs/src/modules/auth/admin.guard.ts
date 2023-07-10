/*
https://docs.nestjs.com/guards#guards
*/

import { UserRoleEnum } from '@domain/user/entities/user.entity';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role == UserRoleEnum.ADMIN) {
      return true;
    }
    throw new UnauthorizedException();
  }
}

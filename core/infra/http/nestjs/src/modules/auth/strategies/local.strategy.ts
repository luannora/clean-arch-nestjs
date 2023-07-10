import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { IUser } from '@domain/user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<IUser> {
    try {
      const user: IUser = await this.authService.validateUser(email, password);

      delete user.password;
      delete user.code;
      delete user.codeExpirationDate;
      delete user.update_temporary_pass;

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

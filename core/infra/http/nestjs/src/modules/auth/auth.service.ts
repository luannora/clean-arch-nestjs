import { IUser } from '@domain/user/entities/user.entity';
import { ILoginUserUseCase } from '@domain/user/use-cases/login-user.usecase';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginUserUseCase: ILoginUserUseCase,
    private readonly jwtService: JwtService,
  ) { }

  validateUser(username: string, password: string): Promise<IUser> {
    return this.loginUserUseCase.execute({
      email: username,
      password: password,
    });
  }

  generateJWT(user: IUser): Promise<string> {
    return this.jwtService.signAsync({ user });
  }
}

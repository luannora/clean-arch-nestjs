import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginUserUseCase } from '@rootDir/core/application/user/use-cases/login-user.usecase';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    forwardRef(() => UserModule),
    PassportModule,
  ],
  providers: [
    {
      provide: AuthService,
      useFactory: (loginUC: LoginUserUseCase, jwtService: JwtService) => {
        return new AuthService(loginUC, jwtService);
      },
      inject: [LoginUserUseCase, JwtService],
    },
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule { }

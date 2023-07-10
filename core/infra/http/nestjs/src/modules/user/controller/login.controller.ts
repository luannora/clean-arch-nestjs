import { IUser } from '@domain/user/entities/user.entity';
import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { LocalAuthGuard } from '../../auth/auth.guard';
import { AuthService } from '../../auth/auth.service';

class LoginDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

@Controller('login')
export class LoginUserController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('user')
  @UseGuards(LocalAuthGuard)
  @Post()
  async handle(@Body() loginDTO: LoginDTO, @Request() req) {
    const user = req.user as IUser;

    const token = await this.authService.generateJWT(user);

    return {
      success: true,
      data: {
        token,
        user,
        message: 'Login realizado com sucesso.',
      },
    };
  }
}

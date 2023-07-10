import { IEncrypter } from '@domain/adapters/encrypter/encrypter.adapter';
import { ILoginDTO } from '@domain/user/dtos/login.dto';
import { IUser, UserStatusEnum } from '@domain/user/entities/user.entity';
import { IFindByEmailUserRepository } from '@domain/user/repositories/find-by-email-user.repository';
import { ILoginUserUseCase } from '@domain/user/use-cases/login-user.usecase';
import { HttpExceptionEnum } from '@domain/_protocols/errors/http.enum';
import { HttpError } from '@domain/_protocols/errors/http.error';

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    private readonly findByEmailUserRepository: IFindByEmailUserRepository,
    private readonly encrypter: IEncrypter,
  ) {}

  async execute(userDTO: ILoginDTO): Promise<IUser> {
    const user = await this.findByEmailUserRepository.execute(userDTO.email);

    if (!user) {
      throw new HttpError({
        code: HttpExceptionEnum.NOT_FOUND,
        message: 'Usuário não encontrado',
      });
    }

    if (user.status === UserStatusEnum.INACTIVE) {
      throw new HttpError({
        code: HttpExceptionEnum.FORBIDDEN,
        message: 'Usuário inativo, verifique seu e-mail.',
      });
    }

    if (user.status === UserStatusEnum.PRE_REGISTERED) {
      throw new HttpError({
        code: HttpExceptionEnum.FORBIDDEN,
        message: 'Usuário náo registrado.',
      });
    }

    const isPasswordValid = await this.encrypter.verify(
      userDTO.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpError({
        code: HttpExceptionEnum.UNAUTHORIZED,
        message: 'E-mail ou senha inválidos',
      });
    }

    return user;
  }
}

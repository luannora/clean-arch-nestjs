import { IEncrypter } from '@domain/adapters/encrypter/encrypter.adapter';
import { IRegisterUserDTO } from '@domain/user/dtos/register-user.dto';
import {
  IUser,
  UserRoleEnum,
  UserStatusEnum,
} from '@domain/user/entities/user.entity';
import { IRegisterUserUseCase } from '@domain/user/use-cases/register-user.usecase';
import { HttpExceptionEnum } from '@domain/_protocols/errors/http.enum';
import { HttpError } from '@domain/_protocols/errors/http.error';
import { RegisterUserUseCase } from './register-user.usecase';
import { ICpfValidator } from '../../../domain/adapters/cpf-validator/cpf-validator.adapter';
import { IMailerAdapter } from '@domain/adapters/mailer-adapter/mailter.adapter';
import { Mail } from '@domain/adapters/mailer-adapter/mail';
import { ITokenGeneratorAdapter } from '../../../domain/adapters/token-generator/token-generator.adapter';
import {
  ConfirmationMail,
  ConfirmationMailDataType,
} from '@infra/adapters/mailer-adapter/mail';
import { ILoginUserUseCase } from '@domain/user/use-cases/login-user.usecase';
import { LoginUserUseCase } from './login-user.usecase';

describe('Register User | UseCase', () => {
  let loginUserUseCase: ILoginUserUseCase;
  let encrypter: IEncrypter;
  let users: IUser[];

  class MockFindByEmailUserRepository {
    async execute(email: string): Promise<IUser> {
      return users.find((user) => user.email === email);
    }
  }

  class MockEncrypter implements IEncrypter {
    async encrypt(value: string): Promise<string> {
      return 'encrypted';
    }
    async verify(value: string, hash: string): Promise<boolean> {
      return true;
    }
  }

  beforeAll(() => {
    const findByEmailUserRepository = new MockFindByEmailUserRepository();
    encrypter = new MockEncrypter();
    loginUserUseCase = new LoginUserUseCase(
      findByEmailUserRepository,
      encrypter,
    );
  });

  beforeEach(() => {
    users = [];
  });

  it('should throw an error if user is not found', async () => {
    try {
      await loginUserUseCase.execute({
        email: 'validmail@mail.com',
        password: 'validpassword',
      });
      expect(false).toBeTruthy();
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.code).toBe(HttpExceptionEnum.NOT_FOUND);
    }
  });

  it('should be able to login if correct email and password was given', async () => {
    const user: IUser = {
      id: 'any_id',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'validmail@mail.com',
      password: 'hashpassword',
      status: UserStatusEnum.ACTIVE,
      name: '',
      bornDate: null,
      role: UserRoleEnum.USER,
      temporaryPassword: null,
      update_temporary_pass: null,
    };

    users.push(user);

    const result = await loginUserUseCase.execute({
      email: 'validmail@mail.com',
      password: 'validpassword',
    });

    expect(result).toBeTruthy();
    expect(result.id).toBe(user.id);
  });

  it('ensures that encrypter is called by loginUserUseCase', async () => {
    const user: IUser = {
      id: 'any_id',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'validmail@mail.com',
      password: 'passwordhashed',
      status: UserStatusEnum.ACTIVE,
      name: '',
      bornDate: null,
      role: UserRoleEnum.USER,
      temporaryPassword: null,
      update_temporary_pass: null,
    };

    users.push(user);

    const encrypterSpy = jest.spyOn(encrypter, 'verify');

    await loginUserUseCase.execute({
      email: 'validmail@mail.com',
      password: 'validpassword',
    });

    expect(encrypterSpy).toHaveBeenCalledWith(
      'validpassword',
      'passwordhashed',
    );
  });

  it('should throw an error if user is not active', async () => {
    const user: IUser = {
      id: 'any_id',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'validmail@mail.com',
      password: 'validpassword',
      status: UserStatusEnum.INACTIVE,
      name: '',
      bornDate: null,
      role: UserRoleEnum.USER,
      temporaryPassword: null,
      update_temporary_pass: null,
    };

    users.push(user);

    try {
      await loginUserUseCase.execute({
        email: 'validmail@mail.com',
        password: 'validpassword',
      });
      expect(false).toBeTruthy();
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.message).toBe('Usuário inativo, verifique seu e-mail.');
      expect(error.code).toBe(HttpExceptionEnum.FORBIDDEN);
    }
  });

  it('should throw an error if user is pre-registered', async () => {
    const user: IUser = {
      id: 'any_id',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'validmail@mail.com',
      password: 'validpassword',
      status: UserStatusEnum.PRE_REGISTERED,
      name: '',
      bornDate: null,
      role: UserRoleEnum.USER,
      temporaryPassword: null,
      update_temporary_pass: null,
    };

    users.push(user);

    try {
      await loginUserUseCase.execute({
        email: 'validmail@mail.com',
        password: 'validpassword',
      });
      expect(false).toBeTruthy();
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.message).toBe('Usuário náo registrado.');
      expect(error.code).toBe(HttpExceptionEnum.FORBIDDEN);
    }
  });
});

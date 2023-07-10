import { IEncrypter } from '@domain/adapters/encrypter/encrypter.adapter';
import { IRegisterUserDTO } from '@domain/user/dtos/register-user.dto';
import {
  IUser,
  UserRoleEnum,
  UserStatusEnum,
} from '@domain/user/entities/user.entity';
import { IRegisterUserUseCase } from '@domain/user/use-cases/register-user.usecase';
import { HttpExceptionEnum } from '@domain/_protocols/errors/http.enum';
import { RegisterUserUseCase } from './register-user.usecase';
import { IMailerAdapter } from '@domain/adapters/mailer-adapter/mailter.adapter';
import { Mail } from '@domain/adapters/mailer-adapter/mail';
import { ITokenGeneratorAdapter } from '../../../domain/adapters/token-generator/token-generator.adapter';
import {
  ConfirmationMail,
  ConfirmationMailDataType,
} from '@infra/adapters/mailer-adapter/mail';
import { ICpfValidator } from '@domain/adapters/cpf-validator/cpf-validator.adapter';
import { LoadTypeEnum, PlanTypeEnum } from '@domain/plan/entities/plan.entity';

describe('Register User | UseCase', () => {
  let registerUserUseCase: IRegisterUserUseCase;
  let encrypter: IEncrypter;
  let documentValidator: ICpfValidator;
  let mailAdapter: IMailerAdapter;
  let tokenGeneratorAdapter: ITokenGeneratorAdapter;
  let users: IUser[];

  class MockFindByEmailUserRepository {
    async execute(email: string): Promise<IUser> {
      return users.find((user) => user.email === email);
    }
  }

  class MockUpdateUserRepository {
    async execute(user: IUser): Promise<IUser | null> {
      users = users.filter((u) => u.id !== user.id);
      users.push(user);
      return user;
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

  class MockdocumentValidator implements ICpfValidator {
    isValid(document: string): boolean {
      return true;
    }
  }

  class MockMailAdapter implements IMailerAdapter {
    send<
      T extends Mail<T extends ConfirmationMail ? ConfirmationMailDataType : T>,
    >(mail: T): Promise<boolean> {
      return Promise.resolve(true);
    }
  }

  class MockTokenGeneratorAdapter implements ITokenGeneratorAdapter {
    generate(): string {
      return 'token';
    }
  }

  beforeAll(() => {
    const findByEmailUserRepository = new MockFindByEmailUserRepository();
    const updateUserRepository = new MockUpdateUserRepository();
    documentValidator = new MockdocumentValidator();
    encrypter = new MockEncrypter();
    mailAdapter = new MockMailAdapter();
    tokenGeneratorAdapter = new MockTokenGeneratorAdapter();
    registerUserUseCase = new RegisterUserUseCase(
      findByEmailUserRepository,
      updateUserRepository,
      documentValidator,
      encrypter,
      mailAdapter,
      tokenGeneratorAdapter,
    );
  });

  beforeEach(() => {
    users = [];
  });

  it('should throw an error if user already exists and its status is inactive', async () => {
    users.push({
      id: 'id',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'mockuser.mail.com',
      status: UserStatusEnum.INACTIVE,
      name: '',
      bornDate: null,
      role: UserRoleEnum.USER,
      temporaryPassword: null,
      update_temporary_pass: null,
    });

    const userDTO: IRegisterUserDTO = {
      email: 'mockuser.mail.com',
      document: '12345678901',
      documentType: 'PF',
      planType: PlanTypeEnum.PRE,
      loadType: LoadTypeEnum.AUTOMATIC,
      name: 'Teste',
      address: null,
      password: '123456',
      passwordConfirmation: '123456',
    };

    try {
      await registerUserUseCase.execute(userDTO);
      expect(0).toBe(1);
    } catch (error) {
      expect(error).toBeTruthy();
      expect(error.code).toBe(HttpExceptionEnum.CONFLICT);
      expect(error.message).toBe(
        'Cadastro já existe, por favor entre com seu login e senha para se logar no App',
      );
    }
  });

  it('should throw an error if user already exists and its status is active', async () => {
    users.push({
      id: 'id',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'mockuser.mail.com',
      status: UserStatusEnum.ACTIVE,
      name: '',
      bornDate: null,
      role: UserRoleEnum.USER,
      temporaryPassword: null,
      update_temporary_pass: null,
    });

    const userDTO: IRegisterUserDTO = {
      email: 'mockuser.mail.com',
      document: '12345678901',
      documentType: 'PF',
      planType: 1,
      name: 'Teste',
      address: null,
      password: '123456',
      passwordConfirmation: '123456',
    };

    try {
      await registerUserUseCase.execute(userDTO);
      expect(0).toBe(1);
    } catch (error) {
      expect(error).toBeTruthy();
      expect(error.code).toBe(HttpExceptionEnum.CONFLICT);
      expect(error.message).toBe(
        'Cadastro já existe, por favor entre com seu login e senha para se logar no App',
      );
    }
  });

  it('ensure RegisterUserUseCase calls encrypter', async () => {
    const userDTO: IRegisterUserDTO = {
      email: 'mockuser.mail.com',
      document: '12345678901',
      documentType: 'PF',
      planType: 1,
      name: 'Teste',
      address: null,
      password: '123456',
      passwordConfirmation: '123456',
    };

    const encrypterSpy = jest.spyOn(encrypter, 'encrypt');

    await registerUserUseCase.execute(userDTO);

    expect(encrypterSpy).toHaveBeenLastCalledWith('123456');
  });

  it('ensure RegisterUserUseCase calls documentValidator', async () => {
    const userDTO: IRegisterUserDTO = {
      email: 'mockuser.mail.com',
      document: '12345678901',
      documentType: 'PF',
      planType: 1,
      name: 'Teste',
      address: null,
      password: '123456',
      passwordConfirmation: '123456',
    };

    const documentValidatorSpy = jest.spyOn(documentValidator, 'isValid');

    await registerUserUseCase.execute(userDTO);

    expect(documentValidatorSpy).toHaveBeenLastCalledWith('12345678901', 'PF');
  });

  it('ensures that RegisterUserUseCase is calling EmailAdapter', async () => {
    const userDTO: IRegisterUserDTO = {
      email: 'mockuser.mail.com',
      document: '12345678901',
      documentType: 'PF',
      planType: 1,
      name: 'Teste',
      address: null,
      password: '123456',
      passwordConfirmation: '123456',
    };

    const mailAdapterSpy = jest.spyOn(mailAdapter, 'send');

    await registerUserUseCase.execute(userDTO);

    expect(mailAdapterSpy).toHaveBeenCalled();
  });

  it('ensures that RegisterUser is calling TokenGeneratorAdapter', async () => {
    const userDTO: IRegisterUserDTO = {
      email: 'mockuser.mail.com',
      document: '12345678901',
      documentType: 'PF',
      planType: 1,
      name: 'Teste',
      address: null,
      password: '123456',
      passwordConfirmation: '123456',
    };

    const tokenGeneratorAdapterSpy = jest.spyOn(
      tokenGeneratorAdapter,
      'generate',
    );

    await registerUserUseCase.execute(userDTO);

    expect(tokenGeneratorAdapterSpy).toHaveBeenCalled();
  });
});

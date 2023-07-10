import { Mail } from '@domain/adapters/mailer-adapter/mail';
import { IMailerAdapter } from '@domain/adapters/mailer-adapter/mailter.adapter';
import { ITokenGeneratorAdapter } from '@domain/adapters/token-generator/token-generator.adapter';
import {
  IUser,
  UserRoleEnum,
  UserStatusEnum,
} from '@domain/user/entities/user.entity';
import { IConfirmationMailUseCase } from '@domain/user/use-cases/confirmation-mail.usecase';
import { IResendEmailConfirmationUseCase } from '@domain/user/use-cases/resend-email-confirmation.usecase';
import { HttpExceptionEnum } from '@domain/_protocols/errors/http.enum';
import {
  ConfirmationMail,
  ConfirmationMailDataType,
} from '@infra/adapters/mailer-adapter/mail';
import { ConfirmationMailUseCase } from './confirmation-mail.usecase';
import { ResendEmailConfirmationUseCase } from './resend-email-confirmation.usecase';

describe('Resend Confirmation Mail | UseCase', () => {
  let resendConfirmationUserUseCase: IResendEmailConfirmationUseCase;
  let mailerAdapter: IMailerAdapter;
  let tokenGeneratorAdapter: ITokenGeneratorAdapter;
  let users: IUser[];

  class MockUpdateUserRepository {
    async execute(user: IUser): Promise<IUser | null> {
      users = users.filter((u) => u.id !== user.id);
      users.push(user);
      return user;
    }
  }

  class MockFindByEmailUserRepository {
    async execute(email: string): Promise<IUser> {
      return users.find((user) => user.email === email);
    }
  }

  class MockMailerAdapter implements IMailerAdapter {
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
    const findByEmailRepo = new MockFindByEmailUserRepository();
    mailerAdapter = new MockMailerAdapter();
    tokenGeneratorAdapter = new MockTokenGeneratorAdapter();
    const updateUserRepo = new MockUpdateUserRepository();
    resendConfirmationUserUseCase = new ResendEmailConfirmationUseCase(
      findByEmailRepo,
      updateUserRepo,
      mailerAdapter,
      tokenGeneratorAdapter,
    );
  });

  beforeEach(() => {
    users = [];
  });

  it('should return true if user is found', async () => {
    const user = {
      id: '1',
      email: 'email',
      name: '',
      bornDate: null,
      role: UserRoleEnum.USER,
      temporaryPassword: null,
      update_temporary_pass: null,
      status: UserStatusEnum.INACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(user);

    const result = await resendConfirmationUserUseCase.execute({
      email: 'email',
    });

    expect(result).toBeTruthy();
  });

  it('ensures that ResendEmailConfirmation is calling EmailAdapter', async () => {
    const user = {
      id: '1',
      email: 'email',
      status: UserStatusEnum.PRE_REGISTERED,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: '',
      bornDate: null,
      role: UserRoleEnum.USER,
      temporaryPassword: null,
      update_temporary_pass: null,
    };

    users.push(user);

    const mailAdapterSpy = jest.spyOn(mailerAdapter, 'send');

    await resendConfirmationUserUseCase.execute({
      email: 'email',
    });

    expect(mailAdapterSpy).toHaveBeenCalled();
  });

  it('ensures that ResendEmailConfirmation is calling TokenGeneratorAdapter', async () => {
    const user = {
      id: '1',
      email: 'email',
      status: UserStatusEnum.PRE_REGISTERED,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: '',
      bornDate: null,
      role: UserRoleEnum.USER,
      temporaryPassword: null,
      update_temporary_pass: null,
    };

    users.push(user);

    const tokenGeneratorAdapterSpy = jest.spyOn(
      tokenGeneratorAdapter,
      'generate',
    );

    await resendConfirmationUserUseCase.execute({
      email: 'email',
    });

    expect(tokenGeneratorAdapterSpy).toHaveBeenCalled();
  });

  it('should throw if user is active', async () => {
    const user = {
      id: '1',
      email: 'email',
      status: UserStatusEnum.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: '',
      bornDate: null,
      role: UserRoleEnum.USER,
      temporaryPassword: null,
      update_temporary_pass: null,
    };

    users.push(user);

    try {
      await resendConfirmationUserUseCase.execute({
        email: 'email',
      });

      expect(true).toBeFalsy();
    } catch (err) {
      expect(err).toBeTruthy();
      expect(err.message).toBe('Usurário já está ativo');
      expect(err.code).toBe(HttpExceptionEnum.BAD_REQUEST);
    }
  });
});

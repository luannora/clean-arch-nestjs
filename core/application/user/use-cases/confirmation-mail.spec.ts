import {
  IUser,
  UserRoleEnum,
  UserStatusEnum,
} from '@domain/user/entities/user.entity';
import { IConfirmationMailUseCase } from '@domain/user/use-cases/confirmation-mail.usecase';
import { ConfirmationMailUseCase } from './confirmation-mail.usecase';

describe('Confirmation Mail | UseCase', () => {
  let confirmationUserUseCase: IConfirmationMailUseCase;
  let users: IUser[];

  class MockFindByCodeUserRepository {
    async execute(code: string): Promise<IUser> {
      return users.find((user) => user.code === code);
    }
  }

  class MockUpdateUserRepository {
    async execute(user: IUser): Promise<IUser | null> {
      users = users.filter((u) => u.id !== user.id);
      users.push(user);
      return user;
    }
  }

  beforeAll(() => {
    const findByCodeRepo = new MockFindByCodeUserRepository();
    const updateUserRepo = new MockUpdateUserRepository();
    confirmationUserUseCase = new ConfirmationMailUseCase(
      findByCodeRepo,
      updateUserRepo,
    );
  });

  beforeEach(() => {
    users = [];
  });

  it('should activate the users account if code is correct', async () => {
    const user: IUser = {
      id: 'id',
      email: 'email',
      status: UserStatusEnum.INACTIVE,
      code: 'code',
      password: 'password',
      document: '98282060054',
      createdAt: new Date(),
      updatedAt: new Date(),
      name: '',
      bornDate: null,
      role: UserRoleEnum.USER,
      temporaryPassword: null,
      update_temporary_pass: null,
    };

    users.push(user);

    const result = await confirmationUserUseCase.execute({
      code: 'code',
    });

    expect(result).toBeTruthy();
    expect(result).toBe(true);
    expect(users[0].status).toBe(UserStatusEnum.ACTIVE);
  });

  it('should return false if user is not found', async () => {
    const result = await confirmationUserUseCase.execute({
      code: 'code',
    });

    expect(result).toBeFalsy();
    expect(result).toBe(false);
  });

  it('should return false if codeExpirationDate is less than now', async () => {
    const user: IUser = {
      id: 'id',
      email: 'email',
      status: UserStatusEnum.INACTIVE,
      code: 'code',
      password: 'password',
      document: '98282060054',
      documentType: 'PF',
      createdAt: new Date(),
      updatedAt: new Date(),
      codeExpirationDate: new Date(
        new Date().setDate(new Date().getDate() - 6),
      ),
      name: '',
      bornDate: null,
      role: UserRoleEnum.USER,
      temporaryPassword: null,
      update_temporary_pass: null,
    };

    users.push(user);

    const result = await confirmationUserUseCase.execute({
      code: 'code',
    });

    expect(result).toBe(false);
  });
});

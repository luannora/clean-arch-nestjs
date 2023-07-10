import { IConfirmationMailDTO } from '@domain/user/dtos/confirmation-mail.dto';
import { UserStatusEnum } from '@domain/user/entities/user.entity';
import { IFindByCodeUserRepository } from '@domain/user/repositories/find-by-code-user.repository';
import { IUpdateUserRepository } from '@domain/user/repositories/update-user.repository';
import { isBefore, addDays } from 'date-fns';

export class ConfirmationMailUseCase {
  constructor(
    private readonly findUserByCodeRepo: IFindByCodeUserRepository,
    private readonly updateUserRepo: IUpdateUserRepository,
  ) {}

  async execute(data: IConfirmationMailDTO): Promise<boolean> {
    const user = await this.findUserByCodeRepo.execute(data.code);

    if (!user) {
      return false;
    }

    if (isBefore(addDays(new Date(user.codeExpirationDate), 1), new Date())) {
      return false;
    }

    await this.updateUserRepo.execute({
      ...user,
      status: UserStatusEnum.ACTIVE,
      code: null,
    });

    return true;
  }
}

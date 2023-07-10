import { IEncrypter } from '@domain/adapters/encrypter/encrypter.adapter';
import { IMailerAdapter } from '@domain/adapters/mailer-adapter/mailter.adapter';
import { IRedefinePasswordDTO } from '@domain/user/dtos/redefinePasswordDTO';
import { IUser } from '@domain/user/entities/user.entity';
import { IFindByEmailUserRepository } from '@domain/user/repositories/find-by-email-user.repository';
import { IUpdateUserRepository } from '@domain/user/repositories/update-user.repository';
import { PassUpdatedSuccessfullyMail } from '@infra/adapters/mailer-adapter/mail';
import { BadRequestException } from '@nestjs/common';

export class RedefinePasswordUseCase {
  constructor(
    private readonly findByEmailUserRepo: IFindByEmailUserRepository,
    private readonly updateUserRepository: IUpdateUserRepository,
    private readonly mailerAdapter: IMailerAdapter,
    private readonly encrypter: IEncrypter,
  ) {}

  async execute(data: IRedefinePasswordDTO): Promise<IUser> {
    const user = await this.findByEmailUserRepo.execute(data.email);
    if (!user) {
      throw new Error(`Usuário não encontrado`);
    }
    const now = new Date();
    const oneDay = 86400000;
    const updateTemporaryPassMillissecconds =
      user.update_temporary_pass.getTime();
    const nowMillissecconds = now.getTime();
    const diference = nowMillissecconds - updateTemporaryPassMillissecconds;
    if (diference >= oneDay) {
      throw new BadRequestException(
        'Sua senha temporaria foi expirada, solite uma nova e tente novamente.',
      );
    }

    if (data.newPassword.length > 15 || data.newPasswordConfirm.length > 15) {
      throw new BadRequestException('Sua senha deve ter até 15 caracteres');
    }
    if (data.newPassword.length < 8 || data.newPasswordConfirm.length < 8) {
      throw new BadRequestException(
        'Sua senha deve ter no mínimo 8 caracteres',
      );
    }

    try {
      if (data.newPassword === data.newPasswordConfirm) {
        const newPasswordCrypt = await this.encrypter.encrypt(data.newPassword);
        const userUpdated = await this.updateUserRepository.execute({
          ...user,
          password: newPasswordCrypt,
        });

        this.mailerAdapter.send(
          new PassUpdatedSuccessfullyMail({
            to: data.email,
            subject: 'Confirmção de atualização de Senha ',
            data: {
              confirmationUrl: userUpdated.password,
            },
          }),
        );
        return userUpdated;
      }
    } catch (e) {
      throw new BadRequestException(
        'Senha de confirmação não confere, tente novamente',
      );
    }
  }
}

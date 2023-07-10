import { HttpExceptionEnum } from '@domain/_protocols/errors/http.enum';
import { HttpError } from '@domain/_protocols/errors/http.error';
import { IEncrypter } from '@domain/adapters/encrypter/encrypter.adapter';
import { IGenerateRandom } from '@domain/adapters/generateRandom-adapter.ts/generateRandom';
import { IMailerAdapter } from '@domain/adapters/mailer-adapter/mailter.adapter';
import { IPasswordRecoveryDTO } from '@domain/user/dtos/password-recovery.dto';
import { IFindByEmailUserRepository } from '@domain/user/repositories/find-by-email-user.repository';
import { IUpdateUserRepository } from '@domain/user/repositories/update-user.repository';
import { IPasswordRecoveryUseCase } from '@domain/user/use-cases/password-recovery.usecase';
import { PasswordRecoveryMail } from '@infra/adapters/mailer-adapter/mail';

export class PasswordRecoveryUseCase implements IPasswordRecoveryUseCase {
  constructor(
    private readonly findByEmailUserRepo: IFindByEmailUserRepository,
    private readonly updateUserRepository: IUpdateUserRepository,
    private readonly mailerAdapter: IMailerAdapter,
    private readonly generateRandom: IGenerateRandom,
    private readonly encrypter: IEncrypter,
  ) {}

  async execute(data: IPasswordRecoveryDTO): Promise<any> {
    const temporaryPassword = this.generateRandom.generateRandom(15);
    const user = await this.findByEmailUserRepo.execute(data.emailOrDocument);
    if (!user) {
      throw new HttpError({
        code: HttpExceptionEnum.NOT_FOUND,
        message: 'Usuário não encontrado',
      });
    }

    const temporaryPasswordCrypt = await this.encrypter.encrypt(
      temporaryPassword,
    );

    await this.updateUserRepository.execute({
      ...user,
      password: temporaryPasswordCrypt,
      update_temporary_pass: new Date(),
    });

    this.mailerAdapter.send(
      new PasswordRecoveryMail({
        to: user.email,
        subject: 'Solicitação de Troca de Senha',
        data: {
          confirmationUrl: temporaryPassword,
        },
      }),
    );

    return {
      success: true,
      message:
        'E-mail de recuperação de senha enviado para o e-mail ' +
        this.hideEmail(user.email),
      data: [],
    };
  }

  hideEmail(email) {
    return email.replace(/(.{2})(.*)(?=@)/, function (gp1, gp2, gp3) {
      for (let i = 0; i < gp3.length; i++) {
        gp2 += '*';
      }
      return gp2;
    });
  }
}

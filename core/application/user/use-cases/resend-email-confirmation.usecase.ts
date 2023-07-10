import { IMailerAdapter } from '@domain/adapters/mailer-adapter/mailter.adapter';
import { ITokenGeneratorAdapter } from '@domain/adapters/token-generator/token-generator.adapter';
import { IResendEmailConfirmationDTO } from '@domain/user/dtos/resend-email-confirmation.dto';
import { UserStatusEnum } from '@domain/user/entities/user.entity';
import { IFindByEmailUserRepository } from '@domain/user/repositories/find-by-email-user.repository';
import { IUpdateUserRepository } from '@domain/user/repositories/update-user.repository';
import { IResendEmailConfirmationUseCase } from '@domain/user/use-cases/resend-email-confirmation.usecase';
import { HttpExceptionEnum } from '@domain/_protocols/errors/http.enum';
import { HttpError } from '@domain/_protocols/errors/http.error';
import { ConfirmationMail } from '@infra/adapters/mailer-adapter/mail';

export class ResendEmailConfirmationUseCase
  implements IResendEmailConfirmationUseCase
{
  constructor(
    private readonly findByEmailUserRepository: IFindByEmailUserRepository,
    private readonly updateUserRepo: IUpdateUserRepository,
    private readonly mailerAdapter: IMailerAdapter,
    private readonly tokenGeneratorAdapter: ITokenGeneratorAdapter,
  ) {}

  async execute(data: IResendEmailConfirmationDTO): Promise<boolean> {
    const user = await this.findByEmailUserRepository.execute(data.email);

    if (!user) {
      return false;
    }

    if (user.status === UserStatusEnum.ACTIVE) {
      throw new HttpError({
        code: HttpExceptionEnum.BAD_REQUEST,
        message: 'Usurário já está ativo',
      });
    }

    const code = this.tokenGeneratorAdapter.generate();

    const updatedUser = await this.updateUserRepo.execute({
      ...user,
      code,
      codeExpirationDate: new Date(),
    });

    await this.mailerAdapter.send(
      new ConfirmationMail({
        to: updatedUser.email,
        subject: 'Confirmação de e-mail -',
        data: {
          confirmationUrl:
            process.env.URL_MAIL + '/email-confirmation/' + updatedUser.code,
        },
      }),
    );

    return true;
  }
}

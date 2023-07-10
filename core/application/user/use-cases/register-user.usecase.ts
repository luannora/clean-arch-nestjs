import { ICpfValidator } from '@domain/adapters/cpf-validator/cpf-validator.adapter';
import { IEncrypter } from '@domain/adapters/encrypter/encrypter.adapter';
import { IMailerAdapter } from '@domain/adapters/mailer-adapter/mailter.adapter';
import { ITokenGeneratorAdapter } from '@domain/adapters/token-generator/token-generator.adapter';
import { IRegisterUserDTO } from '@domain/user/dtos/register-user.dto';
import {
  IUser,
  UserRoleEnum,
  UserStatusEnum,
} from '@domain/user/entities/user.entity';
import { IFindByEmailUserRepository } from '@domain/user/repositories/find-by-email-user.repository';
import { IUpdateUserRepository } from '@domain/user/repositories/update-user.repository';
import { IRegisterUserUseCase } from '@domain/user/use-cases/register-user.usecase';
import { HttpExceptionEnum } from '@domain/_protocols/errors/http.enum';
import { HttpError } from '@domain/_protocols/errors/http.error';
import { ConfirmationMail } from '@infra/adapters/mailer-adapter/mail';
import { IInsertUserRepository } from '@domain/user/repositories/insert-user.repository';
import { IFindByEmailOrDocumentUserRepository } from '@domain/user/repositories/find-by-email-or-document-user.repository';
import { IEventEmitterAdapter } from '@domain/adapters/event-emitter-adapter/event-emitter.adapter';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    private readonly findByEmailOrDocumentUserRepo: IFindByEmailOrDocumentUserRepository,
    private readonly insertUserRepo: IInsertUserRepository,
    private readonly cpfValidator: ICpfValidator,
    private readonly encrypter: IEncrypter,
    private readonly mailerAdapter: IMailerAdapter,
    private readonly tokenGeneratorAdapter: ITokenGeneratorAdapter,
    private readonly eventEmitterAdapter: IEventEmitterAdapter,
  ) { }

  async execute(userDTO: IRegisterUserDTO): Promise<IUser> {
    if (!this.cpfValidator.isValid(userDTO.document, userDTO.documentType)) {
      throw new HttpError({
        code: HttpExceptionEnum.BAD_REQUEST,
        message: 'CPF/CNPJ Inválido',
      });
    }

    const userEmailExists = await this.findByEmailOrDocumentUserRepo.execute(
      userDTO.email,
    );

    if (userEmailExists) {
      throw new HttpError({
        code: HttpExceptionEnum.CONFLICT,
        message:
          'Cadastro já existe, por favor entre com seu login e senha para se logar no App',
      });
    }

    const userDocumentExists = await this.findByEmailOrDocumentUserRepo.execute(
      userDTO.document,
    );

    if (userDocumentExists) {
      throw new HttpError({
        code: HttpExceptionEnum.CONFLICT,
        message:
          'Cadastro já existe, por favor entre com seu login e senha para se logar no App',
      });
    }

    const code = this.tokenGeneratorAdapter.generate();

    const insertedUser = await this.insertUserRepo.execute({
      email: userDTO.email,
      role: UserRoleEnum.USER,
      name: userDTO.name,
      fantasyName: userDTO.fantasyName,
      bornDate: userDTO.bornDate,
      celphone: userDTO.celphone,
      telephone: userDTO.telephone,
      temporaryPassword: null,
      update_temporary_pass: null,
      document: userDTO.document,
      documentType: userDTO.documentType,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: UserStatusEnum.INACTIVE,
      password: await this.encrypter.encrypt(userDTO.password),
      code,
      codeExpirationDate: new Date(),
      address: userDTO.address,
      plan: { planType: userDTO.planType, loadType: userDTO.loadType },
    });

    await this.mailerAdapter.send(
      new ConfirmationMail({
        to: insertedUser.email,
        subject: 'Confirmação de e-mail -',
        data: {
          confirmationUrl:
            process.env.URL_MAIL + '/email-confirmation/' + insertedUser.code,
        },
      }),
    );

    await this.eventEmitterAdapter.emit('user.created', {
      userId: insertedUser.id,
    });

    return insertedUser;
  }
}

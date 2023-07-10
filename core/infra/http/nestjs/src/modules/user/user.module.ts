import { Repository } from 'typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { IUser } from '@domain/user/entities/user.entity';
import { RepositoryProxyModule } from '../../proxy/repository.proxy.module';
import { FindByEmailUserRepository } from '@typeorm/modules/user/find-by-email-user.repository';
import { UpdateUserRepository } from '@infra/db/typeorm/modules/user/update-user.repository';
import { CpfValidator } from '@infra/adapters/cpf-validator/cpf-validator.adapter';
import { BcryptAdapter } from '@infra/adapters/encrypter/bcrypt.adapter';
import { RegisterUserController } from './controller/register-user.controller';
import { TokenGeneratorAdapter } from '@infra/adapters/token-generator/token-generator.adapter';
import { MailerAdapter } from '@infra/adapters/mailer-adapter/mailer.adapter';
import { MailerService } from '@nestjs-modules/mailer';
import { MailerAppModule } from '../mailer/mailer.module';
import { FindByCodeUserRepository } from '@infra/db/typeorm/modules/user/find-by-code-user.repository';
import { EmailConfirmationUserController } from './controller/email-confirmation.controller';
import { ResendEmailConfirmationController } from './controller/resend-mail-confirmation.controller';
import { LoginUserController } from './controller/login.controller';
import { AuthModule } from '../auth/auth.module';
import { PasswordRecoveryController } from './controller/password-recovery.controller';
import { GenerateRandomAdapter } from '@infra/adapters/generateRandom-adapter/generateRandom';
import { DatabaseModule } from '@infra/db/typeorm/datasource/database.module';
import { InsertUserRepository } from '@infra/db/typeorm/modules/user/insert-user.repository';
import { RedefinePasswordUseCase } from '@rootDir/core/application/user/use-cases/redefine-password.usecase';
import { PasswordRecoveryUseCase } from '@rootDir/core/application/user/use-cases/password-recovery.usecase';
import { RegisterUserUseCase } from '@rootDir/core/application/user/use-cases/register-user.usecase';
import { ConfirmationMailUseCase } from '@rootDir/core/application/user/use-cases/confirmation-mail.usecase';
import { LoginUserUseCase } from '@rootDir/core/application/user/use-cases/login-user.usecase';
import { ResendEmailConfirmationUseCase } from '@rootDir/core/application/user/use-cases/resend-email-confirmation.usecase';
import { RegisterUserService } from './services/register-user.service';
import { EmailConfirmationService } from './services/email-confirmation.service';
import { ResendEmailConfirmationService } from './services/resend-email-confirmation.service';
import { PasswordRecoveryService } from './services/password-recovery.service';
import { RedefinePasswordController } from './controller/redefine-password.controller';
import { ProfileController } from './controller/profile.controller';
import { FindByEmailOrDocumentUserRepository } from '@infra/db/typeorm/modules/user/find-by-email-or-document-user.repository';
import { EventEmitterAdapter } from '@infra/adapters/event-emitter-adapter/event-emitter.adapter';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    DatabaseModule,
    RepositoryProxyModule.register(),
    MailerAppModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [
    RegisterUserController,
    EmailConfirmationUserController,
    ResendEmailConfirmationController,
    LoginUserController,
    PasswordRecoveryController,
    RedefinePasswordController,
    ProfileController,
  ],
  providers: [
    /**
     * Repositories
     */
    {
      provide: InsertUserRepository,
      useFactory: (userRepo: Repository<IUser>) =>
        new InsertUserRepository(userRepo),
      inject: [RepositoryProxyModule.USER_REPOSITORY],
    },
    {
      provide: FindByEmailUserRepository,
      useFactory: (userRepo: Repository<IUser>) =>
        new FindByEmailUserRepository(userRepo),
      inject: [RepositoryProxyModule.USER_REPOSITORY],
    },
    {
      provide: FindByEmailOrDocumentUserRepository,
      useFactory: (userRepo: Repository<IUser>) =>
        new FindByEmailOrDocumentUserRepository(userRepo),
      inject: [RepositoryProxyModule.USER_REPOSITORY],
    },
    {
      provide: UpdateUserRepository,
      useFactory: (userRepo: Repository<IUser>) =>
        new UpdateUserRepository(userRepo),
      inject: [RepositoryProxyModule.USER_REPOSITORY],
    },
    {
      provide: FindByCodeUserRepository,
      useFactory: (userRepo: Repository<IUser>) =>
        new FindByCodeUserRepository(userRepo),
      inject: [RepositoryProxyModule.USER_REPOSITORY],
    },

    /**
     * UseCases
     */
    {
      provide: RedefinePasswordUseCase,
      useFactory: (
        findByEmailUserRepo: FindByEmailUserRepository,
        updateUserRepository: UpdateUserRepository,
        mailerAdapter: MailerAdapter,
        bcryptAdapter: BcryptAdapter,
      ) =>
        new RedefinePasswordUseCase(
          findByEmailUserRepo,
          updateUserRepository,
          mailerAdapter,
          bcryptAdapter,
        ),
      inject: [
        FindByEmailUserRepository,
        UpdateUserRepository,
        MailerAdapter,
        BcryptAdapter,
      ],
    },
    {
      provide: PasswordRecoveryUseCase,
      useFactory: (
        findByEmailOrDocumentUserRepo: FindByEmailOrDocumentUserRepository,
        updateUserRepository: UpdateUserRepository,
        mailerAdapter: MailerAdapter,
        generateRandom: GenerateRandomAdapter,
        bcryptAdapter: BcryptAdapter,
      ) =>
        new PasswordRecoveryUseCase(
          findByEmailOrDocumentUserRepo,
          updateUserRepository,
          mailerAdapter,
          generateRandom,
          bcryptAdapter,
        ),
      inject: [
        FindByEmailOrDocumentUserRepository,
        UpdateUserRepository,
        MailerAdapter,
        GenerateRandomAdapter,
        BcryptAdapter,
      ],
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (
        insertUserRepository: InsertUserRepository,
        findByEmailOrDocumentUserRepo: FindByEmailOrDocumentUserRepository,
        cpfValidator: CpfValidator,
        bcryptAdapter: BcryptAdapter,
        tokenGeneratorAdapter: TokenGeneratorAdapter,
        mailer: MailerAdapter,
        eventEmitterAdapter: EventEmitterAdapter,
      ) =>
        new RegisterUserUseCase(
          findByEmailOrDocumentUserRepo,
          insertUserRepository,
          cpfValidator,
          bcryptAdapter,
          mailer,
          tokenGeneratorAdapter,
          eventEmitterAdapter,
        ),
      inject: [
        InsertUserRepository,
        FindByEmailOrDocumentUserRepository,
        CpfValidator,
        BcryptAdapter,
        TokenGeneratorAdapter,
        MailerAdapter,
        EventEmitterAdapter,
      ],
    },
    {
      provide: ConfirmationMailUseCase,
      useFactory: (
        findByCodeRepo: FindByCodeUserRepository,
        updateUserRepo: UpdateUserRepository,
      ) => new ConfirmationMailUseCase(findByCodeRepo, updateUserRepo),
      inject: [FindByCodeUserRepository, UpdateUserRepository],
    },
    {
      provide: LoginUserUseCase,
      useFactory: (
        findByEmailRepo: FindByEmailUserRepository,
        bcryptAdapter: BcryptAdapter,
      ) => new LoginUserUseCase(findByEmailRepo, bcryptAdapter),
      inject: [FindByEmailUserRepository, BcryptAdapter],
    },
    {
      provide: ResendEmailConfirmationUseCase,
      useFactory: (
        findByEmailRepo: FindByEmailUserRepository,
        updateUserRepo: UpdateUserRepository,
        mailerAdapter: MailerAdapter,
        tokenGeneratorAdapter: TokenGeneratorAdapter,
      ) =>
        new ResendEmailConfirmationUseCase(
          findByEmailRepo,
          updateUserRepo,
          mailerAdapter,
          tokenGeneratorAdapter,
        ),
      inject: [
        FindByEmailUserRepository,
        UpdateUserRepository,
        MailerAdapter,
        TokenGeneratorAdapter,
      ],
    },

    /**
     * Handlers
     */
    {
      provide: PasswordRecoveryService,
      useFactory: (passwordRecoveryUC: PasswordRecoveryUseCase) =>
        new PasswordRecoveryService(passwordRecoveryUC),
      inject: [PasswordRecoveryUseCase],
    },
    // {
    //   provide: RedefinePasswordHandler,
    //   useFactory: (redefinePasswordUC: RedefinePasswordUseCase) =>
    //     new RedefinePasswordHandler(redefinePasswordUC),
    //   inject: [RedefinePasswordUseCase],
    // },

    {
      provide: RegisterUserService,
      useFactory: (registerUserUC: RegisterUserUseCase) =>
        new RegisterUserService(registerUserUC),
      inject: [RegisterUserUseCase],
    },
    {
      provide: EmailConfirmationService,
      useFactory: (confirmationMailUC: ConfirmationMailUseCase) =>
        new EmailConfirmationService(confirmationMailUC),
      inject: [ConfirmationMailUseCase],
    },
    {
      provide: ResendEmailConfirmationService,
      useFactory: (resendEmailConfirmationUC: ResendEmailConfirmationUseCase) =>
        new ResendEmailConfirmationService(resendEmailConfirmationUC),
      inject: [ResendEmailConfirmationUseCase],
    },

    /**
     * Adapters
     */
    {
      provide: CpfValidator,
      useFactory: () => new CpfValidator(),
    },
    {
      provide: BcryptAdapter,
      useFactory: () => new BcryptAdapter(),
    },
    {
      provide: TokenGeneratorAdapter,
      useFactory: () => new TokenGeneratorAdapter(),
    },
    {
      provide: MailerAdapter,
      useFactory: (mailer: MailerService) => new MailerAdapter(mailer),
      inject: [MailerService],
    },
    {
      provide: GenerateRandomAdapter,
      useFactory: () => new GenerateRandomAdapter(),
      inject: [],
    },
    {
      provide: EventEmitterAdapter,
      useFactory: (eventEmitter: EventEmitter2) =>
        new EventEmitterAdapter(eventEmitter),
      inject: [EventEmitter2],
    },
  ],
  exports: [LoginUserUseCase, FindByEmailUserRepository],
})
export class UserModule {}

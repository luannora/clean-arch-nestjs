import { Mail } from '@domain/adapters/mailer-adapter/mail';
import { MailerTemplateEnum } from '@domain/adapters/mailer-adapter/template.enum';

export type ConfirmationMailDataType = {
  confirmationUrl: string;
};
export type PasswordRecoveryDataType = {
  confirmationUrl: string;
};
export type PassUpdatedSuccessfullyDataType = {
  confirmationUrl: string;
};

export class ConfirmationMail extends Mail<ConfirmationMailDataType> {
  getTemplate(): MailerTemplateEnum {
    return MailerTemplateEnum.CONFIRMATION;
  }
}
export class PasswordRecoveryMail extends Mail<PasswordRecoveryDataType> {
  getTemplate(): MailerTemplateEnum {
    return MailerTemplateEnum.PASSWORD_RECOVERY;
  }
}
export class PassUpdatedSuccessfullyMail extends Mail<PassUpdatedSuccessfullyDataType> {
  getTemplate(): MailerTemplateEnum {
    return MailerTemplateEnum.PASSUPDATEDSUCESSFULLY;
  }
}

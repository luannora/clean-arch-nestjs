import {
  ConfirmationMail,
  ConfirmationMailDataType,
} from '@infra/adapters/mailer-adapter/mail';
import { Mail } from './mail';

type MailDataType<T> = T extends ConfirmationMail
  ? ConfirmationMailDataType
  : T;

export interface IMailerAdapter {
  send<T extends Mail<MailDataType<T>>>(mail: T): Promise<boolean>;
}

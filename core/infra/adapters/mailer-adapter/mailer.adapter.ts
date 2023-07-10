import { Mail } from '@domain/adapters/mailer-adapter/mail';
import { IMailerAdapter } from '@domain/adapters/mailer-adapter/mailter.adapter';
import { MailerService } from '@nestjs-modules/mailer';

export class MailerAdapter implements IMailerAdapter {
  constructor(private readonly mailer: MailerService) {}

  async send<A, T extends Mail<A>>(mail: T): Promise<boolean> {
    try {
      this.mailer.sendMail({
        to: mail.to,
        subject: mail.subject,
        template: mail.getTemplate(),
        context: mail.data,
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

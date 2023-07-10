import { MailerTemplateEnum } from './template.enum';

export abstract class Mail<T> {
  constructor({ to, subject, data }: { to: string; subject: string; data: T }) {
    this.to = to;
    this.subject = subject;
    this.data = data;
  }

  protected template: MailerTemplateEnum;
  public to: string;
  public subject: string;
  public data: T;

  abstract getTemplate(): MailerTemplateEnum;
}

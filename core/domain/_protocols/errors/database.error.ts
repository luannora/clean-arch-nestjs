import { DatabaseEnum } from './database.enum';

export class DatabaseError extends Error {
  code: DatabaseEnum;
  message: string;
  name: string;
  stack?: string;

  constructor({ code, message }: { code: DatabaseEnum; message?: string }) {
    super(message);
    this.code = code;
    this.message = message ?? '';
    this.name = 'DatabaseError';
  }
}

import { HttpExceptionEnum } from './http.enum';

export class HttpError implements Error {
  code: HttpExceptionEnum;
  error: any;
  message: string;
  name: string;
  stack?: string;

  constructor({
    code,
    message,
    error,
  }: {
    code: HttpExceptionEnum;
    message?: string;
    error?: any;
  }) {
    this.code = code;
    this.message = message ?? '';
    this.name = HttpError.name;
    this.error = error;
  }
}

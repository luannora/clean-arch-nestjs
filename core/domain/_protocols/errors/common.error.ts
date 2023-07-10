export class CommonError implements Error {
  message: string;
  error: any;
  name: string;

  constructor({ message, error }: { message?: string; error?: any }) {
    this.error = error ?? null;
    this.message = message ?? '';
    this.name = CommonError.name;
  }
}

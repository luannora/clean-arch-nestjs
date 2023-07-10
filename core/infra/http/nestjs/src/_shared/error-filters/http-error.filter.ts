import { HttpError } from '@domain/_protocols/errors/http.error';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';

@Catch()
export class AllHttpErrorsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapter: AbstractHttpAdapter<any, any, any>,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    let httpStatus: any = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
    } else if (exception instanceof HttpError) {
      httpStatus = exception.code;
    }

    if (exception instanceof HttpException) {
      const { message } = exception.getResponse() as { message: string };

      return ctx
        .getResponse()
        .status(httpStatus)
        .json({
          success: false,
          timestamp: new Date().toISOString(),
          path: this.httpAdapter.getRequestUrl(ctx.getRequest()),
          message,
          data: {},
        });
    }

    const responseBody = {
      success: false,
      timestamp: new Date().toISOString(),
      path: this.httpAdapter.getRequestUrl(ctx.getRequest()),
      message: (exception as HttpError).message,
      data: (exception as HttpError).error,
    };

    this.httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

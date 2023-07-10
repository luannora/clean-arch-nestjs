import { ILogger } from '@domain/_protocols/logger.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger implements ILogger {
  constructor(context: string) {
    super(context);
  }

  debug(message: string) {
    if (process.env.IS_PRODUCTION === 'true') {
      super.debug(`[DEBUG] ${message}`, this.context);
    }
  }

  log(message: string) {
    if (this.context) super.log(`[INFO] ${message}`, this.context);
    else super.log(`[INFO] ${message}`);
  }

  error(message: string, trace?: string) {
    super.error(`[ERROR] ${message}`, trace, this.context);
  }

  warn(message: string) {
    super.warn(`[WARN] ${message}`, this.context);
  }

  verbose(message: string) {
    if (process.env.NODE_ENV !== 'production') {
      super.verbose(`[VERBOSE] ${message}`, this.context);
    }
  }
}

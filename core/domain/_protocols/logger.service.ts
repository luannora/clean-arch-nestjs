export interface ILogger {
  debug(context: string, message: string): void;
  log(context: string, message: string): void;
  error(message: string, context?: string, trace?: string): void;
  warn(context: string, message: string): void;
  verbose(context: string, message: string): void;
}

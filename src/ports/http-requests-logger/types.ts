export enum Verbosity {
  INFO = 'info',
  DEBUG = 'debug',
  ERROR = 'error',
  WARN = 'warn',
}

export type RequestLoggerConfigurations = { verbosity: Verbosity }

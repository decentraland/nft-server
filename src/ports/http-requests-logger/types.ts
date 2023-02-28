import { IHttpServerComponent } from '@well-known-components/interfaces'

export enum Verbosity {
  INFO = 'info',
  DEBUG = 'debug',
  ERROR = 'error',
  WARN = 'warn',
}

export type RequestLoggerConfigurations = {
  verbosity?: Verbosity
  inputLog?: (
    req: IHttpServerComponent.DefaultContext<object>['request']
  ) => string
  outputLog?: (
    req: IHttpServerComponent.DefaultContext<object>['request'],
    res: IHttpServerComponent.IResponse
  ) => string
}

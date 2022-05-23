import {
  IHttpServerComponent,
  ILoggerComponent,
} from '@well-known-components/interfaces'
import { AppComponents, Context } from '../types'

enum Result {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  UNHANDLED_FAILURE = 'UNHANDLED_FAILURE',
  UNKNOWN = 'UNKNOWN',
}

export function createRequestLoggerMiddleware(
  components: Pick<AppComponents, 'globalLogger'>
): IHttpServerComponent.IRequestHandler<Context<string>> {
  const { globalLogger: logger } = components

  return async (context, next) => {
    const start = Date.now()

    const log = (
      result: Result,
      options: { status?: number; message?: string } = {}
    ) => {
      const { searchParams, pathname } = context.url
      const { method } = context.request
      const { status, message } = options

      const data: Parameters<ILoggerComponent.ILogger['info']>[1] = {
        path: pathname,
        method,
        result,
        time: Date.now() - start,
      }

      if (searchParams) {
        data.query = searchParams.toString()
      }

      if (status) {
        data.status = status
      }

      if (message) {
        data.message = message
      }

      logger.info(`HTTP Request`, data)
    }

    try {
      const result = await next()

      const status = result.status

      log(
        status
          ? status < 400
            ? Result.SUCCESS
            : Result.FAILURE
          : Result.UNKNOWN,
        {
          status,
          message:
            status && status >= 500 && result.body
              ? JSON.stringify(result.body)
              : undefined,
        }
      )

      return result
    } catch (error: any) {
      log(Result.UNHANDLED_FAILURE, { message: error.message })

      return {
        status: 500,
        body: error.message,
      }
    }
  }
}

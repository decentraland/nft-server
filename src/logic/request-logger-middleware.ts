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

    try {
      const result = await next()
      const status = result.status
      const finish = Date.now()

      log(logger, context, {
        status,
        result: status
          ? status < 400
            ? Result.SUCCESS
            : Result.FAILURE
          : Result.UNKNOWN,
        time: finish - start,
        message:
          status && status >= 500 && result.body
            ? JSON.stringify(result.body)
            : undefined,
      })

      return result
    } catch (error: any) {
      const finish = Date.now()

      log(logger, context, {
        result: Result.UNHANDLED_FAILURE,
        time: finish - start,
        message: error.message,
      })

      return {
        status: 500,
        body: error.message,
      }
    }
  }
}

function log(
  logger: ILoggerComponent.ILogger,
  context: IHttpServerComponent.DefaultContext<Context<string>>,
  {
    result,
    status,
    time,
    message,
  }: { result: Result; status?: number; time: number; message?: string }
) {
  const { searchParams, pathname } = context.url
  const { method } = context.request

  const data: Parameters<ILoggerComponent.ILogger['info']>[1] = {
    method,
    result,
    time,
  }

  if (searchParams) {
    data.searchParams = searchParams.toString()
  }

  if (status) {
    data.status = status
  }

  if (message) {
    data.message = message
  }

  logger.info(pathname, data)
}

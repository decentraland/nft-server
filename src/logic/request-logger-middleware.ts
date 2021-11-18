import {
  IHttpServerComponent,
  ILoggerComponent,
} from '@well-known-components/interfaces'
import { AppComponents, Context } from '../types'

enum RequestState {
  REQUEST = 'REQUEST',
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
    const url = context.url.toString()
    const start = Date.now()
    const id = start

    logger.info(
      url,
      buildLogData({
        id,
        state: RequestState.REQUEST,
      })
    )

    try {
      const result = await next()
      const status = result.status
      const finish = Date.now()

      logger.info(
        url,
        buildLogData({
          id,
          state: status
            ? status < 400
              ? RequestState.SUCCESS
              : RequestState.FAILURE
            : RequestState.UNKNOWN,
          code: status,
          time: finish - start,
          message:
            status && status >= 500 && result.body
              ? JSON.stringify(result.body)
              : undefined,
        })
      )

      return result
    } catch (error: any) {
      const finish = Date.now()

      logger.info(
        url,
        buildLogData({
          id,
          state: RequestState.UNHANDLED_FAILURE,
          time: finish - start,
          message: error.message,
        })
      )
      return {
        status: 500,
        body: error.message,
      }
    }
  }
}

function buildLogData({
  id,
  state,
  code,
  time,
  message,
}: {
  id: number
  state: RequestState
  code?: number
  time?: number
  message?: string
}) {
  const data: Parameters<ILoggerComponent.ILogger['info']>[1] = {
    id,
    state,
  }

  if (code) {
    data.code = code
  }

  if (time) {
    data.time = time
  }

  if (message) {
    data.message = message
  }

  return data
}

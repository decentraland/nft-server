import {
  IHttpServerComponent,
  ILoggerComponent,
} from '@well-known-components/interfaces'
import { RequestLoggerConfigurations, Verbosity } from './types'

export function createHttRequestsLogger(
  components: {
    server: IHttpServerComponent<object>
    logger: ILoggerComponent
  },
  config?: RequestLoggerConfigurations
): void {
  const { server, logger } = components
  const verbosity = config?.verbosity ?? Verbosity.INFO
  const inLogger = logger.getLogger('http-in')
  const outLogger = logger.getLogger('http-out')
  server.use((ctx: IHttpServerComponent.DefaultContext<object>, next) => {
    inLogger[verbosity](`[${ctx.request.method}: ${ctx.request.url}]`)
    return next().then((response) => {
      outLogger[verbosity](
        `[${ctx.request.method}: ${ctx.request.url}][${response.status}]`
      )
      return response
    })
  })
}

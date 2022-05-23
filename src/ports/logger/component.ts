import { ILoggerComponent } from '@well-known-components/interfaces'
import { createLogComponent as createBaseLogComponent } from '@well-known-components/logger'
import { AppComponents } from '../../types'

export function createLogComponent(
  components: Pick<AppComponents, 'requestSession'>
): ILoggerComponent {
  const { requestSession } = components
  const baseLogs = createBaseLogComponent()

  return {
    getLogger(name: string) {
      const logger = baseLogs.getLogger(name)
      const logLevels = ['log', 'error', 'debug', 'info', 'warn']

      const mockLogLevel = (level: keyof ILoggerComponent.ILogger) => {
        const base = logger[level]

        // Extends the base logger to add the request session id to logs
        logger[level] = (
          message: string,
          extra?: Record<string, string | number>
        ) => {
          if (extra !== undefined && typeof extra.id === 'undefined') {
            extra.id = requestSession.getId()
          }
          base(message, extra)
        }
      }

      for (const level of logLevels) {
        mockLogLevel(level as keyof ILoggerComponent.ILogger)
      }

      return logger
    },
  }
}

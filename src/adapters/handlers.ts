import { IHttpServerComponent } from '@well-known-components/interfaces'
import { AppComponents, Context } from '../types'

export function createHelloWolrdHandler(
  components: Pick<AppComponents, 'logs'>
): IHttpServerComponent.IRequestHandler<Context<'/hello-world'>> {
  const { logs } = components
  const logger = logs.getLogger('nft-server')

  return async (_context) => {
    logger.info(`Hello wolrd`)
    return {
      status: 200,
      body: 'hello world',
    }
  }
}

import { IHttpServerComponent } from '@well-known-components/interfaces'
import { Context } from '../../types'

export type ISessionComponent = {
  createMiddleware: () => IHttpServerComponent.IRequestHandler<Context<string>>
  getRequestId: () => string
  setRequestId: (requestId: string) => void
}

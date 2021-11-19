import { IHttpServerComponent } from '@well-known-components/interfaces'
import { Context } from '../../types'

export type IRequestSessionComponent = {
  createMiddleware: () => IHttpServerComponent.IRequestHandler<Context<string>>
  getId: () => string
  setId: (requestId: string) => void
}

import { createNamespace, getNamespace } from 'continuation-local-storage'
import cuid from 'cuid'
import { IRequestSessionComponent } from './types'

export function createRequestSessionComponent(): IRequestSessionComponent {
  const NAMESPACE = 'requestSession'

  createNamespace(NAMESPACE)

  const getSession = () => getNamespace(NAMESPACE)

  const getId = () =>
    (getSession()?.get('id') as string | undefined) || 'UNKNOWN'

  const setId = (requestId: string) => getSession()?.set('id', requestId)

  const createMiddleware: IRequestSessionComponent['createMiddleware'] = () => async (
    _context,
    next
  ) => {
    const session = getSession()

    if (session) {
      const id = cuid()

      return session.runAndReturn(() => {
        setId(id)
        return next()
      })
    }

    return next()
  }

  return {
    getId,
    setId,
    createMiddleware,
  }
}

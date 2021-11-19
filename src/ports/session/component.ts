import { ISessionComponent } from './types'
import { createNamespace, getNamespace } from 'continuation-local-storage'

export function createSessionComponent(): ISessionComponent {
  createNamespace('session')

  const getSession = () => getNamespace('session')

  const getRequestId = () =>
    (getSession()?.get('requestId') as string | undefined) || 'UNKNOWN'

  const setRequestId = (requestId: string) =>
    getSession()?.set('requestId', requestId)

  const createMiddleware: ISessionComponent['createMiddleware'] = () => async (
    _context,
    next
  ) => {
    const session = getSession()

    if (session) {
      const requestId = Date.now().toString()

      return session.runAndReturn(() => {
        setRequestId(requestId)
        return next()
      })
    }

    return next()
  }

  return {
    getRequestId,
    setRequestId,
    createMiddleware,
  }
}

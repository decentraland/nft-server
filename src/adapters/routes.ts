import { Router } from '@well-known-components/http-server'
import { GlobalContext } from '../types'
import { createBidsHandler } from './handlers/bids'
import { createOrdersHandler } from './handlers/orders'
import { createContractsHandler } from './handlers/contracts'
import { createNFTHandler, createNFTsHandler } from './handlers/nfts'
import { createItemsHandler } from './handlers/items'
import { createMintsHandler } from './handlers/mints'
import { createSalesHandler } from './handlers/sales'
import { createCollectionsHandler } from './handlers/collections'
import { createRequestLoggerMiddleware } from '../logic/requestLoggerMiddleware'
import { createAccountsHandler } from './handlers/accounts'
import { createCollectionsVolumeHandler } from './handlers/volume'

export async function setupRoutes(globalContext: GlobalContext) {
  const { components } = globalContext
  const { config, server, requestSession } = components

  const router = new Router<GlobalContext>()

  const apiVersion = await config.requireString('API_VERSION')

  router.prefix(`/${apiVersion}`)

  router.use(requestSession.createMiddleware())
  router.use(createRequestLoggerMiddleware(components))

  router.get('/bids', createBidsHandler(components))
  router.get('/orders', createOrdersHandler(components))
  router.get('/nfts', createNFTsHandler(components))
  router.get('/items', createItemsHandler(components))
  router.get('/contracts', createContractsHandler(components))
  router.get('/mints', createMintsHandler(components))
  router.get('/sales', createSalesHandler(components))
  router.get('/collections', createCollectionsHandler(components))
  router.get('/accounts', createAccountsHandler(components))
  router.get('/volumes', createCollectionsVolumeHandler(components))
  router.get(
    '/contracts/:contractAddress/tokens/:tokenId',
    createNFTHandler(components)
  )

  server.use(router.middleware())
}

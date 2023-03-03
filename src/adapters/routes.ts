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
import { createAnalyticsDataHandler } from './handlers/analyticsData'
import { createRankingsHandler } from './handlers/rankings'
import { createTrendingHandler } from './handlers/trending'
import { createVolumeHandler } from './handlers/volume'
import { createPricesHandler } from './handlers/prices'
import { createStatsHandler } from './handlers/stats'
import { createOwnersHandler } from './handlers/owners'

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
  router.get('/analytics/:timeframe', createAnalyticsDataHandler(components))
  router.get('/volume/:timeframe', createVolumeHandler(components))
  router.get('/rankings/:entity/:timeframe', createRankingsHandler(components))
  router.get('/trendings', createTrendingHandler(components))
  router.get('/prices', createPricesHandler(components))
  router.get('/stats/:category/:stat', createStatsHandler(components))
  router.get(
    '/contracts/:contractAddress/tokens/:tokenId',
    createNFTHandler(components)
  )
  router.get('/owners', createOwnersHandler(components))


  server.use(router.middleware())
}

import { Router } from '@well-known-components/http-server'
import { GlobalContext } from '../types'
import { createBidsHandler } from './handlers/bids'
import { createOrdersHandler } from './handlers/orders'
import { createContractsHandler } from './handlers/contracts'
import { createNFTHandler, createNFTsHandler } from './handlers/nfts'

export async function setupRoutes(globalContext: GlobalContext) {
  const { components } = globalContext
  const { config, server } = components

  const router = new Router<GlobalContext>()

  const apiVersion = await config.requireString('API_VERSION')

  router.prefix(`/${apiVersion}`)

  router.get('/bids', createBidsHandler(components))
  router.get('/orders', createOrdersHandler(components))
  router.get('/nfts', createNFTsHandler(components))
  router.get('/contracts', createContractsHandler(components))
  router.get(
    '/contracts/:contractAddress/tokens/:tokenId',
    createNFTHandler(components)
  )

  server.use(router.middleware())
}

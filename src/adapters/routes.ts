import { Router } from '@well-known-components/http-server'
import { GlobalContext } from '../types'
import {
  createBrowseHandler,
  createContractsHandler,
  createNFTHandler,
} from './handlers/handlers'
import { createBidsHandler } from './handlers/bids'
import { createOrdersHandler } from './handlers/orders'

export async function setupRoutes(globalContext: GlobalContext) {
  const { components } = globalContext
  const { config, server } = components

  const router = new Router<GlobalContext>()

  const apiVersion = await config.requireString('API_VERSION')

  router.prefix(`/${apiVersion}`)

  router.get('/browse', createBrowseHandler(components))
  router.get('/contracts', createContractsHandler(components))
  router.get(
    '/contracts/:contractAddress/tokens/:tokenId',
    createNFTHandler(components)
  )
  router.get('/bids', createBidsHandler(components))
  router.get('/orders', createOrdersHandler(components))

  server.use(router.middleware())
}

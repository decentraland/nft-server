import { Router } from '@well-known-components/http-server'
import { GlobalContext } from '../types'
import {
  createBidsHandler,
  createBrowseHandler,
  createCollectionsHandler,
  createHistoryHandler,
  createNFTHandler,
} from './handlers'

export async function setupRoutes(globalContext: GlobalContext) {
  const { components } = globalContext
  const { config, server } = components

  const router = new Router<GlobalContext>()

  const apiVersion = await config.requireString('API_VERSION')

  router.prefix(`/${apiVersion}`)

  router.get('/browse', createBrowseHandler(components))
  router.get('/collections', createCollectionsHandler(components))
  router.get(
    '/contracts/:contractAddress/tokens/:tokenId',
    createNFTHandler(components)
  )
  router.get(
    '/contracts/:contractAddress/tokens/:tokenId/history',
    createHistoryHandler(components)
  )
  router.get('/bids', createBidsHandler(components))

  server.use(router.middleware())
}

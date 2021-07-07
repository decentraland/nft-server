import { config as configDotEnvFile } from 'dotenv'
import { Network } from '@dcl/schemas'
import { createConfigComponent } from '@well-known-components/env-config-provider'
import {
  createServerComponent,
  createStatusCheckComponent,
} from '@well-known-components/http-server'
import { createLogComponent } from '@well-known-components/logger'
import { Lifecycle } from '@well-known-components/interfaces'
import { createMetricsComponent } from '@well-known-components/metrics'
import { setupRoutes } from './adapters/routes'
import { AppComponents, AppConfig, GlobalContext } from './types'
import { createSubgraphComponent } from './ports/subgraph/component'
import { createBrowseComponent } from './ports/browse/component'
import { createBidsComponent } from './ports/bids/component'
import { createOrdersComponent } from './ports/orders/component'
import { getMarketplaceChainId } from './ports/browse/sources/marketplace'
import { getCollectionsChainId } from './ports/browse/sources/collections'
import { createOrdersSource } from './adapters/sources/orders'
import { createMergerComponent } from './ports/merger/component'
import { Order, OrderOptions, OrderSortBy } from './ports/orders/types'
import { SortDirection } from './ports/merger/types'
import { Bid, BidOptions, BidSortBy } from './ports/bids/types'
import { createBidsSource } from './adapters/sources/bids'

async function main(components: AppComponents) {
  const globalContext: GlobalContext = {
    components,
  }

  await setupRoutes(globalContext)
}

async function initComponents(): Promise<AppComponents> {
  configDotEnvFile()

  // default config
  const defaultValues: Partial<AppConfig> = {
    HTTP_SERVER_PORT: '5000',
    HTTP_SERVER_HOST: '0.0.0.0',
    API_VERSION: 'v1',
  }

  const config = createConfigComponent(process.env, defaultValues)

  const cors = {
    origin: await config.getString('CORS_ORIGIN'),
    method: await config.getString('CORS_METHOD'),
  }

  const logs = createLogComponent()
  const server = await createServerComponent<GlobalContext>(
    { config, logs },
    { cors, compression: {} }
  )

  const statusChecks = await createStatusCheckComponent({ server })

  const metrics = await createMetricsComponent(
    {},
    {
      server,
      config,
    }
  )

  // subgraphs
  const marketplaceSubgraph = createSubgraphComponent(
    await config.requireString('MARKETPLACE_SUBGRAPH_URL')
  )

  const collectionsSubgraph = createSubgraphComponent(
    await config.requireString('COLLECTIONS_SUBGRAPH_URL')
  )

  // orders
  const marketplaceOrders = createOrdersComponent({
    subgraph: marketplaceSubgraph,
    network: Network.ETHEREUM,
    chainId: getMarketplaceChainId(),
  })

  const collectionsOrders = createOrdersComponent({
    subgraph: collectionsSubgraph,
    network: Network.MATIC,
    chainId: getCollectionsChainId(),
  })

  const orders = createMergerComponent<Order, OrderOptions, OrderSortBy>({
    sources: [
      createOrdersSource(marketplaceOrders),
      createOrdersSource(collectionsOrders),
    ],
    defaultSortBy: OrderSortBy.RECENTLY_LISTED,
    directions: {
      [OrderSortBy.RECENTLY_LISTED]: SortDirection.DESC,
      [OrderSortBy.RECENTLY_UPDATED]: SortDirection.DESC,
      [OrderSortBy.CHEAPEST]: SortDirection.ASC,
    },
    maxCount: 1000,
  })

  // bids
  const marketplaceBids = createBidsComponent({
    subgraph: marketplaceSubgraph,
    network: Network.ETHEREUM,
    chainId: getMarketplaceChainId(),
  })

  const bids = createMergerComponent<Bid, BidOptions, BidSortBy>({
    sources: [createBidsSource(marketplaceBids)],
    defaultSortBy: BidSortBy.RECENTLY_LISTED,
    directions: {
      [BidSortBy.RECENTLY_LISTED]: SortDirection.DESC,
      [BidSortBy.RECENTLY_UPDATED]: SortDirection.DESC,
      [BidSortBy.CHEAPEST]: SortDirection.ASC,
    },
    maxCount: 1000,
  })

  // nfts
  const browse = createBrowseComponent({
    marketplaceSubgraph,
    collectionsSubgraph,
  })

  return {
    config,
    logs,
    server,
    statusChecks,
    metrics,
    marketplaceSubgraph,
    collectionsSubgraph,
    orders,
    bids,
    browse,
  }
}

Lifecycle.programEntryPoint({
  main,
  initComponents,
}).catch((error) => console.error('Error staring app lifecycle', error))

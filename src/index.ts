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
import { createBidsComponent } from './ports/bids/component'
import { createOrdersComponent } from './ports/orders/component'
import { createMergerComponent } from './ports/merger/component'
import { Order, OrderFilters, OrderSortBy } from './ports/orders/types'
import { SortDirection } from './ports/merger/types'
import { Bid, BidFilters, BidSortBy } from './ports/bids/types'
import { getMarketplaceChainId, getCollectionsChainId } from './logic/chainIds'
import { createOrdersSource } from './adapters/sources/orders'
import { createContractsComponent } from './ports/contracts/compontent'
import { createBidsSource } from './adapters/sources/bids'
import {
  Contract,
  ContractFilters,
  ContractSortBy,
} from './ports/contracts/types'
import { createContractsSource } from './adapters/sources/contracts'
import { createNFTComponent } from './ports/nfts/component'
import {
  fromMarketplaceNFTFragment,
  getMarketplaceExtraVariables,
  getMarketplaceExtraWhere,
  getMarketplaceFragment,
  getMarketplaceOrderBy,
  marketplaceShouldFetch,
} from './logic/nfts/marketplace'
import {
  collectionsShouldFetch,
  fromCollectionsFragment,
  getCollectionsFragment,
  getCollectionsOrderBy,
} from './logic/nfts/collections'
import { NFTFilters, NFTResult, NFTSortBy } from './ports/nfts/types'
import { NFT_DEFAULT_SORT_BY } from './ports/nfts/utils'
import { createNFTsSource } from './adapters/sources/nfts'
import {
  getCollectionsContracts,
  getMarketplaceContracts,
} from './logic/contracts'

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

  // chain ids
  const marketplaceChainId = getMarketplaceChainId()
  const collectionsChainId = getCollectionsChainId()

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
    chainId: marketplaceChainId,
  })

  const collectionsOrders = createOrdersComponent({
    subgraph: collectionsSubgraph,
    network: Network.MATIC,
    chainId: collectionsChainId,
  })

  const orders = createMergerComponent<Order, OrderFilters, OrderSortBy>({
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
    chainId: marketplaceChainId,
  })

  const bids = createMergerComponent<Bid, BidFilters, BidSortBy>({
    sources: [createBidsSource(marketplaceBids)],
    defaultSortBy: BidSortBy.RECENTLY_LISTED,
    directions: {
      [BidSortBy.RECENTLY_LISTED]: SortDirection.DESC,
      [BidSortBy.RECENTLY_UPDATED]: SortDirection.DESC,
      [BidSortBy.MOST_EXPENSIVE]: SortDirection.DESC,
    },
    maxCount: 1000,
  })

  // contracts
  const marketplaceContracts = createContractsComponent({
    getContracts: () => getMarketplaceContracts(marketplaceChainId),
    network: Network.ETHEREUM,
  })

  const collectionsContracts = createContractsComponent({
    getContracts: () =>
      getCollectionsContracts(
        collectionsSubgraph,
        Network.MATIC,
        collectionsChainId
      ),
    network: Network.MATIC,
  })

  const contracts = createMergerComponent<
    Contract,
    ContractFilters,
    ContractSortBy
  >({
    sources: [
      createContractsSource(marketplaceContracts),
      createContractsSource(collectionsContracts),
    ],
    defaultSortBy: ContractSortBy.NAME,
    directions: {
      [ContractSortBy.NAME]: SortDirection.ASC,
    },
  })

  // nfts
  const marketplaceNFTs = createNFTComponent({
    subgraph: marketplaceSubgraph,
    shouldFetch: marketplaceShouldFetch,
    fragmentName: 'marketplaceFragment',
    getFragment: getMarketplaceFragment,
    fromFragment: fromMarketplaceNFTFragment,
    getSortByProp: getMarketplaceOrderBy,
    getExtraVariables: getMarketplaceExtraVariables,
    getExtraWhere: getMarketplaceExtraWhere,
  })

  const collectionsNFTs = createNFTComponent({
    subgraph: collectionsSubgraph,
    shouldFetch: collectionsShouldFetch,
    fragmentName: 'collectionsFragment',
    getFragment: getCollectionsFragment,
    fromFragment: fromCollectionsFragment,
    getSortByProp: getCollectionsOrderBy,
  })

  const nfts = createMergerComponent<NFTResult, NFTFilters, NFTSortBy>({
    sources: [
      createNFTsSource(marketplaceNFTs),
      createNFTsSource(collectionsNFTs),
    ],
    defaultSortBy: NFT_DEFAULT_SORT_BY,
    directions: {
      [NFTSortBy.CHEAPEST]: SortDirection.ASC,
      [NFTSortBy.NAME]: SortDirection.ASC,
      [NFTSortBy.NEWEST]: SortDirection.DESC,
      [NFTSortBy.RECENTLY_LISTED]: SortDirection.DESC,
    },
    maxCount: 1000,
  })

  return {
    config,
    logs,
    server,
    statusChecks,
    metrics,
    orders,
    bids,
    contracts,
    nfts,
  }
}

Lifecycle.programEntryPoint({
  main,
  initComponents,
}).catch((error) => console.error('Error staring app lifecycle', error))

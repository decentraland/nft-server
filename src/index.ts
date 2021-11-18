import { config as configDotEnvFile } from 'dotenv'
import {
  Bid,
  BidFilters,
  BidSortBy,
  Collection,
  CollectionFilters,
  CollectionSortBy,
  Contract,
  ContractFilters,
  ContractSortBy,
  Item,
  ItemFilters,
  ItemSortBy,
  Mint,
  MintFilters,
  MintSortBy,
  Network,
  NFTFilters,
  NFTSortBy,
  Order,
  OrderFilters,
  OrderSortBy,
  Sale,
  SaleFilters,
  SaleSortBy,
} from '@dcl/schemas'
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
import { SortDirection } from './ports/merger/types'
import { getMarketplaceChainId, getCollectionsChainId } from './logic/chainIds'
import { createOrdersSource } from './adapters/sources/orders'
import { createContractsComponent } from './ports/contracts/compontent'
import { createBidsSource } from './adapters/sources/bids'
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
  getCollectionsExtraVariables,
  getCollectionsExtraWhere,
  getCollectionsFragment,
  getCollectionsOrderBy,
} from './logic/nfts/collections'
import { NFTResult } from './ports/nfts/types'
import { NFT_DEFAULT_SORT_BY } from './ports/nfts/utils'
import { createNFTsSource } from './adapters/sources/nfts'
import {
  getCollectionsContracts,
  getMarketplaceContracts,
} from './logic/contracts'
import { BID_DEFAULT_SORT_BY } from './ports/bids/utils'
import { ORDER_DEFAULT_SORT_BY } from './ports/orders/utils'
import { createItemsSource } from './adapters/sources/items'
import { createItemsComponent } from './ports/items/component'
import { ITEM_DEFAULT_SORT_BY } from './ports/items/utils'
import { createMintsComponent } from './ports/mints/component'
import { createMintsSource } from './adapters/sources/mints'
import { MINT_DEFAULT_SORT_BY } from './ports/mints/utils'
import { createSalesSource } from './adapters/sources/sales'
import { SALE_DEFAULT_SORT_BY } from './ports/sales/utils'
import { createSalesComponent } from './ports/sales/component'
import { createCollectionsComponent } from './ports/collections/component'
import { createCollectionsSource } from './adapters/sources/collections'
import { COLLECTION_DEFAULT_SORT_BY } from './ports/collections/utils'

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

  const globalLogger = logs.getLogger('nft-server')

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
    defaultSortBy: ORDER_DEFAULT_SORT_BY,
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
    defaultSortBy: BID_DEFAULT_SORT_BY,
    directions: {
      [BidSortBy.RECENTLY_OFFERED]: SortDirection.DESC,
      [BidSortBy.RECENTLY_UPDATED]: SortDirection.DESC,
      [BidSortBy.MOST_EXPENSIVE]: SortDirection.DESC,
    },
    maxCount: 1000,
  })

  // contracts
  const marketplaceContracts = createContractsComponent({
    getContracts: async () => getMarketplaceContracts(marketplaceChainId),
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
    getExtraWhere: getCollectionsExtraWhere,
    getExtraVariables: getCollectionsExtraVariables,
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
      [NFTSortBy.RECENTLY_SOLD]: SortDirection.DESC,
    },
    maxCount: 1000,
  })

  // items
  const collectionsItems = createItemsComponent({
    subgraph: collectionsSubgraph,
    network: Network.MATIC,
    chainId: collectionsChainId,
  })

  const items = createMergerComponent<Item, ItemFilters, ItemSortBy>({
    sources: [createItemsSource(collectionsItems)],
    defaultSortBy: ITEM_DEFAULT_SORT_BY,
    directions: {
      [ItemSortBy.NEWEST]: SortDirection.DESC,
      [ItemSortBy.RECENTLY_REVIEWED]: SortDirection.DESC,
      [ItemSortBy.RECENTLY_SOLD]: SortDirection.DESC,
      [ItemSortBy.NAME]: SortDirection.ASC,
      [ItemSortBy.CHEAPEST]: SortDirection.ASC,
    },
    maxCount: 1000,
  })

  // mints
  const collectionsMints = createMintsComponent({
    subgraph: collectionsSubgraph,
    network: Network.MATIC,
    chainId: collectionsChainId,
  })

  const mints = createMergerComponent<Mint, MintFilters, MintSortBy>({
    sources: [createMintsSource(collectionsMints)],
    defaultSortBy: MINT_DEFAULT_SORT_BY,
    directions: {
      [MintSortBy.RECENTLY_MINTED]: SortDirection.DESC,
      [MintSortBy.MOST_EXPENSIVE]: SortDirection.DESC,
    },
    maxCount: 1000,
  })

  // sales
  const marketplaceSales = createSalesComponent({
    subgraph: marketplaceSubgraph,
    network: Network.ETHEREUM,
    chainId: marketplaceChainId,
  })

  const collectionsSales = createSalesComponent({
    subgraph: collectionsSubgraph,
    network: Network.MATIC,
    chainId: collectionsChainId,
  })

  const sales = createMergerComponent<Sale, SaleFilters, SaleSortBy>({
    sources: [
      createSalesSource(marketplaceSales),
      createSalesSource(collectionsSales),
    ],
    defaultSortBy: SALE_DEFAULT_SORT_BY,
    directions: {
      [SaleSortBy.RECENTLY_SOLD]: SortDirection.DESC,
      [SaleSortBy.MOST_EXPENSIVE]: SortDirection.DESC,
    },
    maxCount: 1000,
  })

  // collections
  const collectionsCollections = createCollectionsComponent({
    subgraph: collectionsSubgraph,
    network: Network.MATIC,
    chainId: collectionsChainId,
  })

  const collections = createMergerComponent<
    Collection,
    CollectionFilters,
    CollectionSortBy
  >({
    sources: [createCollectionsSource(collectionsCollections)],
    defaultSortBy: COLLECTION_DEFAULT_SORT_BY,
    directions: {
      [CollectionSortBy.NAME]: SortDirection.ASC,
      [CollectionSortBy.NEWEST]: SortDirection.DESC,
      [CollectionSortBy.RECENTLY_REVIEWED]: SortDirection.DESC,
      [CollectionSortBy.SIZE]: SortDirection.DESC,
    },
    maxCount: 1000,
  })

  return {
    config,
    logs,
    globalLogger,
    server,
    statusChecks,
    metrics,
    orders,
    bids,
    contracts,
    nfts,
    items,
    mints,
    sales,
    collections,
  }
}

Lifecycle.programEntryPoint({
  main,
  initComponents,
}).catch((error) => console.error('Error staring app lifecycle', error))

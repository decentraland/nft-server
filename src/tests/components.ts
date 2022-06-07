import nodeFetch from 'node-fetch'
import BN from 'bn.js'
import { createDotEnvConfigComponent } from '@well-known-components/env-config-provider'
import {
  createServerComponent,
  createStatusCheckComponent,
} from '@well-known-components/http-server'
import {
  createSubgraphComponent,
  metricDeclarations,
} from '@well-known-components/thegraph-component'
import { createMetricsComponent } from '@well-known-components/metrics'
import { createLogComponent } from '@well-known-components/logger'
import { createRunner } from '@well-known-components/test-helpers'
import { main } from '../../src/service'
import { AppComponents, GlobalContext } from '../types'
import {
  Network,
  AnalyticsDayData,
  AnalyticsDayDataFilters,
  AnalyticsDayDataSortBy,
  Bid,
  BidFilters,
  BidSortBy,
  Contract,
  ContractFilters,
  ContractSortBy,
  Item,
  ItemFilters,
  ItemSortBy,
  Mint,
  MintFilters,
  MintSortBy,
  NFTFilters,
  NFTSortBy,
  Order,
  OrderFilters,
  OrderSortBy,
  Sale,
  SaleFilters,
  SaleSortBy,
  Collection,
  CollectionFilters,
  CollectionSortBy,
  Account,
  AccountFilters,
  AccountSortBy,
} from '@dcl/schemas'

import { createAnalyticsDayDataSource } from '../adapters/sources/analyticsDayData'
import { createAnalyticsDayDataComponent } from '../ports/analyticsDayData/component'
import { createMergerComponent } from '../ports/merger/component'
import { SortDirection } from '../ports/merger/types'
import { createRequestSessionComponent } from '../ports/requestSession/component'
import { createBidsSource } from '../adapters/sources/bids'
import { createContractsSource } from '../adapters/sources/contracts'
import { createItemsSource } from '../adapters/sources/items'
import { createMintsSource } from '../adapters/sources/mints'
import { createNFTsSource } from '../adapters/sources/nfts'
import { createOrdersSource } from '../adapters/sources/orders'
import { createSalesSource } from '../adapters/sources/sales'
import {
  getMarketplaceContracts,
  getCollectionsContracts,
} from '../logic/contracts'
import {
  collectionsShouldFetch,
  getCollectionsFragment,
  fromCollectionsFragment,
  getCollectionsOrderBy,
  getCollectionsExtraWhere,
  getCollectionsExtraVariables,
} from '../logic/nfts/collections'
import {
  marketplaceShouldFetch,
  getMarketplaceFragment,
  fromMarketplaceNFTFragment,
  getMarketplaceOrderBy,
  getMarketplaceExtraVariables,
  getMarketplaceExtraWhere,
} from '../logic/nfts/marketplace'
import { createBidsComponent } from '../ports/bids/component'
import { BID_DEFAULT_SORT_BY } from '../ports/bids/utils'
import { createContractsComponent } from '../ports/contracts/compontent'
import { createItemsComponent } from '../ports/items/component'
import { ITEM_DEFAULT_SORT_BY } from '../ports/items/utils'
import { createMintsComponent } from '../ports/mints/component'
import { MINT_DEFAULT_SORT_BY } from '../ports/mints/utils'
import { createNFTComponent } from '../ports/nfts/component'
import { NFTResult } from '../ports/nfts/types'
import { NFT_DEFAULT_SORT_BY } from '../ports/nfts/utils'
import { ORDER_DEFAULT_SORT_BY } from '../ports/orders/utils'
import { createSalesComponent } from '../ports/sales/component'
import { SALE_DEFAULT_SORT_BY } from '../ports/sales/utils'
import { getMarketplaceChainId, getCollectionsChainId } from '../logic/chainIds'
import { createOrdersComponent } from '../ports/orders/component'
import { createCollectionsComponent } from '../ports/collections/component'
import { createCollectionsSource } from '../adapters/sources/collections'
import { COLLECTION_DEFAULT_SORT_BY } from '../ports/collections/utils'
import { createAccountsSource } from '../adapters/sources/accounts'
import { createAccountsComponent } from '../ports/accounts/component'
import { ACCOUNT_DEFAULT_SORT_BY } from '../ports/accounts/utils'
import { createRankingsComponent } from '../ports/rankings/component'
import { createTrendingsComponent } from '../ports/trendings/component'

// start TCP port for listeners
let lastUsedPort = 19000 + parseInt(process.env.JEST_WORKER_ID || '1') * 1000
function getFreePort() {
  return lastUsedPort + 1
}

/**
 * Behaves like Jest "describe" function, used to describe a test for a
 * use case, it creates a whole new program and components to run an
 * isolated test.
 *
 * State is persistent within the steps of the test.
 */
export const test = createRunner<AppComponents>({
  main,
  initComponents,
})

export async function initComponents(): Promise<AppComponents> {
  const currentPort = getFreePort()
  process.env.HTTP_SERVER_PORT = (currentPort + 1).toString()

  // default config from process.env + .env file
  const config = await createDotEnvConfigComponent(
    { path: ['.env.spec'] },
    process.env
  )

  // chain ids
  const marketplaceChainId = getMarketplaceChainId()
  const collectionsChainId = getCollectionsChainId()

  const cors = {
    origin: await config.getString('CORS_ORIGIN'),
    method: await config.getString('CORS_METHOD'),
  }

  const logs = createLogComponent()
  const server = await createServerComponent<GlobalContext>(
    { config, logs },
    { cors, compression: {} }
  )

  const metrics = await createMetricsComponent(metricDeclarations, {
    server,
    config,
  })

  const marketplaceSubgraph = await createSubgraphComponent(
    { config, logs, fetch: { fetch: nodeFetch }, metrics },
    await config.requireString('MARKETPLACE_SUBGRAPH_URL')
  )

  const collectionsSubgraph = await createSubgraphComponent(
    { config, logs, fetch: { fetch: nodeFetch }, metrics },
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

  const collectionsBids = createBidsComponent({
    subgraph: collectionsSubgraph,
    network: Network.MATIC,
    chainId: collectionsChainId,
  })

  const bids = createMergerComponent<Bid, BidFilters, BidSortBy>({
    sources: [
      createBidsSource(marketplaceBids),
      createBidsSource(collectionsBids),
    ],
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

  // trendings
  const trendings = createTrendingsComponent(collectionsSubgraph, items)

  // analytics day data for the marketplace subgraph
  const marketplaceAnalyticsDayData = createAnalyticsDayDataComponent({
    subgraph: marketplaceSubgraph,
    network: Network.MATIC,
  })

  // analytics day data for the collections subgraph
  const collectionsAnalyticsDayData = createAnalyticsDayDataComponent({
    subgraph: collectionsSubgraph,
    network: Network.MATIC,
  })

  const analyticsData = createMergerComponent<
    AnalyticsDayData,
    AnalyticsDayDataFilters,
    AnalyticsDayDataSortBy
  >({
    sources: [
      createAnalyticsDayDataSource(marketplaceAnalyticsDayData),
      createAnalyticsDayDataSource(collectionsAnalyticsDayData),
    ],
    defaultSortBy: AnalyticsDayDataSortBy.DATE,
    directions: {
      [AnalyticsDayDataSortBy.DATE]: SortDirection.DESC,
      [AnalyticsDayDataSortBy.MOST_SALES]: SortDirection.DESC,
    },
    maxCount: 1000,
    mergerEqualFn: (dayData1: AnalyticsDayData, dayData2: AnalyticsDayData) =>
      dayData1.id === dayData2.id,
    mergerStrategy: (
      dayData1: AnalyticsDayData,
      dayData2: AnalyticsDayData
    ): AnalyticsDayData => ({
      id: dayData1.id, // id and date will be the same since they. We pick just the one from 'volume1'
      date: dayData1.date,
      sales: dayData1.sales + dayData2.sales,
      volume: new BN(dayData1.volume).add(new BN(dayData2.volume)).toString(),
      daoEarnings: new BN(dayData1.daoEarnings)
        .add(new BN(dayData2.daoEarnings))
        .toString(),
      creatorsEarnings: new BN(dayData1.creatorsEarnings)
        .add(new BN(dayData2.creatorsEarnings))
        .toString(),
    }),
  })

  // rankings
  const rankings = createRankingsComponent(analyticsData)

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

  // accounts
  const marketplaceAccounts = createAccountsComponent({
    subgraph: marketplaceSubgraph,
    network: Network.ETHEREUM,
    chainId: marketplaceChainId,
  })

  const collectionsAccounts = createAccountsComponent({
    subgraph: collectionsSubgraph,
    network: Network.MATIC,
    chainId: collectionsChainId,
  })

  const accounts = createMergerComponent<
    Account,
    AccountFilters,
    AccountSortBy
  >({
    sources: [
      createAccountsSource(marketplaceAccounts),
      createAccountsSource(collectionsAccounts),
    ],
    defaultSortBy: ACCOUNT_DEFAULT_SORT_BY,
    directions: {
      [AccountSortBy.MOST_EARNED]: SortDirection.DESC,
      [AccountSortBy.MOST_PURCHASES]: SortDirection.DESC,
      [AccountSortBy.MOST_ROYALTIES]: SortDirection.DESC,
      [AccountSortBy.MOST_SALES]: SortDirection.DESC,
      [AccountSortBy.MOST_SPENT]: SortDirection.DESC,
    },
  })

  const statusChecks = await createStatusCheckComponent({ config, server })
  const globalLogger = logs.getLogger('nft-server')
  const requestSession = createRequestSessionComponent()

  return {
    config,
    logs,
    globalLogger,
    requestSession,
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
    trendings,
    collections,
    accounts,
    analyticsData,
    marketplaceSubgraph,
    collectionsSubgraph,
    rankings,
  }
}

import BN from 'bn.js'
import nodeFetch from 'node-fetch'
import { config as configDotEnvFile } from 'dotenv'
configDotEnvFile() // load env file before other imports because some of them use env variables
import {
  Account,
  AccountFilters,
  AccountSortBy,
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
  AnalyticsDayData,
  AnalyticsDayDataFilters,
  AnalyticsDayDataSortBy,
} from '@dcl/schemas'
import { createConfigComponent } from '@well-known-components/env-config-provider'
import {
  createSubgraphComponent,
  metricDeclarations,
} from '@well-known-components/thegraph-component'
import {
  createServerComponent,
  createStatusCheckComponent,
  IFetchComponent,
} from '@well-known-components/http-server'
import { Lifecycle } from '@well-known-components/interfaces'
import { createMetricsComponent } from '@well-known-components/metrics'
import { AppComponents, AppConfig, GlobalContext } from './types'
import { createBidsComponent } from './ports/bids/component'
import { createOrdersComponent } from './ports/orders/component'
import { createMergerComponent } from './ports/merger/component'
import { IMergerComponent, SortDirection } from './ports/merger/types'
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
import { createRequestSessionComponent } from './ports/requestSession/component'
import { createAccountsComponent } from './ports/accounts/component'
import { createAccountsSource } from './adapters/sources/accounts'
import { ACCOUNT_DEFAULT_SORT_BY } from './ports/accounts/utils'
import { createLogComponent } from './ports/logger/component'
import { createAnalyticsDayDataComponent } from './ports/analyticsDayData/component'
import { createAnalyticsDayDataSource } from './adapters/sources/analyticsDayData'
import { main } from './service'
import { createVolumeComponent } from './ports/volume/component'
import { createRankingsComponent } from './ports/rankings/component'
import { createTrendingsComponent } from './ports/trendings/component'
import { createRentalsComponent } from './ports/rentals/components'
import { createRentalsNFTSource } from './adapters/sources/rentals'
import {
  createRentalsNFTComponent,
  getLandAndEstateContractAddresses,
  rentalNFTComponentShouldFetch,
} from './ports/nfts/rentalsNFTComponent'

async function initComponents(): Promise<AppComponents> {
  // Default config
  const defaultValues: Partial<AppConfig> = {
    HTTP_SERVER_PORT: process.env.HTTP_SERVER_PORT || '5000',
    HTTP_SERVER_HOST: process.env.HTTP_SERVER_HOST || '0.0.0.0',
    API_VERSION: process.env.API_VERSION || 'v1',
  }

  const config = createConfigComponent(process.env, defaultValues)

  const cors = {
    origin: await config.getString('CORS_ORIGIN'),
    methods: await config.getString('CORS_METHOD'),
  }

  // FF_RENTALS
  const isRentalsEnabled = (await config.getNumber('FF_RENTALS')) === 1

  const requestSession = createRequestSessionComponent()
  const logs = createLogComponent({ requestSession })

  const globalLogger = logs.getLogger('nft-server')

  const server = await createServerComponent<GlobalContext>(
    { config, logs },
    { cors, compression: {} }
  )

  const statusChecks = await createStatusCheckComponent({ config, server })

  const metrics = await createMetricsComponent(metricDeclarations, {
    server,
    config,
  })

  // chain ids
  const marketplaceChainId = getMarketplaceChainId()
  const collectionsChainId = getCollectionsChainId()

  const fetch: IFetchComponent = {
    fetch: nodeFetch,
  }

  // subgraphs
  const marketplaceSubgraph = await createSubgraphComponent(
    { logs, config, fetch, metrics },
    await config.requireString('MARKETPLACE_SUBGRAPH_URL')
  )

  const collectionsSubgraph = await createSubgraphComponent(
    { logs, config, fetch, metrics },
    await config.requireString('COLLECTIONS_SUBGRAPH_URL')
  )

  const rentalsSubgraph = await createSubgraphComponent(
    { logs, config, fetch, metrics },
    await config.requireString('RENTALS_SUBGRAPH_URL')
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

  // Rentals component
  const SIGNATURES_SERVER_URL = await config.requireString(
    'SIGNATURES_SERVER_URL'
  )

  const rentalsComponent = createRentalsComponent(
    { fetch },
    SIGNATURES_SERVER_URL,
    rentalsSubgraph
  )

  // nfts
  const marketplaceNFTs = createNFTComponent({
    subgraph: marketplaceSubgraph,
    fragmentName: 'marketplaceFragment',
    getFragment: getMarketplaceFragment,
    fromFragment: fromMarketplaceNFTFragment,
    getSortByProp: getMarketplaceOrderBy,
    getExtraVariables: getMarketplaceExtraVariables,
    getExtraWhere: getMarketplaceExtraWhere,
  })

  const collectionsNFTs = createNFTComponent({
    subgraph: collectionsSubgraph,
    fragmentName: 'collectionsFragment',
    getFragment: getCollectionsFragment,
    fromFragment: fromCollectionsFragment,
    getSortByProp: getCollectionsOrderBy,
    getExtraWhere: getCollectionsExtraWhere,
    getExtraVariables: getCollectionsExtraVariables,
  })

  const rentalsNFTs = createRentalsNFTComponent({
    rentalsComponent: rentalsComponent,
    marketplaceNFTsComponent: marketplaceNFTs,
    contractAddresses: getLandAndEstateContractAddresses(
      getMarketplaceContracts(marketplaceChainId)
    ),
  })

  const nftSources: IMergerComponent.Source<
    NFTResult,
    NFTFilters,
    NFTSortBy
  >[] = [
    createNFTsSource(marketplaceNFTs, {
      shouldFetch: marketplaceShouldFetch,
      isRentalsEnabled,
      rentals: rentalsComponent,
    }),
    createNFTsSource(collectionsNFTs, {
      shouldFetch: collectionsShouldFetch,
    }),
  ]

  if (isRentalsEnabled) {
    nftSources.push(createRentalsNFTSource(rentalsComponent, marketplaceNFTs))
    nftSources.push(
      createNFTsSource(rentalsNFTs, {
        shouldFetch: rentalNFTComponentShouldFetch,
        isRentalsEnabled,
        rentals: rentalsComponent,
      })
    )
  }

  const nfts = createMergerComponent<NFTResult, NFTFilters, NFTSortBy>({
    sources: nftSources,
    defaultSortBy: NFT_DEFAULT_SORT_BY,
    directions: {
      [NFTSortBy.CHEAPEST]: SortDirection.ASC,
      [NFTSortBy.NAME]: SortDirection.ASC,
      [NFTSortBy.NEWEST]: SortDirection.DESC,
      [NFTSortBy.RECENTLY_LISTED]: SortDirection.DESC,
      [NFTSortBy.RECENTLY_SOLD]: SortDirection.DESC,
      // Rentals directions
      [NFTSortBy.MAX_RENTAL_PRICE]: SortDirection.DESC,
      [NFTSortBy.MIN_RENTAL_PRICE]: SortDirection.ASC,
      [NFTSortBy.RENTAL_DATE]: SortDirection.DESC,
      [NFTSortBy.RENTAL_LISTING_DATE]: SortDirection.DESC,
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

  // volumes
  const volumes = createVolumeComponent(analyticsData)

  // rankings collections subgraph
  const rankings = createRankingsComponent({
    subgraph: collectionsSubgraph,
    network: Network.MATIC,
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
    rankings,
    volumes,
    analyticsData,
    collectionsSubgraph,
    marketplaceSubgraph,
  }
}

Lifecycle.run({ main, initComponents })

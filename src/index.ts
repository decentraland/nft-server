import BN from 'bn.js'
import * as nodeFetch from 'node-fetch'
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
import { createHttpTracerComponent } from '@well-known-components/http-tracer-component'
import { createPgComponent } from '@well-known-components/pg-component'
import { Lifecycle } from '@well-known-components/interfaces'
import { createMetricsComponent } from '@well-known-components/metrics'
import { createTracerComponent } from '@well-known-components/tracer-component'
import { createLogComponent } from '@well-known-components/logger'
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
  getMarketplaceFiltersValidation,
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
import {
  getMarketplacePriceFiltersValidation,
  getMarketplacePricesQuery,
  marketplaceShouldFetch as marketplaceShouldFetchPrices,
} from './logic/prices/marketplace'
import {
  collectionsShouldFetch as collectionsShouldFetchPrices,
  getCollectionPricesQuery,
} from './logic/prices/collections'
import { NFTResult } from './ports/nfts/types'
import { NFT_DEFAULT_SORT_BY } from './ports/nfts/utils'
import { createNFTsSource } from './adapters/sources/nfts'
import {
  getCollectionsContracts,
  getMarketplaceContracts,
} from './logic/contracts'
import { BID_DEFAULT_SORT_BY } from './ports/bids/utils'
import {
  getCollectionsItemIdFilter,
  getCollectionsNameFilter,
  getCollectionsOrderFields,
  getMarketplaceItemIdFilter,
  getMarketplaceNameFilter,
  getMarketplaceOrderFields,
  ORDER_DEFAULT_SORT_BY,
} from './ports/orders/utils'
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
import {
  COLLECTION_DEFAULT_SORT_BY,
  getIsEthereumCollection,
} from './ports/collections/utils'
import { createAccountsComponent } from './ports/accounts/component'
import { createAccountsSource } from './adapters/sources/accounts'
import { ACCOUNT_DEFAULT_SORT_BY } from './ports/accounts/utils'
import { createAnalyticsDayDataComponent } from './ports/analyticsDayData/component'
import { createAnalyticsDayDataSource } from './adapters/sources/analyticsDayData'
import { main } from './service'
import { createVolumeComponent } from './ports/volume/component'
import { createRankingsComponent } from './ports/rankings/component'
import { createTrendingsComponent } from './ports/trendings/component'
import { createRentalsComponent } from './ports/rentals/components'
import { createRentalsNFTSource } from './adapters/sources/rentals'
import { createRentalsNFTComponent } from './ports/rentalNFTs/component'
import {
  createPricesComponent,
  createProcessedPricesComponent,
} from './ports/prices/component'
import { PriceFilters, PriceFragment, PriceSortBy } from './ports/prices/types'
import { createPricesSource } from './adapters/sources/prices'
import {
  getLandAndEstateContractAddresses,
  rentalNFTComponentShouldFetch,
  shouldFetch as shouldFetchRentalsFromSignatureServer,
} from './logic/nfts/rentals'
import {
  getAnalyticsDayDataQuery,
  getAnalyticsTotalDataQuery,
  getRentalsAnalyticsDayDataQuery,
  getRentalsAnalyticsTotalDataQuery,
  mapAnalyticsFragment,
  mapRentalsAnalyticsFragment,
} from './ports/analyticsDayData/utils'
import {
  instrumentHttpServerWithRequestLogger,
  Verbosity,
} from '@well-known-components/http-requests-logger-component'
import {
  AnalyticsDayDataFragment,
  RentalsAnalyticsDayDataFragment,
} from './ports/analyticsDayData/types'
import { createStatsComponent } from './ports/stats/component'
import {
  getMarketplaceAccountFragment,
  getMarketplaceAccountOrderBy,
} from './logic/accounts/marketplace'
import {
  getCollectionsAccountFragment,
  getCollectionsAccountOrderBy,
} from './logic/accounts/collections'
import { createOwnersComponent } from './ports/owner/component'
import { createFavoritesComponent } from './ports/favorites/components'
import { ItemOptions } from './ports/items/types'
import { createCatalogComponent } from './ports/catalog/component'

async function initComponents(): Promise<AppComponents> {
  // Default config
  const defaultValues: Partial<AppConfig> = {
    HTTP_SERVER_PORT: process.env.HTTP_SERVER_PORT || '5000',
    HTTP_SERVER_HOST: process.env.HTTP_SERVER_HOST || '0.0.0.0',
    API_VERSION: process.env.API_VERSION || 'v1',
  }

  const config = createConfigComponent(process.env, defaultValues)
  const tracer = createTracerComponent()

  const fetch: IFetchComponent = {
    fetch: (url: nodeFetch.RequestInfo, init?: nodeFetch.RequestInit) => {
      const headers: nodeFetch.HeadersInit = { ...init?.headers }
      const traceParent = tracer.isInsideOfTraceSpan()
        ? tracer.getTraceChildString()
        : null
      if (traceParent) {
        ;(headers as { [key: string]: string }).traceparent = traceParent
        const traceState = tracer.getTraceStateString()
        if (traceState) {
          ;(headers as { [key: string]: string }).tracestate = traceState
        }
      }
      return nodeFetch.default(url, { ...init, headers })
    },
  }

  const cors = {
    origin: (await config.requireString('CORS_ORIGIN'))
      .split(';')
      .map((origin) => new RegExp(origin)),
    methods: await config.getString('CORS_METHOD'),
  }

  const logs = await createLogComponent({ tracer })

  const server = await createServerComponent<GlobalContext>(
    { config, logs },
    { cors, compression: {} }
  )

  const metrics = await createMetricsComponent(metricDeclarations, {
    server,
    config,
  })

  createHttpTracerComponent({ server, tracer })

  instrumentHttpServerWithRequestLogger(
    { server, logger: logs },
    { verbosity: Verbosity.INFO }
  )

  const statusChecks = await createStatusCheckComponent({ config, server })

  // chain ids
  const marketplaceChainId = getMarketplaceChainId()
  const collectionsChainId = getCollectionsChainId()

  // subgraphs
  const marketplaceSubgraph = await createSubgraphComponent(
    { logs, config, fetch, metrics },
    await config.requireString('MARKETPLACE_SUBGRAPH_URL')
  )

  const collectionsSubgraph = await createSubgraphComponent(
    { logs, config, fetch, metrics },
    await config.requireString('COLLECTIONS_SUBGRAPH_URL')
  )

  const collectionsEthereumSubgraph = await createSubgraphComponent(
    { logs, config, fetch, metrics },
    await config.requireString('COLLECTIONS_ETHEREUM_SUBGRAPH_URL')
  )

  const rentalsSubgraph = await createSubgraphComponent(
    { logs, config, fetch, metrics },
    await config.requireString('RENTALS_SUBGRAPH_URL')
  )

  // dbs
  const satsumaDatabase = await createPgComponent({ config, logs, metrics })

  // orders
  const marketplaceOrders = createOrdersComponent({
    subgraph: marketplaceSubgraph,
    network: Network.ETHEREUM,
    chainId: marketplaceChainId,
    getItemIdFilter: getMarketplaceItemIdFilter,
    getNameFilter: getMarketplaceNameFilter,
    getOrderFields: getMarketplaceOrderFields,
  })

  const collectionsOrders = createOrdersComponent({
    subgraph: collectionsSubgraph,
    network: Network.MATIC,
    chainId: collectionsChainId,
    getItemIdFilter: getCollectionsItemIdFilter,
    getNameFilter: getCollectionsNameFilter,
    getOrderFields: getCollectionsOrderFields,
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
      [OrderSortBy.ISSUED_ID_ASC]: SortDirection.ASC,
      [OrderSortBy.ISSUED_ID_DESC]: SortDirection.DESC,
      [OrderSortBy.OLDEST]: SortDirection.ASC,
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
    db: satsumaDatabase,
    listsServer: await config.requireString('DCL_LISTS_SERVER'),
    fragmentName: 'marketplaceFragment',
    getFragment: getMarketplaceFragment,
    fromFragment: fromMarketplaceNFTFragment,
    getSortByProp: getMarketplaceOrderBy,
    getExtraVariables: getMarketplaceExtraVariables,
    getExtraWhere: getMarketplaceExtraWhere,
    getShouldFetch: getMarketplaceFiltersValidation,
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
    rentalsComponent,
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
      rentals: rentalsComponent,
    }),
    createNFTsSource(collectionsNFTs, {
      shouldFetch: collectionsShouldFetch,
    }),
  ]

  nftSources.push(createRentalsNFTSource(rentalsComponent, marketplaceNFTs))
  nftSources.push(
    createNFTsSource(rentalsNFTs, {
      shouldFetch: rentalNFTComponentShouldFetch,
      rentals: rentalsComponent,
    })
  )

  const nfts = createMergerComponent<NFTResult, NFTFilters, NFTSortBy>({
    sources: nftSources,
    shouldMergeResults: (options) =>
      !shouldFetchRentalsFromSignatureServer(options),
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

  // favorites
  // Favorites component
  const MARKETPLACE_FAVORITES_SERVER_URL = await config.requireString(
    'MARKETPLACE_FAVORITES_SERVER_URL'
  )

  const favoritesComponent = createFavoritesComponent(
    { fetch },
    MARKETPLACE_FAVORITES_SERVER_URL
  )

  // items
  const collectionsItems = createItemsComponent([
    {
      subgraph: collectionsSubgraph,
      network: Network.MATIC,
      chainId: collectionsChainId,
    },
    {
      subgraph: collectionsEthereumSubgraph,
      network: Network.ETHEREUM,
      chainId: marketplaceChainId,
    },
  ])

  const items = createMergerComponent<Item, ItemOptions, ItemSortBy>({
    sources: [
      createItemsSource({
        itemsComponent: collectionsItems,
        favoritesComponent,
      }),
    ],
    defaultSortBy: ITEM_DEFAULT_SORT_BY,
    directions: {
      [ItemSortBy.NEWEST]: SortDirection.DESC,
      [ItemSortBy.RECENTLY_REVIEWED]: SortDirection.DESC,
      [ItemSortBy.RECENTLY_SOLD]: SortDirection.DESC,
      [ItemSortBy.NAME]: SortDirection.ASC,
      [ItemSortBy.CHEAPEST]: SortDirection.ASC,
      [ItemSortBy.RECENTLY_LISTED]: SortDirection.DESC,
    },
    maxCount: 1000,
  })

  // owners
  const owners = createOwnersComponent({
    database: satsumaDatabase,
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
    useLegacySchema: true,
    shouldFetch: (filters: SaleFilters) => {
      return (
        !filters.contractAddress ||
        (!!filters.contractAddress &&
          !getIsEthereumCollection(filters.contractAddress, marketplaceChainId))
      )
    },
  })

  const collectionsSales = createSalesComponent({
    subgraph: collectionsSubgraph,
    network: Network.MATIC,
    chainId: collectionsChainId,
  })

  const collectionsEthereumSales = createSalesComponent({
    subgraph: collectionsEthereumSubgraph,
    network: Network.MATIC, // we'use MATIC here so it uses the right fragment when querying
    chainId: marketplaceChainId,
  })

  const sales = createMergerComponent<Sale, SaleFilters, SaleSortBy>({
    sources: [
      createSalesSource(marketplaceSales),
      createSalesSource(collectionsSales),
      createSalesSource(collectionsEthereumSales),
    ],
    defaultSortBy: SALE_DEFAULT_SORT_BY,
    directions: {
      [SaleSortBy.RECENTLY_SOLD]: SortDirection.DESC,
      [SaleSortBy.MOST_EXPENSIVE]: SortDirection.DESC,
    },
    maxCount: 1000,
  })

  // trendings
  const trendings = createTrendingsComponent({
    collectionsSubgraphComponent: collectionsSubgraph,
    itemsComponent: items,
    favoritesComponent,
  })

  // analytics day data for the marketplace subgraph
  const marketplaceAnalyticsDayData =
    createAnalyticsDayDataComponent<AnalyticsDayDataFragment>({
      subgraph: marketplaceSubgraph,
      network: Network.ETHEREUM,
      getAnalyticsDayDataQuery,
      getAnalyticsTotalDataQuery,
      mapAnalyticsFragment,
    })

  // analytics day data for the collections subgraph
  const collectionsAnalyticsDayData =
    createAnalyticsDayDataComponent<AnalyticsDayDataFragment>({
      subgraph: collectionsSubgraph,
      network: Network.MATIC,
      getAnalyticsDayDataQuery,
      getAnalyticsTotalDataQuery,
      mapAnalyticsFragment,
    })

  // analytics day data for the rentals subgraph
  const rentalsAnalyticsDayData =
    createAnalyticsDayDataComponent<RentalsAnalyticsDayDataFragment>({
      subgraph: rentalsSubgraph,
      network: Network.ETHEREUM,
      getAnalyticsDayDataQuery: getRentalsAnalyticsDayDataQuery,
      getAnalyticsTotalDataQuery: getRentalsAnalyticsTotalDataQuery,
      mapAnalyticsFragment: mapRentalsAnalyticsFragment,
    })

  const analyticsData = createMergerComponent<
    AnalyticsDayData,
    AnalyticsDayDataFilters,
    AnalyticsDayDataSortBy
  >({
    sources: [
      createAnalyticsDayDataSource(marketplaceAnalyticsDayData),
      createAnalyticsDayDataSource(collectionsAnalyticsDayData),
      createAnalyticsDayDataSource(rentalsAnalyticsDayData),
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

  // prices
  const marketplacePrices = createPricesComponent({
    subgraph: marketplaceSubgraph,
    queryGetter: getMarketplacePricesQuery,
    customValidation: getMarketplacePriceFiltersValidation,
  })

  const collectionsPrices = createPricesComponent({
    subgraph: collectionsSubgraph,
    queryGetter: getCollectionPricesQuery,
  })

  const prices = createProcessedPricesComponent(
    createMergerComponent<PriceFragment, PriceFilters, PriceSortBy>({
      sources: [
        createPricesSource(marketplacePrices, {
          shouldFetch: marketplaceShouldFetchPrices,
        }),
        createPricesSource(collectionsPrices, {
          shouldFetch: collectionsShouldFetchPrices,
        }),
      ],
      directions: {
        [PriceSortBy.PRICE]: SortDirection.ASC,
      },
      defaultSortBy: PriceSortBy.PRICE,
    })
  )

  const stats = createStatsComponent({
    subgraph: marketplaceSubgraph,
  })

  // accounts
  const marketplaceAccounts = createAccountsComponent({
    subgraph: marketplaceSubgraph,
    network: Network.ETHEREUM,
    chainId: marketplaceChainId,
    getFragment: getMarketplaceAccountFragment,
    getSortByProp: getMarketplaceAccountOrderBy,
  })

  const collectionsAccounts = createAccountsComponent({
    subgraph: collectionsSubgraph,
    network: Network.MATIC,
    chainId: collectionsChainId,
    getFragment: getCollectionsAccountFragment,
    getSortByProp: getCollectionsAccountOrderBy,
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
      [AccountSortBy.MOST_COLLECTIONS]: SortDirection.DESC,
    },
  })

  // collections
  const collectionsCollections = createCollectionsComponent({
    subgraph: collectionsSubgraph,
    network: Network.MATIC,
    chainId: collectionsChainId,
  })

  // collections eth
  const ethereumCollections = createCollectionsComponent({
    subgraph: collectionsEthereumSubgraph,
    network: Network.ETHEREUM,
    chainId: marketplaceChainId,
  })

  const collections = createMergerComponent<
    Collection,
    CollectionFilters,
    CollectionSortBy
  >({
    sources: [collectionsCollections, ethereumCollections].map(
      createCollectionsSource
    ),
    defaultSortBy: COLLECTION_DEFAULT_SORT_BY,
    directions: {
      [CollectionSortBy.NAME]: SortDirection.ASC,
      [CollectionSortBy.NEWEST]: SortDirection.DESC,
      [CollectionSortBy.RECENTLY_REVIEWED]: SortDirection.DESC,
      [CollectionSortBy.SIZE]: SortDirection.DESC,
      [CollectionSortBy.RECENTLY_LISTED]: SortDirection.DESC,
    },
    maxCount: 1000,
  })

  const catalog = await createCatalogComponent({
    favoritesComponent,
    database: satsumaDatabase,
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
    items,
    mints,
    sales,
    trendings,
    collections,
    accounts,
    rankings,
    prices,
    tracer,
    volumes,
    analyticsData,
    collectionsSubgraph,
    marketplaceSubgraph,
    stats,
    owners,
    favorites: favoritesComponent,
    catalog,
    satsumaDatabase,
  }
}

Lifecycle.run({ main, initComponents })

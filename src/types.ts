import {
  Account,
  AccountFilters,
  AccountSortBy,
  AnalyticsDayData,
  AnalyticsDayDataFilters,
  AnalyticsDayDataSortBy,
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
  NFTFilters,
  NFTSortBy,
  Order,
  OrderFilters,
  OrderSortBy,
  Sale,
  SaleFilters,
  SaleSortBy,
} from '@dcl/schemas'
import { RoutedContext } from '@well-known-components/http-server'
import type {
  IConfigComponent,
  ILoggerComponent,
  IHttpServerComponent,
  IMetricsComponent,
  IBaseComponent,
} from '@well-known-components/interfaces'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { IVolumeComponent } from './ports/volume/types'
import { IItemsDayDataComponent } from './ports/rankings/types'
import { IMergerComponent } from './ports/merger/types'
import { NFTResult } from './ports/nfts/types'
import { IRequestSessionComponent } from './ports/requestSession/types'
import { ITrendingsComponent } from './ports/trendings/types'

export type AppConfig = {
  HTTP_SERVER_PORT: string
  HTTP_SERVER_HOST: string
  API_VERSION: string
}

export type GlobalContext = {
  components: AppComponents
}

export type AppComponents = {
  config: IConfigComponent
  logs: ILoggerComponent
  globalLogger: ILoggerComponent.ILogger
  requestSession: IRequestSessionComponent
  server: IHttpServerComponent<GlobalContext>
  statusChecks: IBaseComponent
  metrics: IMetricsComponent<any>
  orders: IMergerComponent<Order, OrderFilters, OrderSortBy>
  bids: IMergerComponent<Bid, BidFilters, BidSortBy>
  contracts: IMergerComponent<Contract, ContractFilters, ContractSortBy>
  nfts: IMergerComponent<NFTResult, NFTFilters, NFTSortBy>
  items: IMergerComponent<Item, ItemFilters, ItemSortBy>
  mints: IMergerComponent<Mint, MintFilters, MintSortBy>
  sales: IMergerComponent<Sale, SaleFilters, SaleSortBy>
  trendings: ITrendingsComponent
  collections: IMergerComponent<Collection, CollectionFilters, CollectionSortBy>
  collectionsSubgraph: ISubgraphComponent
  marketplaceSubgraph: ISubgraphComponent
  accounts: IMergerComponent<Account, AccountFilters, AccountSortBy>
  rankings: IItemsDayDataComponent
  volumes: IVolumeComponent
  analyticsData: IMergerComponent<
    AnalyticsDayData,
    AnalyticsDayDataFilters,
    AnalyticsDayDataSortBy
  >
}

export type Context<Path extends string = any> = RoutedContext<
  GlobalContext,
  Path
>

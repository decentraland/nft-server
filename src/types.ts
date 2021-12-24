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
import { IMergerComponent } from './ports/merger/types'
import { NFTResult } from './ports/nfts/types'
import { IRequestSessionComponent } from './ports/requestSession/types'

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
  collections: IMergerComponent<Collection, CollectionFilters, CollectionSortBy>
  accounts: IMergerComponent<Account, AccountFilters, AccountSortBy>
}

export type Context<Path extends string = any> = RoutedContext<
  GlobalContext,
  Path
>

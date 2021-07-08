import { RoutedContext } from '@well-known-components/http-server'
import type {
  IConfigComponent,
  ILoggerComponent,
  IHttpServerComponent,
  IMetricsComponent,
  IBaseComponent,
} from '@well-known-components/interfaces'
import { IMergerComponent } from './ports/merger/types'
import { Bid, BidFilters, BidSortBy } from './ports/bids/types'
import { Order, OrderFilters, OrderSortBy } from './ports/orders/types'
import {
  Contract,
  ContractFilters,
  ContractSortBy,
} from './ports/contracts/types'
import { NFTFilters, NFTResult, NFTSortBy } from './ports/nfts/types'

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
  server: IHttpServerComponent<GlobalContext>
  statusChecks: IBaseComponent
  metrics: IMetricsComponent<any>
  orders: IMergerComponent<Order, OrderFilters, OrderSortBy>
  bids: IMergerComponent<Bid, BidFilters, BidSortBy>
  contracts: IMergerComponent<Contract, ContractFilters, ContractSortBy>
  nfts: IMergerComponent<NFTResult, NFTFilters, NFTSortBy>
}

export type Context<Path extends string = any> = RoutedContext<
  GlobalContext,
  Path
>

import { RoutedContext } from '@well-known-components/http-server'
import type {
  IConfigComponent,
  ILoggerComponent,
  IHttpServerComponent,
  IMetricsComponent,
  IBaseComponent,
} from '@well-known-components/interfaces'
import { IBrowseComponent, NFTResult } from './ports/browse/types'
import { ISubgraphComponent } from './ports/subgraph/types'
import { IMergerComponent } from './ports/merger/types'
import { Bid, BidOptions, BidSortBy } from './ports/bids/types'
import { Order, OrderOptions, OrderSortBy } from './ports/orders/types'
import {
  Contract,
  ContractOptions,
  ContractSortBy,
} from './ports/contracts/types'
import { NFTOptions, NFTSortBy } from './ports/nfts/types'

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
  marketplaceSubgraph: ISubgraphComponent
  collectionsSubgraph: ISubgraphComponent
  browse: IBrowseComponent
  orders: IMergerComponent<Order, OrderOptions, OrderSortBy>
  bids: IMergerComponent<Bid, BidOptions, BidSortBy>
  contracts: IMergerComponent<Contract, ContractOptions, ContractSortBy>
  nfts: IMergerComponent<NFTResult, NFTOptions, NFTSortBy>
}

export type Context<Path extends string = any> = RoutedContext<
  GlobalContext,
  Path
>

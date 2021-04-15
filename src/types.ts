import { RoutedContext } from '@well-known-components/http-server'
import type {
  IConfigComponent,
  ILoggerComponent,
  IHttpServerComponent,
} from '@well-known-components/interfaces'
import { IBidsComponent } from './ports/bids/types'
import { IBrowseComponent } from './ports/browse/types'
import { ISubgraphComponent } from './ports/subgraph/types'

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
  marketplaceSubgraph: ISubgraphComponent
  collectionsSubgraph: ISubgraphComponent
  browse: IBrowseComponent
  bids: IBidsComponent
}

export type Context<Path extends string = any> = RoutedContext<
  GlobalContext,
  Path
>

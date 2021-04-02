import { NFT, Options, Order } from '../nft-source/types'
import { ISubgraphComponent } from '../subgraph/types'

export type BrowseResult = {
  nfts: NFT[]
  orders: Order[]
  total: number
}

export interface IBrowseComponent {
  fetch: (options: Options) => Promise<BrowseResult>
}

export type BrowseComponents = {
  marketplaceSubgraph: ISubgraphComponent
  collectionsSubgraph: ISubgraphComponent
}

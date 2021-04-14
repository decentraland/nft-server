import { Collection, NFT, Options, Order } from '../source/types'
import { ISubgraphComponent } from '../subgraph/types'

export type BrowseResult = {
  nfts: NFT[]
  orders: Order[]
  total: number
}

export interface IBrowseComponent {
  fetch: (options: Options) => Promise<BrowseResult>
  nft: (contractAddress: string, tokenId: string) => Promise<NFT | null>
  collections: () => Promise<Collection[]>
}

export type BrowseComponents = {
  marketplaceSubgraph: ISubgraphComponent
  collectionsSubgraph: ISubgraphComponent
}

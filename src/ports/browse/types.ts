import { Collection, NFT, FetchOptions, Order } from '../source/types'
import { ISubgraphComponent } from '../subgraph/types'

export type BrowseResult = {
  nfts: NFT[]
  orders: Order[]
  total: number
}

export type NFTResult = {
  nft: NFT
  order: Order | null
}

export interface IBrowseComponent {
  fetch: (options: FetchOptions) => Promise<BrowseResult>
  nft: (contractAddress: string, tokenId: string) => Promise<NFTResult | null>
  history: (contractAddress: string, tokenId: string) => Promise<Order[]>
  collections: () => Promise<Collection[]>
}

export type BrowseComponents = {
  marketplaceSubgraph: ISubgraphComponent
  collectionsSubgraph: ISubgraphComponent
}

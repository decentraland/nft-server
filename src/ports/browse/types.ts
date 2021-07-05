import { Order } from '../orders/types'
import { Contract, NFT, Options } from '../source/types'
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
  fetch: (options: Options) => Promise<BrowseResult>
  getNFT: (
    contractAddress: string,
    tokenId: string
  ) => Promise<NFTResult | null>
  getContracts: () => Promise<Contract[]>
}

export type BrowseComponents = {
  marketplaceSubgraph: ISubgraphComponent
  collectionsSubgraph: ISubgraphComponent
}

import { INFTSourceComponent, NFT, NFTOptions } from '../nft-source/types'

export interface INFTAggregatorComponent {
  fetch(options: NFTOptions): Promise<NFT[]>
}
export type NFTAggregatorOptions = {
  sources: INFTSourceComponent[]
}

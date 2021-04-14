import {
  Collection,
  ISourceComponent,
  NFT,
  Options,
  SourceResult,
} from '../source/types'

export interface IAggregatorComponent {
  fetch(options: Options): Promise<SourceResult[]>
  count(options: Options): Promise<number>
  nft(contractAddress: string, tokenId: string): Promise<NFT | null>
  collections: () => Promise<Collection[]>
}
export type AggregatorOptions = {
  sources: ISourceComponent[]
}

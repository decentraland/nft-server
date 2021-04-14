import {
  Collection,
  ISourceComponent,
  Options,
  Order,
  SourceResult,
} from '../source/types'

export interface IAggregatorComponent {
  fetch(options: Options): Promise<SourceResult[]>
  count(options: Options): Promise<number>
  nft(contractAddress: string, tokenId: string): Promise<SourceResult | null>
  history(contractAddress: string, tokenId: string): Promise<Order[]>
  collections: () => Promise<Collection[]>
}
export type AggregatorOptions = {
  sources: ISourceComponent[]
}

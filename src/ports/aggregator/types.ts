import {
  Collection,
  ISourceComponent,
  FetchOptions,
  Order,
  SourceResult,
} from '../source/types'

export interface IAggregatorComponent {
  fetch(options: FetchOptions): Promise<SourceResult[]>
  count(options: FetchOptions): Promise<number>
  nft(contractAddress: string, tokenId: string): Promise<SourceResult | null>
  history(contractAddress: string, tokenId: string): Promise<Order[]>
  collections: () => Promise<Collection[]>
}
export type AggregatorOptions = {
  sources: ISourceComponent[]
}

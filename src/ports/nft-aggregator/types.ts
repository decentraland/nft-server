import {
  Collection,
  ISourceComponent,
  Options,
  SourceResult,
} from '../nft-source/types'

export interface IAggregatorComponent {
  fetch(options: Options): Promise<SourceResult[]>
  count(options: Options): Promise<number>
  collections: () => Promise<Collection[]>
}
export type AggregatorOptions = {
  sources: ISourceComponent[]
}

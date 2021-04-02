import { ISourceComponent, Options, SourceResult } from '../nft-source/types'

export interface IAggregatorComponent {
  fetch(options: Options): Promise<SourceResult[]>
  count(options: Options): Promise<number>
}
export type AggregatorOptions = {
  sources: ISourceComponent[]
}

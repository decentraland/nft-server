import {
  Contract,
  ISourceComponent,
  Options,
  Order,
  Result,
} from '../source/types'

export interface IAggregatorComponent {
  fetch(options: Options): Promise<Result[]>
  count(options: Options): Promise<number>
  getNFT(contractAddress: string, tokenId: string): Promise<Result | null>
  getHistory(contractAddress: string, tokenId: string): Promise<Order[]>
  getContracts: () => Promise<Contract[]>
}
export type AggregatorOptions = {
  sources: ISourceComponent[]
}

import { DocumentNode } from 'graphql'
import { ISubgraphComponent } from '../../subgraph/types'
import { NFTOptions, SortableNFT, SortBy } from '../types'

export interface INFTSourceComponent {
  fetch(options: NFTOptions): Promise<SortableNFT[]>
}

export type NFTSourceOptions<T> = {
  subgraph: ISubgraphComponent
  getQuery(options: NFTOptions, isCount?: boolean): DocumentNode
  getOrderBy(sortBy?: SortBy | undefined): string
  fromFragment(fragment: T): SortableNFT
}

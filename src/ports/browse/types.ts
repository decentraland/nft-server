import { INFTAggregatorComponent } from '../nft-aggregator/types'
import { ISubgraphComponent } from '../subgraph/types'

export interface IBrowseComponent extends INFTAggregatorComponent {}

export type BrowseComponents = {
  marketplaceSubgraph: ISubgraphComponent
  collectionsSubgraph: ISubgraphComponent
}

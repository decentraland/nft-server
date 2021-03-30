import { AppComponents } from '../../types'
import { INFTAggregatorComponent } from '../nft-aggregator/types'

export interface IBrowseComponent extends INFTAggregatorComponent {}

export type BrowseComponents = Pick<
  AppComponents,
  'marketplaceSubgraph' | 'collectionsSubgraph'
>

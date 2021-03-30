import { createNFTAggregatorComponent } from '../nft-aggregator/component'
import { createNFTSourceComponent } from '../nft-source/component'
import {
  fromFragment as fromCollectionsFragment,
  getQuery as getCollectionsQuery,
  getOrderBy as getCollectionsOrderBy,
} from './sources/collections/utils'
import {
  fromFragment as fromMarketplaceFragment,
  getQuery as getMarketplaceQuery,
  getOrderBy as getMarketplaceOrderBy,
} from './sources/marketplace/utils'
import { BrowseComponents } from './types'

export function createBrowseComponent(components: BrowseComponents) {
  const { collectionsSubgraph, marketplaceSubgraph } = components

  const collectionsSource = createNFTSourceComponent({
    subgraph: collectionsSubgraph,
    getQuery: getCollectionsQuery,
    getOrderBy: getCollectionsOrderBy,
    fromFragment: fromCollectionsFragment,
  })
  const marketplaceSource = createNFTSourceComponent({
    subgraph: marketplaceSubgraph,
    getQuery: getMarketplaceQuery,
    getOrderBy: getMarketplaceOrderBy,
    fromFragment: fromMarketplaceFragment,
  })

  return createNFTAggregatorComponent({
    sources: [marketplaceSource, collectionsSource],
  })
}

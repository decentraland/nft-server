import { createNFTAggregatorComponent } from '../nft-aggregator/component'
import { createNFTSourceComponent } from '../nft-source/component'
import {
  getCollectionsFragment,
  fromCollectionsFragment,
  getCollectionsOrderBy,
} from './sources/collections'
import {
  fromMarketplaceFragment,
  getMarketplaceFragment,
  getMarketplaceOrderBy,
} from './sources/marketplace'
import { BrowseComponents } from './types'

export function createBrowseComponent(components: BrowseComponents) {
  const { collectionsSubgraph, marketplaceSubgraph } = components

  const collectionsSource = createNFTSourceComponent({
    subgraph: collectionsSubgraph,
    fragmentName: 'collectionsFragment',
    getFragment: getCollectionsFragment,
    fromFragment: fromCollectionsFragment,
    getOrderBy: getCollectionsOrderBy,
  })

  const marketplaceSource = createNFTSourceComponent({
    subgraph: marketplaceSubgraph,
    fragmentName: 'marketplaceFragment',
    getFragment: getMarketplaceFragment,
    fromFragment: fromMarketplaceFragment,
    getOrderBy: getMarketplaceOrderBy,
    getExtraVariables: () => [`$category: Category`],
    getExtraWhere: () => [
      'searchEstateSize_gt: 0',
      'searchParcelIsInBounds: true',
      'category: $category',
    ],
  })

  return createNFTAggregatorComponent({
    sources: [collectionsSource, marketplaceSource],
  })
}

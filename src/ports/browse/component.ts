import { createNFTAggregatorComponent } from '../nft-aggregator/component'
import { createNFTSourceComponent } from '../nft-source/component'
import { NFT, Options, Order } from '../nft-source/types'
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
import { BrowseComponents, IBrowseComponent } from './types'

export function createBrowseComponent(
  components: BrowseComponents
): IBrowseComponent {
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

  const aggregator = createNFTAggregatorComponent({
    sources: [collectionsSource, marketplaceSource],
  })

  return {
    async fetch(options: Options) {
      const [results, total] = await Promise.all([
        aggregator.fetch(options),
        aggregator.count(options),
      ])
      const nfts: NFT[] = []
      const orders: Order[] = []
      for (const result of results) {
        nfts.push(result.nft)
        if (result.order) {
          orders.push(result.order)
        }
      }

      return {
        nfts,
        orders,
        total,
      }
    },
  }
}

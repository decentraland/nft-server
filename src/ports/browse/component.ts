import { Network } from '@dcl/schemas'
import { createNFTAggregatorComponent } from '../nft-aggregator/component'
import { createNFTSourceComponent } from '../nft-source/component'
import {
  NFT,
  NFTCategory,
  Options,
  Order,
  WearableGender,
} from '../nft-source/types'
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
    check: (options) => {
      if (options.isLand) {
        return false
      } else if (
        options.category &&
        options.category !== NFTCategory.WEARABLE
      ) {
        return false
      } else if (options.network && options.network !== Network.MATIC) {
        return false
      } else {
        return true
      }
    },
    subgraph: collectionsSubgraph,
    fragmentName: 'collectionsFragment',
    getFragment: getCollectionsFragment,
    fromFragment: fromCollectionsFragment,
    getOrderBy: getCollectionsOrderBy,
    getExtraWhere: (options) => {
      const extraWhere: string[] = []
      if (options.wearableGenders && options.wearableGenders.length > 0) {
        const hasMale = options.wearableGenders.includes(WearableGender.MALE)
        const hasFemale = options.wearableGenders.includes(
          WearableGender.FEMALE
        )

        if (hasMale && !hasFemale) {
          extraWhere.push(`searchWearableBodyShapes: ["BaseMale"]`)
        } else if (hasFemale && !hasMale) {
          extraWhere.push(`searchWearableBodyShapes: ["BaseFemale"]`)
        } else if (hasMale && hasFemale) {
          extraWhere.push(
            `searchWearableBodyShapes_contains: ["BaseMale", "BaseFemale"]`
          )
        }
      }
      return extraWhere
    },
  })

  const marketplaceSource = createNFTSourceComponent({
    check: (options) => {
      if (options.network && options.network !== Network.ETHEREUM) {
        return false
      } else {
        return true
      }
    },
    subgraph: marketplaceSubgraph,
    fragmentName: 'marketplaceFragment',
    getFragment: getMarketplaceFragment,
    fromFragment: fromMarketplaceFragment,
    getOrderBy: getMarketplaceOrderBy,
    getExtraVariables: (options) => {
      const extraVariables: string[] = []
      if (options.category) {
        extraVariables.push('$category: Category')
      }
      return extraVariables
    },
    getExtraWhere: (options) => {
      const extraWhere = [
        'searchEstateSize_gt: 0',
        'searchParcelIsInBounds: true',
      ]
      if (options.category) {
        extraWhere.push('category: $category')
      }
      if (options.isLand) {
        extraWhere.push('searchIsLand: true')
      }
      if (options.wearableGenders && options.wearableGenders.length > 0) {
        const hasMale = options.wearableGenders.includes(WearableGender.MALE)
        const hasFemale = options.wearableGenders.includes(
          WearableGender.FEMALE
        )

        if (hasMale && !hasFemale) {
          extraWhere.push(`searchWearableBodyShapes: [BaseMale]`)
        } else if (hasFemale && !hasMale) {
          extraWhere.push(`searchWearableBodyShapes: [BaseFemale]`)
        } else if (hasMale && hasFemale) {
          extraWhere.push(
            `searchWearableBodyShapes_contains: [BaseMale, BaseFemale]`
          )
        }
      }
      return extraWhere
    },
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

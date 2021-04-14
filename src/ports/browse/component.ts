import { Network } from '@dcl/schemas'
import { createAggregatorComponent } from '../aggregator/component'
import { createSourceComponent } from '../source/component'
import {
  NFT,
  NFTCategory,
  Options,
  Order,
  WearableGender,
} from '../source/types'
import {
  getCollectionsFragment,
  fromCollectionsFragment,
  getCollectionsOrderBy,
  getCollections,
} from './sources/collections'
import {
  fromMarketplaceFragment,
  getMarketplaceFragment,
  getMarketplaceOrderBy,
  getLegacyCollections,
} from './sources/marketplace'
import { BrowseComponents, IBrowseComponent } from './types'

export function createBrowseComponent(
  components: BrowseComponents
): IBrowseComponent {
  const { collectionsSubgraph, marketplaceSubgraph } = components

  const collectionsSource = createSourceComponent({
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
    getCollections: (subgraph) => getCollections(subgraph, Network.MATIC),
  })

  const marketplaceSource = createSourceComponent({
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
    getCollections: getLegacyCollections,
  })

  const aggregator = createAggregatorComponent({
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
    nft: async (contractAddress: string, tokenId: string) => {
      const nft = aggregator.nft(contractAddress, tokenId)
      return nft
    },
    collections: async () => {
      const collections = await aggregator.collections()
      return collections
    },
  }
}

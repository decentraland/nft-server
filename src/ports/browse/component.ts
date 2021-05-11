import { Network } from '@dcl/schemas'
import { createAggregatorComponent } from '../aggregator/component'
import { createSourceComponent } from '../source/component'
import { NFT, NFTCategory, Options, Order } from '../source/types'
import {
  getCollectionsFragment,
  fromCollectionsFragment,
  getCollectionsOrderBy,
  getCollectionsContracts,
} from './sources/collections'
import {
  fromMarketplaceFragment,
  getMarketplaceFragment,
  getMarketplaceOrderBy,
  getMarketplaceContracts,
} from './sources/marketplace'
import { BrowseComponents, IBrowseComponent } from './types'

export function createBrowseComponent(
  components: BrowseComponents
): IBrowseComponent {
  const { collectionsSubgraph, marketplaceSubgraph } = components

  const collectionsSource = createSourceComponent({
    hasResults: (options) => {
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
    getSortByProp: getCollectionsOrderBy,
    getContracts: (subgraph) => getCollectionsContracts(subgraph),
  })

  const marketplaceSource = createSourceComponent({
    hasResults: (options) => {
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
    getSortByProp: getMarketplaceOrderBy,
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
      return extraWhere
    },
    getContracts: getMarketplaceContracts,
  })

  const aggregator = createAggregatorComponent({
    sources: [collectionsSource, marketplaceSource],
  })

  async function fetch(options: Options) {
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
  }

  async function getNFT(contractAddress: string, tokenId: string) {
    const result = await aggregator.getNFT(contractAddress, tokenId)
    return result ? { nft: result.nft, order: result.order } : null
  }

  async function getHistory(contractAddress: string, tokenId: string) {
    const result = await aggregator.getHistory(contractAddress, tokenId)
    return result
  }

  async function getContracts() {
    const contracts = await aggregator.getContracts()
    return contracts
  }

  return {
    fetch,
    getNFT,
    getHistory,
    getContracts,
  }
}

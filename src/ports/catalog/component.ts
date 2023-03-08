import {
  CatalogFilters,
  CatalogItem,
  CatalogParams,
  ICatalogComponent,
} from './types'
import { getBuiltGraphSDK } from '../../../.graphclient'
import {
  fromCatalogSortToQuerySort,
  fromQueryResultToCatalogLegacyItems,
  fromQueryToCatalogItems,
} from './utils'

// const data = await GetNFTs({
//   first: 1000,
//   owner: '0x68ffc53c43c65c8dd778969320e21b85b10363ce',
// })
// console.log('data: ', JSON.stringify(data))
// console.log('data: ', data)

export function createCatalogComponent(): ICatalogComponent {
  function isValid(filters: CatalogParams) {
    return true
  }

  async function fetch(params: CatalogParams, filters: CatalogFilters) {
    if (!isValid(params)) {
      return []
    }
    const { isOnSale, network } = filters
    let available = undefined
    if (!isOnSale) {
      available = false
    }
    const { sortBy } = params

    // add rarity, only for mint, only for
    const { getLegacyNFTsCatalog, GetNFTs, GetCatalog } = getBuiltGraphSDK()
    try {
      const [items] = await Promise.all([
        // getLegacyNFTsCatalog(),
        GetCatalog({ first: 24, orderBy: fromCatalogSortToQuerySort(sortBy) }),
      ])
      console.log('items: ', items.items.length)

      const catalogItems = fromQueryToCatalogItems(items)
      console.log('catalogItems: ', catalogItems)
      // const catalogLegacyItems = fromQueryResultToCatalogLegacyItems(legacyNFTs)
      return [...catalogItems]
      // return [...catalogItems, ...catalogLegacyItems]
      // add sort + pagination
    } catch (error) {
      console.log('error: ', error)
      return []
    }
  }

  return {
    fetch,
  }
}

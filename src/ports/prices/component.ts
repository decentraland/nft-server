import { NFTCategory } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { IMergerComponent } from '../merger/types'
import {
  AssetType,
  IPricesComponent,
  IProcessedPricesComponent,
  PriceFilterExtraOption,
  PriceFilters,
  PriceFragment,
  PriceSortBy,
} from './types'
import { consolidatePrices, getPricesQuery, MAX_RESULTS } from './utils'

export function createPricesComponent(options: {
  subgraph: ISubgraphComponent
  customValidation?: (filters: PriceFilters) => boolean
  queryGetter: (
    id: string,
    filters: PriceFilters
  ) => (filters: PriceFilters) => string
}): IPricesComponent {
  const { subgraph, queryGetter, customValidation } = options

  function isValid(filters: PriceFilters) {
    const { category, assetType } = filters
    const isValidAssetType =
      !assetType || [AssetType.ITEM, AssetType.NFT].includes(assetType)

    const isValidCategory =
      category === PriceFilterExtraOption.LAND || NFTCategory.validate(category)

    return isValidAssetType && isValidCategory
  }

  async function fetch(filters: PriceFilters) {
    if (!isValid(filters) || (customValidation && !customValidation(filters))) {
      return []
    }

    let lastId = ''
    let priceFragments: PriceFragment[] = []
    while (true) {
      const query = getPricesQuery(queryGetter, filters, lastId)
      const queryVariables = {
        ...filters,
        lastId,
        expiresAt: Date.now().toString(),
      }
      const { prices: fragments } = await subgraph.query<{
        prices: PriceFragment[]
      }>(query, queryVariables)

      priceFragments = [...priceFragments, ...fragments]
      lastId = priceFragments[priceFragments.length - 1]?.id
      if (fragments.length < MAX_RESULTS) {
        break
      }
    }

    return priceFragments
  }

  return {
    fetch,
    count: () => Promise.resolve(0), // we won't need the `count` for now, but it's required by the Merger interface
  }
}

export function createProcessedPricesComponent(
  priceComponent: IMergerComponent<PriceFragment, PriceFilters, PriceSortBy>
): IProcessedPricesComponent {
  async function fetch(filters: PriceFilters) {
    const mergedResults = await priceComponent.fetch({
      ...filters,
      first: 0, // so we get all the results
    })
    return consolidatePrices(mergedResults)
  }

  return {
    fetch,
  }
}

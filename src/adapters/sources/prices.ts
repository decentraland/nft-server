import { convertPriceFragmentToSortableResult } from '../../logic/prices'
import { FetchOptions, IMergerComponent } from '../../ports/merger/types'
import {
  IPricesComponent,
  PriceFilters,
  PriceFragment,
  PriceSortBy,
} from '../../ports/prices/types'

export function createPricesSource(
  prices: IPricesComponent,
  options: {
    shouldFetch: (filters: PriceFilters) => boolean
  }
): IMergerComponent.Source<PriceFragment, PriceFilters, PriceSortBy> {
  async function fetch(filters: FetchOptions<PriceFilters, PriceSortBy>) {
    if (!options.shouldFetch(filters)) {
      return []
    }
    const results = await prices.fetch(filters)
    return results.map(convertPriceFragmentToSortableResult)
  }

  async function count(filters: FetchOptions<PriceFilters, PriceSortBy>) {
    const total = await prices.count(filters)
    return total
  }

  return {
    fetch,
    count,
  }
}

import { Sale, SaleFilters, SaleSortBy } from '@dcl/schemas'
import { FetchOptions, IMergerComponent } from '../../ports/merger/types'
import { ISalesComponent } from '../../ports/sales/types'

export function createSalesSource(
  mints: ISalesComponent
): IMergerComponent.Source<Sale, SaleFilters, SaleSortBy> {
  async function fetch(filters: FetchOptions<SaleFilters, SaleSortBy>) {
    const results = await mints.fetch(filters)
    return results.map((result) => ({
      result,
      sort: {
        [SaleSortBy.RECENTLY_SOLD]: result.timestamp,
        [SaleSortBy.MOST_EXPENSIVE]: +result.price,
      },
    }))
  }

  async function count(filters: FetchOptions<SaleFilters, SaleSortBy>) {
    const total = await mints.count(filters)
    return total
  }

  return {
    fetch,
    count,
  }
}

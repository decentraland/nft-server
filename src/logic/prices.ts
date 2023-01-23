import { Sortable } from '../ports/merger/types'
import { PriceFragment, PriceSortBy } from '../ports/prices/types'

export function convertPriceFragmentToSortableResult(
  priceFragment: PriceFragment
): Sortable<PriceFragment, PriceSortBy> {
  return {
    result: priceFragment,
    sort: {
      [PriceSortBy.PRICE]: null,
    },
  }
}

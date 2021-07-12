import {
  IItemsComponent,
  Item,
  ItemFilters,
  ItemSortBy,
} from '../../ports/items/types'
import { FetchOptions, Source } from '../../ports/merger/types'

export function createItemsSource(
  items: IItemsComponent
): Source<Item, ItemFilters, ItemSortBy> {
  async function fetch(filters: FetchOptions<ItemFilters, ItemSortBy>) {
    const results = await items.fetch(filters)
    return results.map((result) => ({
      result,
      sort: {
        [ItemSortBy.NEWEST]: result.createdAt,
        [ItemSortBy.NAME]: result.name,
        [ItemSortBy.CHEAPEST]: result.available > 0 ? +result.price : null,
      },
    }))
  }

  async function count(filters: FetchOptions<ItemFilters, ItemSortBy>) {
    const total = await items.count(filters)
    return total
  }

  return {
    fetch,
    count,
  }
}

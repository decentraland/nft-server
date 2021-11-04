import { Item } from '@dcl/schemas'
import { FetchOptions, IMergerComponent } from '../../ports/merger/types'
import {
  IItemsComponent,
  ItemFilters,
  ItemSortBy,
} from '../../ports/items/types'

export function createItemsSource(
  items: IItemsComponent
): IMergerComponent.Source<Item, ItemFilters, ItemSortBy> {
  async function fetch(filters: FetchOptions<ItemFilters, ItemSortBy>) {
    const results = await items.fetch(filters)
    return results.map((result) => ({
      result,
      sort: {
        [ItemSortBy.NEWEST]: result.createdAt,
        [ItemSortBy.RECENTLY_REVIEWED]: result.reviewedAt,
        //@ts-ignore
        [ItemSortBy.RECENTLY_SOLD]: result.soldAt,
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

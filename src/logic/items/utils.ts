import { Item, ItemSortBy } from '@dcl/schemas'
import { Sortable } from '../../ports/merger/types'

export function convertItemToSortableResult(
  result: Item
): Sortable<Item, ItemSortBy> {
  return {
    result,
    sort: {
      [ItemSortBy.NEWEST]: result.createdAt,
      [ItemSortBy.RECENTLY_REVIEWED]: result.reviewedAt,
      //@ts-ignore
      [ItemSortBy.RECENTLY_SOLD]: result.soldAt,
      [ItemSortBy.NAME]: result.name,
      [ItemSortBy.CHEAPEST]: result.available > 0 ? +result.price : null,
      [ItemSortBy.RECENTLY_LISTED]: result.firstListedAt,
    },
  }
}

import { Item, ItemFilters, ItemSortBy } from '@dcl/schemas'
import { FetchOptions, IMergerComponent } from '../../ports/merger/types'
import { IItemsComponent, ItemOptions } from '../../ports/items/types'
import { IFavoritesComponent } from '../../ports/favorites/types'
import { enhanceItemsWithPicksStats } from '../../logic/favorites/utils'
import { convertItemToSortableResult } from '../../logic/items/utils'

export function createItemsSource(
  components: {
    itemsComponent: IItemsComponent
    favoritesComponent: IFavoritesComponent
  },
  options?: {
    isFavoritesEnabled?: boolean
  }
): IMergerComponent.Source<Item, ItemFilters, ItemSortBy> {
  const { itemsComponent, favoritesComponent } = components

  async function fetch({
    pickedBy,
    ...filters
  }: FetchOptions<ItemOptions, ItemSortBy>) {
    let items = await itemsComponent.fetch(filters)

    if (options && options.isFavoritesEnabled) {
      const picksStats = await favoritesComponent.getPicksStatsOfItems(
        items.map(({ id }) => id),
        pickedBy
      )

      items = await enhanceItemsWithPicksStats(items, picksStats)
    }

    return items.map(convertItemToSortableResult)
  }

  async function count(filters: FetchOptions<ItemFilters, ItemSortBy>) {
    const total = await itemsComponent.count(filters)
    return total
  }

  return {
    fetch,
    count,
  }
}

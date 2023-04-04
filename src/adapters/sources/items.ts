import { Item, ItemFilters, ItemSortBy } from '@dcl/schemas'
import { FetchOptions, IMergerComponent } from '../../ports/merger/types'
import { IItemsComponent } from '../../ports/items/types'
import { IFavoritesComponent, PickStats } from '../../ports/favorites/types'

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

  async function enhanceItemsWithPicksStats(
    items: Item[],
    pickedBy?: string
  ): Promise<Item[]> {
    const picksStats = await favoritesComponent.getPicksStatsOfItems(
      items.map((itemId) => itemId.id),
      pickedBy
    )

    const picksStatsByItemId: Record<string, PickStats> = picksStats.reduce(
      (acc, pickStats) => {
        acc[pickStats.itemId] = pickStats
        return acc
      },
      {} as Record<string, PickStats>
    )

    return items.map((itemResult) => ({
      ...itemResult,
      picks: picksStatsByItemId[itemResult.id] ?? null,
    }))
  }

  async function fetch({
    pickedBy,
    ...filters
  }: FetchOptions<ItemFilters & { pickedBy?: string }, ItemSortBy>) {
    let results = await itemsComponent.fetch(filters)

    if (options && options.isFavoritesEnabled) {
      results = await enhanceItemsWithPicksStats(results, pickedBy)
    }

    return results.map((result) => ({
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
    }))
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

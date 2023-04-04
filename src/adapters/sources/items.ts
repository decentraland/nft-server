import { Item, ItemFilters, ItemSortBy } from '@dcl/schemas'
import { FetchOptions, IMergerComponent } from '../../ports/merger/types'
import { IItemsComponent } from '../../ports/items/types'
import { IFavoritesComponent, PickStats } from '../../ports/favorites/types'

export function createItemsSource(
  items: IItemsComponent,
  options?: {
    favorites?: IFavoritesComponent
    isFavoritesEnabled?: boolean
  }
): IMergerComponent.Source<Item, ItemFilters, ItemSortBy> {
  async function enhanceItemsWithPicksStats(
    filters: FetchOptions<ItemFilters, ItemSortBy>
  ): Promise<Item[]> {
    const results = await items.fetch(filters)

    if (!options || !options.favorites || !options.isFavoritesEnabled) {
      return results
    }

    const picksStats = await options.favorites.getPicksStatsOfItems(
      results.map((result) => result.id),
      '???'
    )

    const picksStatsByItemId: Record<string, PickStats> = picksStats.reduce(
      (acc, pickStats) => {
        return {
          ...acc,
          [pickStats.itemId]: pickStats,
        }
      },
      {}
    )

    return results.map((itemResult) => ({
      ...itemResult,
      favorites: picksStatsByItemId[itemResult.id] ?? null,
    }))
  }

  async function fetch(filters: FetchOptions<ItemFilters, ItemSortBy>) {
    await enhanceItemsWithPicksStats(filters)
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
        [ItemSortBy.RECENTLY_LISTED]: result.firstListedAt,
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

import { Item } from '@dcl/schemas'
import { IFavoritesComponent, PickStats } from '../../ports/favorites/types'

export async function enhanceItemsWithPicksStats(
  favoritesComponent: IFavoritesComponent,
  items: Item[],
  pickedBy?: string
): Promise<Item[]> {
  const picksStats = await favoritesComponent.getPicksStatsOfItems(
    items.map(({ id }) => id),
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

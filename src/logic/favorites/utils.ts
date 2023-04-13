import { Item } from '@dcl/schemas'
import { PickStats } from '../../ports/favorites/types'

export function enhanceItemsWithPicksStats<
  T extends Pick<Item, 'id' | 'picks'>
>(items: T[], picksStats: PickStats[]): T[] {
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

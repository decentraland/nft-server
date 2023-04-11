import { Item } from '@dcl/schemas'
import { PickStats } from '../../ports/favorites/types'
import { enhanceItemsWithPicksStats } from '../../logic/favorites/utils'

describe('when enhancing items with their picks stats', () => {
  let items: Item[]
  let picksStats: PickStats[]

  beforeEach(async () => {
    items = Array.from(
      { length: 2 },
      (_, i) =>
        ({
          id: `0x0-${i.toString()}`,
          name: `item-name-${i}`,
          contractAddress: '0x0',
          itemId: i.toString(),
        } as Item)
    )
    picksStats = items.map(
      (item, i) =>
        ({
          itemId: item.id,
          pickedByUser: i > 0,
          count: i,
        } as PickStats)
    )
  })

  it.only('should merge each pick stats in its correspondent item', () => {
    expect(enhanceItemsWithPicksStats(items, picksStats)).resolves.toEqual(
      items.map((item) => ({
        ...item,
        picks: picksStats.find((pickStats) => pickStats.itemId === item.id),
      }))
    )
  })
})

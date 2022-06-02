import BN from 'bn.js'
import { ItemsDayDataFragment, RankingItem } from '../ports/rankings/types'

export function getUniqueItemsFromItemsDayData(
  itemDayDataFragments: ItemsDayDataFragment[]
) {
  return itemDayDataFragments.reduce((acc, itemDayData) => {
    // if we're querying the total, we don't need to parse the itemId out of the fragment
    const itemId = itemDayData.id.slice(itemDayData.id.indexOf('-') + 1)
    const rankingItem = acc[itemId]
    if (rankingItem) {
      rankingItem.sales += itemDayData.sales
      rankingItem.volume = new BN(rankingItem.volume)
        .add(new BN(itemDayData.volume))
        .toString()
    } else {
      acc[itemId] = {
        id: itemId,
        sales: itemDayData.sales,
        volume: itemDayData.volume,
      }
    }
    return acc
  }, {} as Record<string, RankingItem>)
}

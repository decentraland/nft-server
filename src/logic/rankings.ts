import BN from 'bn.js'
import {
  CollectorRank,
  CollectorsDayDataFragment,
  CreatorRank,
  CreatorsDayDataFragment,
  ItemsDayDataFragment,
  RankingsFilters,
} from '../ports/rankings/types'

export function getUniqueItemsFromItemsDayData(
  itemDayDataFragments: ItemsDayDataFragment[],
  filters: RankingsFilters
) {
  return itemDayDataFragments.reduce((acc, itemDayData) => {
    // if we're querying the total, we don't need to parse the itemId out of the fragment
    const itemId =
      filters.from === 0
        ? itemDayData.id
        : itemDayData.id.slice(itemDayData.id.indexOf('-') + 1)
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
  }, {} as Record<string, ItemsDayDataFragment>)
}

export function getUniqueCreatorsFromCreatorsDayData(
  creatorsDayDataFragments: CreatorsDayDataFragment[]
) {
  const accumulated = creatorsDayDataFragments.reduce((acc, creatorDayData) => {
    // if we're querying the total, we don't need to parse the itemId out of the fragment
    const creatorAddress =
      creatorDayData.id.indexOf('-') > -1
        ? creatorDayData.id.split('-')[1]
        : creatorDayData.id

    const rankingCreator = acc[creatorAddress]
    if (rankingCreator) {
      rankingCreator.collections += creatorDayData.collections
      rankingCreator.sales += creatorDayData.sales
      rankingCreator.volume = new BN(rankingCreator.volume)
        .add(new BN(creatorDayData.volume))
        .toString()
      rankingCreator.uniqueCollectors = [
        ...new Set([
          ...rankingCreator.uniqueCollectors,
          ...creatorDayData.uniqueCollectors,
        ]),
      ]
    } else {
      acc[creatorAddress] = { ...creatorDayData, id: creatorAddress }
    }
    return acc
  }, {} as Record<string, CreatorsDayDataFragment>)

  return Object.values(accumulated).reduce((acc, creatorDayData) => {
    const creatorsAddress = creatorDayData.id
    acc[creatorsAddress] = {
      ...creatorDayData,
      uniqueCollectors: creatorDayData.uniqueCollectors.length,
    }
    return acc
  }, {} as Record<string, CreatorRank>)
}

export function getUniqueCollectorsFromCollectorsDayData(
  collectorsDayDataFragments: CollectorsDayDataFragment[]
): Record<string, CollectorRank> {
  const accumulated = collectorsDayDataFragments.reduce(
    (acc, collectorDayData) => {
      // if we're querying the total, we don't need to parse the itemId out of the fragment
      const collectorAddress =
        collectorDayData.id.indexOf('-') > -1
          ? collectorDayData.id.split('-')[1]
          : collectorDayData.id
      const rankingColllector = acc[collectorAddress]
      if (rankingColllector) {
        rankingColllector.purchases += collectorDayData.purchases
        rankingColllector.creatorsSupported = [
          ...new Set([
            ...rankingColllector.creatorsSupported,
            ...collectorDayData.creatorsSupported,
          ]),
        ]
        rankingColllector.uniqueItems = [
          ...new Set([
            ...rankingColllector.uniqueItems,
            ...collectorDayData.uniqueItems,
          ]),
        ]
        rankingColllector.volume = new BN(rankingColllector.volume)
          .add(new BN(collectorDayData.volume))
          .toString()
      } else {
        acc[collectorAddress] = {
          ...collectorDayData,
          id: collectorAddress,
        }
      }
      return acc
    },
    {} as Record<string, CollectorsDayDataFragment>
  )
  return Object.values(accumulated).reduce((acc, collectorDayData) => {
    const collectorAddress = collectorDayData.id
    acc[collectorAddress] = {
      ...collectorDayData,
      uniqueItems: collectorDayData.uniqueItems.length,
      creatorsSupported: collectorDayData.creatorsSupported.length,
    }
    return acc
  }, {} as Record<string, CollectorRank>)
}

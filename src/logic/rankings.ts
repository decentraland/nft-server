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
      rankingCreator.uniqueCollectionsSales = [
        ...new Set([
          ...rankingCreator.uniqueCollectionsSales,
          ...creatorDayData.uniqueCollectionsSales,
        ]),
      ]
      rankingCreator.sales += creatorDayData.sales
      rankingCreator.earned = new BN(rankingCreator.earned)
        .add(new BN(creatorDayData.earned))
        .toString()
    } else {
      acc[creatorAddress] = { ...creatorDayData, id: creatorAddress }
    }
    return acc
  }, {} as Record<string, CreatorsDayDataFragment>)

  return Object.values(accumulated).reduce((acc, creatorDayData) => {
    const creatorsAddress = creatorDayData.id
    const { id, earned, sales, uniqueCollectorsTotal, uniqueCollectionsSales } = creatorDayData
    acc[creatorsAddress] = {
      id,
      sales,
      earned,
      uniqueCollectors: uniqueCollectorsTotal,
      collections: uniqueCollectionsSales.length,
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
        rankingColllector.spent = new BN(rankingColllector.spent)
          .add(new BN(collectorDayData.spent))
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
      uniqueAndMythicItems: collectorDayData.uniqueAndMythicItems.length,
      creatorsSupported: collectorDayData.creatorsSupportedTotal,
    }
    return acc
  }, {} as Record<string, CollectorRank>)
}

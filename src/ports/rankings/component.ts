import BN from 'bn.js'
import { Network } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import {
  IItemsDayDataComponent,
  ItemsDayDataFilters,
  ItemsDayDataFragment,
  RankingItem,
} from './types'
import { getItemsDayDataQuery, getItemsDayDataTotal } from './utils'

export function createRankingsComponent(options: {
  subgraph: ISubgraphComponent
  network: Network
}): IItemsDayDataComponent {
  const { subgraph, network } = options

  function isValid(network: Network, filters: ItemsDayDataFilters) {
    return (
      // Querying a different network to the component's one is not valid
      !filters.network || filters.network === network
    )
  }

  async function fetch(filters: ItemsDayDataFilters) {
    if (!isValid(network, filters)) {
      return []
    }

    const { from } = filters

    const query =
      from === 0 ? getItemsDayDataTotal(filters) : getItemsDayDataQuery(filters)

    const { rankings: fragments } = await subgraph.query<{
      rankings: ItemsDayDataFragment[]
    }>(query)

    const rankingItems = fragments.reduce((acc, itemDayData) => {
      // if we're querying the total, we don't need to parse the itemId out of the fragment
      const itemId =
        from === 0
          ? itemDayData.id
          : itemDayData.id.slice(itemDayData.id.indexOf('-') + 1)

      const rankingItem = acc[itemId]
      if (rankingItem) {
        rankingItem.sales += itemDayData.sales
        rankingItem.volume = new BN(rankingItem.volume)
          .add(new BN(itemDayData.sales))
          .toString()
      } else {
        acc[itemId] = {
          itemId,
          sales: itemDayData.sales,
          volume: itemDayData.volume,
        }
      }
      return acc
    }, {} as Record<string, RankingItem>)

    return Object.values(rankingItems)
  }

  async function count(filters: ItemsDayDataFilters) {
    if (!isValid(network, filters)) {
      return 0
    }

    const { from } = filters

    const query =
      from === 0 ? getItemsDayDataTotal(filters) : getItemsDayDataQuery(filters)
    const { analytics: fragments } = await subgraph.query<{
      analytics: ItemsDayDataFragment[]
    }>(query)

    return fragments.length
  }

  return {
    fetch,
    count,
  }
}

import { Network } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { getUniqueItemsFromItemsDayData } from '../../logic/rankings'
import { FetchOptions } from '../merger/types'
import {
  IItemsDayDataComponent,
  ItemsDayDataFragment,
  RankingsFilters,
  RankingsSortBy,
} from './types'
import { getItemsDayDataQuery, getItemsDayDataTotalQuery } from './utils'

export function createRankingsComponent(options: {
  subgraph: ISubgraphComponent
  network: Network
}): IItemsDayDataComponent {
  const { subgraph, network } = options

  function isValid(network: Network, filters: RankingsFilters) {
    return (
      // Querying a different network to the component's one is not valid
      !filters.network || filters.network === network
    )
  }

  async function fetch(filters: FetchOptions<RankingsFilters, RankingsSortBy>) {
    if (!isValid(network, filters)) {
      return []
    }

    const { from } = filters

    const isFetchingAllTimeResults = from === 0

    const { rankings: fragments } = await subgraph.query<{
      rankings: ItemsDayDataFragment[]
    }>(
      isFetchingAllTimeResults
        ? getItemsDayDataTotalQuery(filters)
        : getItemsDayDataQuery(filters)
    )

    const rankingItems = isFetchingAllTimeResults
      ? fragments
      : getUniqueItemsFromItemsDayData(fragments)

    return Object.values(rankingItems).slice(
      0,
      isFetchingAllTimeResults ? undefined : filters.first
    )
  }

  async function count(filters: RankingsFilters) {
    if (!isValid(network, filters)) {
      return 0
    }

    const { from } = filters
    const isFetchingAllTimeResults = from === 0

    const { analytics: fragments } = await subgraph.query<{
      analytics: ItemsDayDataFragment[]
    }>(
      isFetchingAllTimeResults
        ? getItemsDayDataTotalQuery(filters)
        : getItemsDayDataQuery(filters)
    )

    return fragments.length
  }

  return {
    fetch,
    count,
  }
}

import { Network } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { getUniqueItemsFromItemsDayData } from '../../logic/rankings'
import {
  IItemsDayDataComponent,
  ItemsDayDataFilters,
  ItemsDayDataFragment,
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

    const rankingItems =
      from === 0 ? fragments : getUniqueItemsFromItemsDayData(fragments)

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

import { Network, AnalyticsDayDataFilters } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { AnalyticsDataFragment, IAnalyticsDayDataComponent } from './types'
import { getAnalyticsDayDataQuery, getAnalyticsTotalDataQuery } from './utils'

export function createAnalyticsDayDataComponent(options: {
  subgraph: ISubgraphComponent
  network: Network
}): IAnalyticsDayDataComponent {
  const { subgraph, network } = options

  function isValid(network: Network, filters: AnalyticsDayDataFilters) {
    return (
      // Querying a different network to the component's one is not valid
      !filters.network || filters.network === network
    )
  }

  async function fetch(filters: AnalyticsDayDataFilters) {
    if (!isValid(network, filters)) {
      return []
    }

    const query =
      filters.from === 0
        ? getAnalyticsTotalDataQuery()
        : getAnalyticsDayDataQuery(filters)

    const { analytics: fragments } = await subgraph.query<{
      analytics: AnalyticsDataFragment[]
    }>(query)

    return fragments
  }

  async function count(filters: AnalyticsDayDataFilters) {
    if (!isValid(network, filters)) {
      return 0
    }

    const query =
      filters.from === 0
        ? getAnalyticsTotalDataQuery()
        : getAnalyticsDayDataQuery(filters)
    const { analytics: fragments } = await subgraph.query<{
      analytics: AnalyticsDataFragment[]
    }>(query)

    return fragments.length
  }

  return {
    fetch,
    count,
  }
}

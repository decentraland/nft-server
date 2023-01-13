import { Network, AnalyticsDayDataFilters } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { AnalyticsDataFragment, IAnalyticsDayDataComponent } from './types'

export function createAnalyticsDayDataComponent(options: {
  subgraph: ISubgraphComponent
  network: Network
  getAnalyticsDayDataQuery: (filters: AnalyticsDayDataFilters) => string
  getAnalyticsTotalDataQuery: () => string
  mapFragment: (fragment: any) => AnalyticsDataFragment
}): IAnalyticsDayDataComponent {
  const {
    subgraph,
    network,
    getAnalyticsDayDataQuery,
    getAnalyticsTotalDataQuery,
    mapFragment,
  } = options

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
      analytics: any[]
    }>(query)

    return fragments.map(mapFragment)
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
      analytics: any[]
    }>(query)

    return fragments.length
  }

  return {
    fetch,
    count,
  }
}

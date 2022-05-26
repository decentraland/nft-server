import { Network, AnalyticsDayDataFilters } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { AnalyticsDayDataFragment, IAnalyticsDayDataComponent } from './types'
import { getAnalyticsDayDataQuery } from './utils'

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

    const query = getAnalyticsDayDataQuery(filters)
    const { analyticsDayDatas: fragments } = await subgraph.query<{
      analyticsDayDatas: AnalyticsDayDataFragment[]
    }>(query)

    console.log('fragments: ', fragments)

    return fragments
  }

  async function count(filters: AnalyticsDayDataFilters) {
    if (!isValid(network, filters)) {
      return 0
    }

    const query = getAnalyticsDayDataQuery(filters)
    const { sales: fragments } = await subgraph.query<{
      sales: AnalyticsDayDataFragment[]
    }>(query)

    return fragments.length
  }

  return {
    fetch,
    count,
  }
}

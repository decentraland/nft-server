import { Network } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { VolumeFragment, IVolumeComponent, VolumeFilters } from './types'
import { getVolumeQuery } from './utils'

export function createVolumeComponent(options: {
  subgraph: ISubgraphComponent
  network: Network
}): IVolumeComponent {
  const { subgraph, network } = options

  function isValid(network: Network, filters: VolumeFilters) {
    return (
      // Querying a different network to the component's one is not valid
      !filters.network || filters.network === network
    )
  }

  async function fetch(filters: VolumeFilters) {
    if (!isValid(network, filters)) {
      return []
    }

    const query = getVolumeQuery(filters)
    const { volumeDayDatas: fragments } = await subgraph.query<{
      volumeDayDatas: VolumeFragment[]
    }>(query)

    return fragments
  }

  async function count(filters: VolumeFilters) {
    if (!isValid(network, filters)) {
      return 0
    }

    const query = getVolumeQuery(filters)
    const { sales: fragments } = await subgraph.query<{
      sales: VolumeFragment[]
    }>(query)

    return fragments.length
  }

  return {
    fetch,
    count,
  }
}

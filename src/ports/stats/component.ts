import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import {
  FetchEstateSizesQueryFragment,
  IStatsComponent,
  StatsResource,
  StatsResourceParams,
  EstateStat,
} from './types'
import { MAX_RESULTS, consolidateSizes, getEstatesSizesQuery } from './utils'

export function createStatsComponent(options: {
  subgraph: ISubgraphComponent
}): IStatsComponent {
  const { subgraph } = options

  function isValid(filters: StatsResourceParams) {
    const { resource } = filters
    return Object.values(StatsResource).includes(resource)
  }

  async function fetchEstateSizes(isOnSale?: boolean) {
    let lastId = ''
    let sizes: FetchEstateSizesQueryFragment[] = []
    while (true) {
      const query = getEstatesSizesQuery(isOnSale)
      const queryVariables = {
        lastId,
        expiresAt: Date.now().toString(),
      }
      const { nfts: fragments } = await subgraph.query<{
        nfts: FetchEstateSizesQueryFragment[]
      }>(query, queryVariables)

      sizes = [...sizes, ...fragments]
      lastId = sizes[sizes.length - 1]?.id
      if (fragments.length < MAX_RESULTS) {
        break
      }
    }
    return consolidateSizes(sizes)
  }

  async function fetch(params: StatsResourceParams) {
    if (!isValid(params)) {
      return []
    }
    const { resource, stat, isOnSale } = params
    switch (resource) {
      case StatsResource.ESTATE:
        if (stat === EstateStat.SIZE) {
          return fetchEstateSizes(isOnSale)
        }
      default:
        break
    }

    return {}
  }

  return {
    fetch,
  }
}

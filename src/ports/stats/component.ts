import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import {
  FetchEstateSizesQueryFragment,
  IStatsComponent,
  StatsCategory,
  StatsResourceParams,
  EstateStat,
  StatsResourceFilters,
} from './types'
import { MAX_RESULTS, consolidateSizes, getEstatesSizesQuery } from './utils'

export function createStatsComponent(options: {
  subgraph: ISubgraphComponent
}): IStatsComponent {
  const { subgraph } = options

  function isValid(filters: StatsResourceParams) {
    const { category } = filters
    return Object.values(StatsCategory).includes(category)
  }

  async function fetchEstateSizes(filters: StatsResourceFilters) {
    let lastId = ''
    let sizes: FetchEstateSizesQueryFragment[] = []
    while (true) {
      const query = getEstatesSizesQuery(filters)
      const expiresAt = Date.now()
      const expiresAtSec = Math.trunc(expiresAt / 1000)
      const queryVariables = {
        lastId,
        expiresAt: expiresAt.toString(),
        expiresAtSec: expiresAtSec.toString(),
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

  async function fetch(
    params: StatsResourceParams,
    filters: StatsResourceFilters
  ) {
    if (!isValid(params)) {
      return []
    }
    const { category, stat } = params
    switch (category) {
      case StatsCategory.ESTATE:
        if (stat === EstateStat.SIZE) {
          return fetchEstateSizes(filters)
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

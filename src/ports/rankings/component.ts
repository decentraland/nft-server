import { Network } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { FetchOptions } from '../merger/types'
import {
  IItemsDayDataComponent,
  RankingEntity,
  RankingFragment,
  RankingsFilters,
  RankingsSortBy,
} from './types'
import {
  consolidateRankingResults,
  getRankingQuery,
  sortRankResults,
} from './utils'

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

  async function _fetchRanking(
    entity: RankingEntity,
    filters: RankingsFilters
  ) {
    const isFetchingAllTimeResults = filters.from === 0
    const query = getRankingQuery(entity, filters)
    const { rankings: fragments } = await subgraph.query<{
      rankings: RankingFragment[]
    }>(query)

    const results = consolidateRankingResults(entity, fragments, filters)
    const sortedResults = isFetchingAllTimeResults
      ? Object.values(results)
      : sortRankResults(entity, Object.values(results), filters.sortBy)

    return sortedResults.slice(0, filters.first)
  }

  async function fetch(
    entity: RankingEntity,
    filters: FetchOptions<RankingsFilters, RankingsSortBy>
  ) {
    if (!isValid(network, filters)) {
      return []
    }

    return _fetchRanking(entity, filters)
  }

  async function count(entity: RankingEntity, filters: RankingsFilters) {
    if (!isValid(network, filters)) {
      return 0
    }
    const ranking = await _fetchRanking(entity, filters)
    return ranking.length
  }

  return {
    fetch,
    count,
  }
}

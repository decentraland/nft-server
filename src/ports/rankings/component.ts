import { Network } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import {
  getUniqueCollectorsFromCollectorsDayData,
  getUniqueCreatorsFromCreatorsDayData,
  getUniqueItemsFromItemsDayData,
} from '../../logic/rankings'
import { FetchOptions } from '../merger/types'
import {
  CollectorsDayDataFragment,
  CreatorsDayDataFragment,
  IItemsDayDataComponent,
  ItemsDayDataFragment,
  RankingEntity,
  RankingFragment,
  RankingsFilters,
  RankingsSortBy,
} from './types'
import {
  getCollectorsDayDataQuery,
  getCreatorsDayDataQuery,
  getItemsDayDataQuery,
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

  function _getRankingQuery(entity: RankingEntity, filters: RankingsFilters) {
    switch (entity) {
      case RankingEntity.ITEMS:
        return getItemsDayDataQuery(filters)
      case RankingEntity.CREATORS:
        return getCreatorsDayDataQuery(filters)
      case RankingEntity.COLLECTORS:
        return getCollectorsDayDataQuery(filters)
    }
  }

  function _consolidateResults(
    entity: RankingEntity,
    fragments: RankingFragment[],
    filters: RankingsFilters
  ) {
    switch (entity) {
      case RankingEntity.ITEMS:
        return getUniqueItemsFromItemsDayData(
          fragments as ItemsDayDataFragment[],
          filters
        )
      case RankingEntity.CREATORS:
        return getUniqueCreatorsFromCreatorsDayData(
          fragments as CreatorsDayDataFragment[]
        )
      case RankingEntity.COLLECTORS:
        return getUniqueCollectorsFromCollectorsDayData(
          fragments as CollectorsDayDataFragment[]
        )
    }
  }

  async function _fetchRanking(
    entity: RankingEntity,
    filters: RankingsFilters
  ) {
    const isFetchingAllTimeResults = filters.from === 0
    const query = _getRankingQuery(entity, filters)
    const { rankings: fragments } = await subgraph.query<{
      rankings: RankingFragment[]
    }>(query)

    const results = _consolidateResults(entity, fragments, filters)

    return Object.values(results).slice(
      0,
      isFetchingAllTimeResults ? undefined : filters.first
    )
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

import {
  DEFAULT_SORT_BY,
  Options,
  SourceResult,
  SortBy,
  ISourceComponent,
} from '../nft-source/types'
import { getOrderDirection, MAX_RESULTS } from '../nft-source/utils'
import { IAggregatorComponent, AggregatorOptions } from './types'

function sort(nfts: SourceResult[], sortBy?: SortBy) {
  const sortDirection = getOrderDirection(sortBy)
  const isAsc = sortDirection === 'asc'
  return nfts.sort((a, b) => {
    const up = isAsc ? -1 : 1
    const down = up === 1 ? -1 : 1
    const apply = (by: SortBy) => {
      // send nulls to the bottom always
      return a.sort[by] === null
        ? 1
        : b.sort[by] === null
        ? -1
        : // if not null sort by orderDirection
        a.sort[by]! < b.sort[by]!
        ? up
        : down
    }
    return apply(sortBy || DEFAULT_SORT_BY)
  })
}

function getSourceFilter(options: Options) {
  return function sourceFilter(source: ISourceComponent) {
    return !source.check || source.check(options)
  }
}

export function createNFTAggregatorComponent(
  options: AggregatorOptions
): IAggregatorComponent {
  const { sources } = options

  return {
    fetch: async (options: Options) => {
      // gather results from all the sources
      const filter = getSourceFilter(options)
      const results = await Promise.all(
        sources.filter(filter).map((source) => source.fetch(options))
      )

      // sort results
      const sorted = sort(
        results.reduce((nfts, all) => all.concat(nfts)),
        options.sortBy
      )

      // return the limit of results
      return sorted.slice(options.skip, options.first + options.skip)
    },
    count: async (options: Options) => {
      // gather counts from all the sources
      const filter = getSourceFilter(options)
      const counts = await Promise.all(
        sources.filter(filter).map((source) => source.count(options))
      )

      const total = counts.reduce((total, count) => total + count, 0)

      return Math.min(total, MAX_RESULTS)
    },
  }
}

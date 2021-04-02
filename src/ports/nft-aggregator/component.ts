import { Network } from '@dcl/schemas'
import {
  DEFAULT_SORT_BY,
  Options,
  SourceResult,
  SortBy,
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

function filterByNetwork(network: Network) {
  return (result: SourceResult) =>
    result.nft.network.toLowerCase() === network.toLowerCase()
}

export function createNFTAggregatorComponent(
  options: AggregatorOptions
): IAggregatorComponent {
  const { sources } = options

  return {
    fetch: async (options: Options) => {
      // gather results from all the sources
      const results = await Promise.all(
        sources.map((source) => source.fetch(options))
      )

      // sort results
      const sorted = sort(
        results.reduce((nfts, all) => all.concat(nfts)),
        options.sortBy
      ) //.map(removeSortData) // remove data needed for sort purposes

      // if necessary filter by network filter
      const shouldFilterNetwork = Object.values(Network)
        .map((network) => network.toString().toLowerCase())
        .includes(options.network!)
      const filtered = shouldFilterNetwork
        ? sorted.filter(filterByNetwork(options.network!))
        : sorted

      // return the limit of results
      return filtered.slice(options.skip, options.first + options.skip)
    },
    count: async (options: Options) => {
      // gather counts from all the sources
      const counts = await Promise.all(
        sources.map((source) => source.count(options))
      )

      // TODO: filter results by network
      const total = counts.reduce((total, count) => total + count, 0)

      return Math.min(total, MAX_RESULTS)
    },
  }
}

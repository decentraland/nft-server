import { FetchOptions, IMergerComponent, MergerOptions } from './types'
import { sort } from './utils'

export function createMergerComponent<
  Result,
  Options extends {} = {},
  SortBy extends string = ''
>(
  options: MergerOptions<Result, Options, SortBy>
): IMergerComponent<Result, Options, SortBy> {
  const { sources, defaultSortBy, defaultSortDirection, maxCount } = options

  async function fetch(options: FetchOptions<Options, SortBy>) {
    // gather results from all the sources
    const results = await Promise.all(
      sources.map((source) => source.fetch(options))
    )

    // sort results
    const sorted = sort<Result, SortBy>(
      results.reduce((results, all) => all.concat(results)),
      options.sortBy || defaultSortBy,
      defaultSortDirection
    )

    // return the limit of results
    const skip = options.skip || 0
    const first = options.first || 0
    return sorted.slice(skip, first + skip)
  }

  async function count(options: FetchOptions<Options, SortBy>) {
    // gather counts from all the sources
    const counts = await Promise.all(
      sources.map((source) => source.count(options))
    )

    // reduce the total
    const total = counts.reduce((total, count) => total + count, 0)

    // cap max count (if any)
    return maxCount ? Math.min(total, maxCount) : total
  }

  return {
    fetch,
    count,
  }
}

import { FetchOptions, IMergerComponent, MergerOptions } from './types'
import { sort } from './utils'

export const DEFAULT_FIRST = 20

export function createMergerComponent<
  Result,
  Options extends {} = {},
  SortBy extends string = ''
>(
  options: MergerOptions<Result, Options, SortBy>
): IMergerComponent<Result, Options, SortBy> {
  const { sources, defaultSortBy, directions, maxCount } = options

  function getOptionsWithDefaults(filters: FetchOptions<Options, SortBy>) {
    // compute defatuls
    const skip =
      typeof filters.skip === 'undefined' ? 0 : Math.max(filters.skip, 0)
    const first =
      typeof filters.first === 'undefined'
        ? DEFAULT_FIRST
        : Math.max(filters.first, 0)
    const sortBy = filters.sortBy || defaultSortBy
    return { ...filters, skip, first, sortBy }
  }

  async function fetch(optionsWithoutDefaults: FetchOptions<Options, SortBy>) {
    // compute defaults
    const options = getOptionsWithDefaults(optionsWithoutDefaults)

    // gather results from all the sources
    const results = await Promise.all(
      sources.map((source) => source.fetch(options))
    )

    // sort results
    const sorted = sort<Result, SortBy>(
      results.reduce((results, all) => all.concat(results)),
      options.sortBy,
      directions[options.sortBy]
    )

    // return the limit of result, if first is 0, that means all the results
    return options.first === 0
      ? sorted.slice(options.skip)
      : sorted.slice(options.skip, options.first + options.skip)
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

  async function fetchAndCount(options: FetchOptions<Options, SortBy>) {
    const [results, total] = await Promise.all([fetch(options), count(options)])
    return { results, total }
  }

  return {
    fetch,
    count,
    fetchAndCount,
  }
}

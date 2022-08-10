import {
  FetchOptions,
  IMergerComponent,
  MergerOptions,
  Sortable,
} from './types'
import { sort } from './utils'

export const DEFAULT_FIRST = 20

export function createMergerComponent<
  Result,
  Options extends {} = {},
  SortBy extends string = ''
>(
  options: MergerOptions<Result, Options, SortBy>
): IMergerComponent<Result, Options, SortBy> {
  const {
    sources,
    defaultSortBy,
    directions,
    maxCount,
    mergerEqualFn,
    mergerStrategy,
  } = options

  function getOptionsWithDefaults(
    filters: FetchOptions<Options, SortBy>
  ): Options & { skip: number; first: number; sortBy: SortBy } {
    // compute defaults
    const skip =
      typeof filters.skip === 'undefined' ? 0 : Math.max(filters.skip, 0)
    const first =
      typeof filters.first === 'undefined'
        ? DEFAULT_FIRST
        : Math.max(filters.first, 0)
    const sortBy = filters.sortBy || defaultSortBy
    return { ...filters, skip, first, sortBy }
  }

  function processFetchedData(
    data: Sortable<Result, SortBy>[],
    options: Options & { skip: number; first: number; sortBy: SortBy }
  ) {
    // sort results
    let sorted = sort<Result, SortBy>(
      data,
      options.sortBy,
      directions[options.sortBy]
    )

    if (mergerEqualFn && mergerStrategy) {
      sorted = sorted.reduce((acc, result) => {
        const existingIndex = acc.findIndex((r) => mergerEqualFn(r, result))
        if (existingIndex > -1) {
          acc[existingIndex] = mergerStrategy(acc[existingIndex], result)
        } else {
          acc.push(result)
        }
        return acc
      }, [] as Result[])
    }

    // return the limit of result, if first is 0, that means all the results
    return options.first === 0
      ? sorted.slice(options.skip)
      : sorted.slice(options.skip, options.first + options.skip)
  }

  function processCountData(counts: number[]): number {
    // reduce the total
    const total = counts.reduce((total, count) => total + count, 0)

    // cap max count (if any)
    return maxCount ? Math.min(total, maxCount) : total
  }

  async function fetch(
    optionsWithoutDefaults: FetchOptions<Options, SortBy>
  ): Promise<Result[]> {
    // compute defaults
    const options = getOptionsWithDefaults(optionsWithoutDefaults)

    // gather results from all the sources
    const results = await Promise.all(
      sources.map((source) => source.fetch(options))
    )

    return processFetchedData(
      results.reduce((results, all) => all.concat(results)),
      options
    )
  }

  async function count(
    options: FetchOptions<Options, SortBy>
  ): Promise<number> {
    // gather counts from all the sources
    const counts = await Promise.all(
      sources.map((source) => source.count(options))
    )

    return processCountData(counts)
  }

  async function fetchAndCount(options: FetchOptions<Options, SortBy>) {
    const results: {
      data: Sortable<Result, SortBy>[]
      count: number
    }[] = await Promise.all(
      sources.map(async (source) => {
        if (source.fetchWithCount) {
          return source.fetchWithCount(options)
        }
        return {
          data: await source.fetch(options),
          count: await source.count(options),
        }
      })
    )

    const optionsWithDefaults = getOptionsWithDefaults(options)

    const data = processFetchedData(
      results.flatMap((result) => result.data),
      optionsWithDefaults
    )
    const total = processCountData(results.map((results) => results.count))

    return { data, total }
  }

  return {
    fetch,
    count,
    fetchAndCount,
  }
}

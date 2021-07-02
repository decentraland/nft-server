import { Order } from '../orders/types'
import {
  DEFAULT_SORT_BY,
  Options,
  Result,
  SortBy,
  ISourceComponent,
  Contract,
} from '../source/types'
import { getOrderDirection, MAX_RESULTS } from '../source/utils'
import { IAggregatorComponent, AggregatorOptions } from './types'

function sort(nfts: Result[], sortBy?: SortBy) {
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
    return !source.hasResults || source.hasResults(options)
  }
}

export function createAggregatorComponent(
  options: AggregatorOptions
): IAggregatorComponent {
  const { sources } = options

  async function fetch(options: Options) {
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
  }

  async function count(options: Options) {
    // gather counts from all the sources
    const filter = getSourceFilter(options)
    const counts = await Promise.all(
      sources.filter(filter).map((source) => source.count(options))
    )

    const total = counts.reduce((total, count) => total + count, 0)

    return Math.min(total, MAX_RESULTS)
  }

  async function getNFT(contractAddress: string, tokenId: string) {
    const results = await Promise.all(
      sources.map((source) => source.getNFT(contractAddress, tokenId))
    )
    const nft = results.find((nft) => nft !== null) || null
    return nft
  }

  async function getHistory(contractAddress: string, tokenId: string) {
    const results = await Promise.all(
      sources.map((source) => source.getHistory(contractAddress, tokenId))
    )
    const orders = results.reduce<Order[]>(
      (result, orders) => orders.concat(result),
      []
    )

    return orders
  }

  async function getContracts() {
    const results = await Promise.all(
      sources.map((source) => source.getContracts())
    )

    const contracts = results.reduce<Contract[]>(
      (result, contracts) => contracts.concat(result),
      []
    )

    contracts.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    )

    return contracts
  }

  return {
    fetch,
    count,
    getNFT,
    getHistory,
    getContracts,
  }
}

import { BN } from 'bn.js'
import { PriceFragment, PriceFilters } from './types'

export const MAX_RESULTS = 1000

export const getPriceFragment = () => `
  fragment priceFragment on NFT {
    price: searchOrderPrice
    tokenId
  }
`

export function getPricesQuery(
  getter: (
    id: string,
    filters: PriceFilters
  ) => (filters: PriceFilters) => string,
  filters: PriceFilters,
  id: string
) {
  return getter(id, filters)(filters)
}

export function consolidatePrices(prices: PriceFragment[]) {
  // prices is an object of the price and the amount of items with that price, the following reduce adds 1 for each price occurence
  const unordered = prices.reduce((acc, { price }) => {
    acc[price] = acc[price] ? acc[price] + 1 : 1
    return acc
  }, {} as Record<string, number>)
  // we order the prices since the merger will return them un-ordered because it doesn't know how to compare BNs
  const ordered = Object.keys(unordered)
    .sort((a, b) => (new BN(a).gt(new BN(b)) ? 1 : -1))
    .reduce((obj, key) => {
      obj[key] = unordered[key]
      return obj
    }, {} as Record<string, number>)
  return ordered
}

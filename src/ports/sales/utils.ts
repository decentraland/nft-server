import { ChainId, Network, Sale, SaleFilters, SaleSortBy } from '@dcl/schemas'
import { SaleFragment } from './types'

export const SALE_DEFAULT_SORT_BY = SaleSortBy.RECENTLY_SOLD

export function fromSaleFragment(
  fragment: SaleFragment,
  network: Network,
  chainId: ChainId
): Sale {
  const sale: Sale = {
    id: 'sale-' + network.toLowerCase() + '-' + fragment.id,
    type: fragment.type,
    buyer: fragment.buyer,
    seller: fragment.seller,
    itemId: fragment.searchItemId || null,
    tokenId: fragment.searchTokenId,
    contractAddress: fragment.searchContractAddress,
    price: fragment.price,
    timestamp: +fragment.timestamp * 1000,
    txHash: fragment.txHash,
    network,
    chainId,
  }

  return sale
}

export const getSaleFragment = (network: Network) => `
  fragment saleFragment on Sale {
    id
    type
    buyer
    seller
    price
    timestamp
    txHash
    ${network === Network.MATIC ? 'searchItemId' : ''}
    searchTokenId
    searchContractAddress
  }
`

export function getSalesQuery(
  filters: SaleFilters,
  isCount = false,
  network: Network
) {
  const {
    first,
    skip,
    sortBy,
    type,
    category,
    buyer,
    seller,
    contractAddress,
    itemId,
    tokenId,
    from,
    to,
    minPrice,
    maxPrice,
  } = filters

  const where: string[] = []

  if (tokenId) {
    where.push(`searchTokenId: "${tokenId}"`)
  }

  if (itemId && network === Network.MATIC) {
    where.push(`searchItemId: "${itemId}"`)
  }

  if (buyer) {
    where.push(`buyer: "${buyer}"`)
  }

  if (seller) {
    where.push(`seller: "${seller}"`)
  }

  if (type) {
    where.push(`type: ${type}`)
  }

  if (from) {
    where.push(`timestamp_gt: "${Math.round(from / 1000)}"`)
  }

  if (to) {
    where.push(`timestamp_lt: "${Math.round(to / 1000)}"`)
  }

  if (minPrice) {
    where.push(`price_gt: "${minPrice}"`)
  }

  if (maxPrice) {
    where.push(`price_lt: "${maxPrice}"`)
  }

  if (category) {
    where.push(`searchCategory: "${category}"`)
  }

  if (contractAddress) {
    where.push(`searchContractAddress: "${contractAddress}"`)
  }

  const max = 1000
  const total = isCount
    ? max
    : typeof first !== 'undefined'
    ? typeof skip !== 'undefined'
      ? skip + first
      : first
    : max

  let orderBy: string
  let orderDirection: string
  switch (sortBy) {
    case SaleSortBy.RECENTLY_SOLD:
      orderBy = 'timestamp'
      orderDirection = 'desc'
      break
    case SaleSortBy.MOST_EXPENSIVE:
      orderBy = 'price'
      orderDirection = 'desc'
      break
    default:
      orderBy = 'timestamp'
      orderDirection = 'desc'
  }

  return `
    query Sales {
      sales(
        first: ${total}, 
        orderBy: ${orderBy}, 
        orderDirection: ${orderDirection}, 
        where: {
          ${where.join('\n')}
        }) 
        { ${isCount ? 'id' : `...saleFragment`} }
    }
    ${isCount ? '' : getSaleFragment(network)}
  `
}

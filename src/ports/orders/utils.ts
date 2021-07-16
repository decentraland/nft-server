import { ChainId, ListingStatus, Network, Order } from '@dcl/schemas'
import { OrderFilters, OrderFragment, OrderSortBy } from './types'

export const ORDER_DEFAULT_SORT_BY = OrderSortBy.RECENTLY_LISTED

export const getOrderFields = () => `
  fragment orderFields on Order {
    id
    nftAddress
    owner
    buyer
    price
    status
    expiresAt
    createdAt
    updatedAt
    nft {
      tokenId
    }
  }
`
export const getOrderFragment = () => `
  fragment orderFragment on Order {
    ...orderFields
  }
  ${getOrderFields()}
`

export const getOrdersQuery = (filters: OrderFilters, isCount = false) => {
  const {
    first,
    skip,
    sortBy,
    contractAddress,
    tokenId,
    buyer,
    owner,
    status,
  } = filters

  const where: string[] = []

  if (contractAddress) {
    where.push(`nftAddress: "${contractAddress}"`)
  }

  if (tokenId) {
    where.push(`tokenId: "${tokenId}"`)
  }

  if (buyer) {
    where.push(`buyer: "${buyer}"`)
  }

  if (owner) {
    where.push(`owner: "${owner}"`)
  }

  if (status) {
    if (status === ListingStatus.OPEN) {
      where.push(`expiresAt_gt: "${Date.now()}"`)
    }
    where.push(`status: ${status}`)
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
  switch (sortBy || ORDER_DEFAULT_SORT_BY) {
    case OrderSortBy.RECENTLY_LISTED:
      orderBy = 'createdAt'
      orderDirection = 'desc'
      break
    case OrderSortBy.RECENTLY_UPDATED:
      orderBy = 'updatedAt'
      orderDirection = 'desc'
      break
    case OrderSortBy.CHEAPEST:
      orderBy = 'price'
      orderDirection = 'asc'
      break
    default:
      orderBy = 'createdAt'
      orderDirection = 'desc'
  }

  return `
    query Orders {
      orders(
        first: ${total}, 
        orderBy: ${orderBy}, 
        orderDirection: ${orderDirection}, 
        where: {
          ${where.join('\n')}
        }) 
      { ${isCount ? 'id' : `...orderFragment`} }
    }
    ${isCount ? '' : getOrderFragment()}
  `
}

export function fromOrderFragment(
  fragment: OrderFragment,
  network: Network,
  chainId: ChainId
): Order {
  const order: Order = {
    id: fragment.id,
    contractAddress: fragment.nftAddress,
    tokenId: fragment.nft.tokenId,
    owner: fragment.owner,
    buyer: fragment.buyer,
    price: fragment.price,
    status: fragment.status,
    network,
    chainId,
    expiresAt: +fragment.expiresAt,
    createdAt: +fragment.createdAt * 1000,
    updatedAt: +fragment.updatedAt * 1000,
  }

  return order
}

import {
  ChainId,
  ListingStatus,
  Network,
  Order,
  OrderFilters,
  OrderSortBy,
} from '@dcl/schemas'
import { OrderFragment } from './types'

export const ORDER_DEFAULT_SORT_BY = OrderSortBy.RECENTLY_LISTED

// We're filtering on collections subgraph by itemId and on marketplace subgraph by name as there's not itemId
export const getCollectionsItemIdFilter = (itemId: string) => `
  nft_: {itemBlockchainId: "${itemId}"}
`
export const getCollectionsNameFilter = (_name: string) => ``

export const getCollectionsOrderFields = () => `
fragment orderFields on Order {
  id
  marketplaceAddress
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
    issuedId
  }
}
`

export const getMarketplaceItemIdFilter = (_itemId: string) => ``

export const getMarketplaceNameFilter = (name: string) => `
  nft_: {name: "${name}"}
`

export const getMarketplaceOrderFields = () => `
fragment orderFields on Order {
  id
  marketplaceAddress
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
    tokenURI
  }
}
`

export const getOrderFragment = (getOrderFields: () => string) => `
  fragment orderFragment on Order {
    ...orderFields
  }
  ${getOrderFields()}
`

export const getOrdersQuery = (
  filters: OrderFilters,
  isCount = false,
  getItemIdFilter: (itemId: string) => string,
  getNameFilter: (name: string) => string,
  getOrderFields: () => string
) => {
  const {
    first,
    skip,
    sortBy,
    marketplaceAddress,
    contractAddress,
    tokenId,
    buyer,
    owner,
    status,
    itemId,
    nftName,
  } = filters

  const where: string[] = []
  let wrapWhere = false

  if (marketplaceAddress) {
    where.push(`marketplaceAddress : "${marketplaceAddress}"`)
  }

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

  if (itemId) {
    const itemIdFilter = getItemIdFilter(itemId)
    where.push(itemIdFilter)
  }

  if (nftName) {
    const nameFilter = getNameFilter(nftName)
    where.push(nameFilter)
  }

  if (status) {
    if (status === ListingStatus.OPEN) {
      wrapWhere = true
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
    case OrderSortBy.ISSUED_ID_ASC:
      orderBy = 'tokenId'
      orderDirection = 'asc'
      break
    case OrderSortBy.ISSUED_ID_DESC:
      orderBy = 'tokenId'
      orderDirection = 'desc'
      break
    case OrderSortBy.OLDEST:
      orderBy = 'createdAt'
      orderDirection = 'asc'
      break
    default:
      orderBy = 'createdAt'
      orderDirection = 'desc'
  }

  let wrappedWhere = `{
    ${where.join('\n')}
  }`

  if (wrapWhere) {
    const expiresAt = Date.now()
    const expiresAtSec = Math.trunc(expiresAt / 1000)

    wrappedWhere = `{
      or:[
        {
          ${[
            ...where,
            `expiresAt_gt: "${expiresAtSec}"`,
            `expiresAt_lt: "1000000000000"`,
          ].join('\n')}
        },
        {
          ${[...where, `expiresAt_gt: "${expiresAt}"`].join('\n')}
        }
      ]
    }`
  }

  return `
    query Orders {
      orders(
        first: ${total},
        orderBy: ${orderBy},
        orderDirection: ${orderDirection},
        where: ${wrappedWhere}
      )
      { ${isCount ? 'id' : `...orderFragment`} }
    }
    ${isCount ? '' : getOrderFragment(getOrderFields)}
  `
}

export function fromOrderFragment(
  fragment: OrderFragment,
  network: Network,
  chainId: ChainId
): Order {
  const issuedId = fragment.nft.issuedId
    ? fragment.nft.issuedId
    : fragment.nft.tokenURI?.split('/').pop() ?? ''

  const order: Order = {
    id: fragment.id,
    marketplaceAddress: fragment.marketplaceAddress,
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
    issuedId,
  }

  return order
}

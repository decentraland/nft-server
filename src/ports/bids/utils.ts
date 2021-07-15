import { Bid, ChainId, ListingStatus, Network } from '@dcl/schemas'
import { BidFilters, BidFragment, BidSortBy } from './types'

export const BID_DEFAULT_SORT_BY = BidSortBy.RECENTLY_OFFERED

export function fromBidFragment(
  fragment: BidFragment,
  network: Network,
  chainId: ChainId
): Bid {
  const bid: Bid = {
    id: fragment.id,
    bidder: fragment.bidder,
    seller: fragment.seller,
    price: fragment.price,
    fingerprint: fragment.fingerprint,
    status: fragment.status,
    blockchainId: fragment.blockchainId,
    blockNumber: fragment.blockNumber,
    contractAddress: fragment.nft.contractAddress,
    tokenId: fragment.nft.tokenId,
    network,
    chainId,
    expiresAt: +fragment.expiresAt,
    createdAt: +fragment.createdAt * 1000,
    updatedAt: +fragment.updatedAt * 1000,
  }

  return bid
}

export const getBidFields = () => `
  fragment bidFields on Bid {
    id
    blockchainId
    bidder
    seller
    price
    fingerprint
    status
    blockNumber
    expiresAt
    createdAt
    updatedAt
  }
`

export const getBidFragment = () => `
  fragment bidFragment on Bid {
    ...bidFields
    nft {
      contractAddress
      tokenId
    }
  }
  ${getBidFields()}
`

export function getBidsQuery(filters: BidFilters, isCount = false) {
  const {
    first,
    skip,
    sortBy,
    contractAddress,
    tokenId,
    bidder,
    seller,
    status,
  } = filters

  const where: string[] = []

  if (contractAddress) {
    where.push(`nftAddress: "${contractAddress}"`)
  }

  if (tokenId) {
    where.push(`tokenId: "${tokenId}"`)
  }

  if (bidder) {
    where.push(`bidder: "${bidder}"`)
  }

  if (seller) {
    where.push(`seller: "${seller}"`)
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
  switch (sortBy) {
    case BidSortBy.RECENTLY_OFFERED:
      orderBy = 'createdAt'
      orderDirection = 'desc'
      break
    case BidSortBy.RECENTLY_UPDATED:
      orderBy = 'updatedAt'
      orderDirection = 'desc'
      break
    case BidSortBy.MOST_EXPENSIVE:
      orderBy = 'price'
      orderDirection = 'desc'
      break
    default:
      orderBy = 'createdAt'
      orderDirection = 'desc'
  }

  return `
    query Bids {
      bids(
        first: ${total}, 
        orderBy: ${orderBy}, 
        orderDirection: ${orderDirection}, 
        where: {
          ${where.join('\n')}
        }) 
        { ${isCount ? 'id' : `...bidFragment`} }
    }
    ${isCount ? '' : getBidFragment()}
  `
}

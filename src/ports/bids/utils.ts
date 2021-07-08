import { ChainId, Network } from '@dcl/schemas'
import { Bid, BidFragment } from './types'

export function fromBidFragment(
  fragment: BidFragment,
  network: Network,
  chainId: ChainId
): Bid {
  const bid: Bid = {
    id: fragment.id,
    bidder: fragment.bidder,
    seller: fragment.seller,
    price: +(fragment.price.length > 18 ? fragment.price.slice(0, -18) : 0),
    fingerprint: fragment.fingerprint,
    status: fragment.status,
    blockchainId: fragment.blockchainId,
    blockNumber: fragment.blockNumber,
    expiresAt: +fragment.expiresAt,
    createdAt: +fragment.createdAt * 1000,
    updatedAt: +fragment.updatedAt * 1000,
    contractAddress: fragment.nft.contractAddress,
    tokenId: fragment.nft.tokenId,
    network,
    chainId,
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

export function getBidsQuery(where: string[]) {
  return `
    query Bids {
      bids(first: 1000, where: {
        ${where.join('\n')}
      }) {
        ...bidFragment
      }
    }
    ${getBidFragment()}
  `
}

export function getIdQuery(contractAddress: string, tokenId: string) {
  return `
    query Bids {
      nfts(where: {
        contractAddress: "${contractAddress}"
        tokenId: "${tokenId}"
      }) {
        id
      }
    }
  `
}

import { ChainId, Network } from '@dcl/schemas'
import { getId } from '../nfts/utils'
import { Order, OrderFragment } from './types'

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

export const getOrdersQuery = (where: string[]) => {
  return `
    query Orders {
      orders(where: {
        ${where.join('\n')}
      }) {
        ...orderFragment
      }
    }
    ${getOrderFragment()}
  `
}

export const getIdQuery = (contractAddress: string, tokenId: string) => {
  return `
    query Id {
      nfts(where: {
        contractAddress: "${contractAddress}"
        tokenId: "${tokenId}"
      }) {
        id
      }
    }
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
    nftId: getId(fragment.nftAddress, fragment.nft.tokenId),
    tokenId: fragment.nft.tokenId,
    owner: fragment.owner,
    buyer: fragment.buyer,
    price: +(fragment.price.length > 18 ? fragment.price.slice(0, -18) : 0),
    status: fragment.status,
    expiresAt: +fragment.expiresAt,
    createdAt: +fragment.createdAt * 1000,
    updatedAt: +fragment.updatedAt * 1000,
    network,
    chainId,
  }

  return order
}

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
      orders(first: 1000, where: {
        ${where.join('\n')}
      }) {
        ...orderFragment
      }
    }
    ${getOrderFragment()}
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
    price: fragment.price,
    status: fragment.status,
    expiresAt: +fragment.expiresAt,
    createdAt: +fragment.createdAt * 1000,
    updatedAt: +fragment.updatedAt * 1000,
    network,
    chainId,
  }

  return order
}

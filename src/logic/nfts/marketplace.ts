import { Network } from '@dcl/schemas'
import {
  EnsData,
  NFTCategory,
  NFTFilters,
  NFTResult,
  NFTSortBy,
  WearableData,
} from '../../ports/nfts/types'
import { getId, NFT_DEFAULT_SORT_BY } from '../../ports/nfts/utils'
import { OrderFragment } from '../../ports/orders/types'
import { fromOrderFragment, getOrderFields } from '../../ports/orders/utils'
import { getMarketplaceChainId } from '../chainIds'
import { isExpired } from '../expiration'
import { capitalize } from '../string'

export const getMarketplaceFields = () => `
  fragment marketplaceFields on NFT {
    id
    name
    image
    contractAddress
    tokenId
    category
    owner {
      address
    }
    parcel {
      x
      y
      data {
        description
      }
      estate {
        tokenId
        data {
          name
        }
      }
    }
    estate {
      size
      parcels {
        x
        y
      }
      data {
        description
      }
    }
    wearable {
      description
      category
      rarity
      bodyShapes
    }
    ens {
      subdomain
    }
    createdAt
    updatedAt
    searchOrderPrice
    searchOrderCreatedAt
  }
`

export const getMarketplaceFragment = () => `
  fragment marketplaceFragment on NFT {
    ...marketplaceFields
    activeOrder {
      ...orderFields
    }
  }
  ${getMarketplaceFields()}
  ${getOrderFields()}
`

export type MarketplaceNFTFields = {
  id: string
  name: string | null
  image: string
  contractAddress: string
  tokenId: string
  category: NFTCategory
  owner: { address: string }
  parcel?: {
    x: string
    y: string
    data: {
      description: string
    } | null
    estate: {
      tokenId: string
      data: {
        name: string | null
      } | null
    } | null
  }
  estate?: {
    size: number
    parcels: { x: string; y: string }[]
    data: {
      description: string
    } | null
  }
  wearable?: WearableData
  ens?: EnsData
  createdAt: string
  updatedAt: string
  searchOrderPrice: string
  searchOrderCreatedAt: string
}

export type MarketplaceNFTFragment = MarketplaceNFTFields & {
  activeOrder: OrderFragment | null
}

export function getMarketplaceOrderBy(
  sortBy?: NFTSortBy
): keyof MarketplaceNFTFragment {
  switch (sortBy) {
    case NFTSortBy.NEWEST:
      return 'createdAt'
    case NFTSortBy.NAME:
      return 'name'
    case NFTSortBy.RECENTLY_LISTED:
      return 'searchOrderCreatedAt'
    case NFTSortBy.CHEAPEST:
      return 'searchOrderPrice'
    default:
      return getMarketplaceOrderBy(NFT_DEFAULT_SORT_BY)
  }
}

export function fromMarketplaceNFTFragment(
  fragment: MarketplaceNFTFragment
): NFTResult {
  const result: NFTResult = {
    nft: {
      id: getId(fragment.contractAddress, fragment.tokenId),
      tokenId: fragment.tokenId,
      contractAddress: fragment.contractAddress,
      activeOrderId:
        fragment.activeOrder && !isExpired(fragment.activeOrder.expiresAt)
          ? fragment.activeOrder.id
          : null,
      owner: fragment.owner.address.toLowerCase(),
      name: fragment.name || capitalize(fragment.category),
      image: fragment.image,
      url: `/contracts/${fragment.contractAddress}/tokens/${fragment.tokenId}`,
      data: {
        parcel: fragment.parcel
          ? {
              description:
                (fragment.parcel.data && fragment.parcel.data.description) ||
                null,
              x: fragment.parcel.x,
              y: fragment.parcel.y,
              estate: fragment.parcel.estate
                ? {
                    tokenId: fragment.parcel.estate.tokenId,
                    name:
                      (fragment.parcel.estate.data &&
                        fragment.parcel.estate.data.name) ||
                      capitalize(NFTCategory.ESTATE),
                  }
                : null,
            }
          : undefined,
        estate: fragment.estate
          ? {
              description:
                (fragment.estate.data && fragment.estate.data.description) ||
                null,
              size: fragment.estate.size,
              parcels: fragment.estate.parcels.map(({ x, y }) => ({
                x: +x,
                y: +y,
              })),
            }
          : undefined,
        wearable: fragment.wearable
          ? {
              bodyShapes: fragment.wearable.bodyShapes,
              category: fragment.wearable.category,
              description: fragment.wearable.description,
              rarity: fragment.wearable.rarity,
            }
          : undefined,
        ens: fragment.ens ? { subdomain: fragment.ens.subdomain } : undefined,
      },
      issuedId: null,
      itemId: null,
      category: fragment.category,
      network: Network.ETHEREUM,
      chainId: getMarketplaceChainId(),
      createdAt: +fragment.createdAt * 1000,
      updatedAt: +fragment.updatedAt * 1000,
    },
    order:
      fragment.activeOrder && !isExpired(fragment.activeOrder.expiresAt)
        ? fromMarketplaceOrderFragment(fragment.activeOrder)
        : null,
  }

  // remove undefined data
  for (const property of Object.keys(result.nft.data)) {
    const key = property as keyof typeof result.nft.data
    if (!result.nft.data[key]) {
      delete result.nft.data[key]
    }
  }

  return result
}

export function getMarketplaceExtraVariables(options: NFTFilters) {
  const extraVariables: string[] = []
  if (options.category) {
    extraVariables.push('$category: Category')
  }
  return extraVariables
}

export function getMarketplaceExtraWhere(options: NFTFilters) {
  const extraWhere = ['searchEstateSize_gt: 0', 'searchParcelIsInBounds: true']
  if (options.category) {
    extraWhere.push('category: $category')
  }
  if (options.isLand) {
    extraWhere.push('searchIsLand: true')
  }
  return extraWhere
}

export function fromMarketplaceOrderFragment(fragment: OrderFragment) {
  return fromOrderFragment(fragment, Network.ETHEREUM, getMarketplaceChainId())
}

export function marketplaceShouldFetch(filters: NFTFilters) {
  if (
    (filters.network && filters.network !== Network.ETHEREUM) ||
    filters.itemId
  ) {
    return false
  } else {
    return true
  }
}

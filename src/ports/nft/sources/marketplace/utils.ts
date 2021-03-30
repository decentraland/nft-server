import { Network } from '@dcl/schemas'
import { gql } from 'apollo-boost'
import { NFTFragmet, nftFragment } from './fragment'
import { NFTOptions, SortBy, SortableNFT, WearableGender } from '../../types'
import { fromNumber, fromWei } from '../../utils'

const NFTS_FILTERS = `
  $first: Int
  $skip: Int
  $orderBy: String
  $orderDirection: String
  $expiresAt: String
  $address: String
  $category: Category
  $wearableCategory: WearableCategory
  $isLand: Boolean
  $isWearableHead: Boolean
  $isWearableAccessory: Boolean
`

const NFTS_ARGUMENTS = `
  first: 1000
  skip: 0
  orderBy: $orderBy
  orderDirection: $orderDirection
`

export function getQuery(options: NFTOptions, isCount = false) {
  let extraWhere: string[] = []

  if (options.address) {
    extraWhere.push('owner: $address')
  }

  if (options.category) {
    extraWhere.push('category: $category')
  }

  if (
    options.isOnSale ||
    options.sortBy === SortBy.PRICE ||
    options.sortBy === SortBy.RECENTLY_LISTED
  ) {
    extraWhere.push('searchOrderStatus: open')
    extraWhere.push('searchOrderExpiresAt_gt: $expiresAt')
  }

  if (options.search) {
    extraWhere.push(
      `searchText_contains: "${options.search.trim().toLowerCase()}"`
    )
  }

  if (options.wearableCategory) {
    extraWhere.push('searchWearableCategory: $wearableCategory')
  }

  if (options.isLand) {
    extraWhere.push('searchIsLand: $isLand')
  }

  if (options.isWearableHead) {
    extraWhere.push('searchIsWearableHead: $isWearableHead')
  }

  if (options.isWearableAccessory) {
    extraWhere.push('searchIsWearableAccessory: $isWearableAccessory')
  }

  if (options.wearableRarities && options.wearableRarities.length > 0) {
    extraWhere.push(
      `searchWearableRarity_in: [${options.wearableRarities
        .map((rarity) => `"${rarity}"`)
        .join(',')}]`
    )
  }

  if (options.wearableGenders && options.wearableGenders.length > 0) {
    const hasMale = options.wearableGenders.includes(WearableGender.MALE)
    const hasFemale = options.wearableGenders.includes(WearableGender.FEMALE)

    if (hasMale && !hasFemale) {
      extraWhere.push(`searchWearableBodyShapes: [BaseMale]`)
    } else if (hasFemale && !hasMale) {
      extraWhere.push(`searchWearableBodyShapes: [BaseFemale]`)
    } else if (hasMale && hasFemale) {
      extraWhere.push(
        `searchWearableBodyShapes_contains: [BaseMale, BaseFemale]`
      )
    }
  }

  if (options.contracts && options.contracts.length > 0) {
    extraWhere.push(
      `contractAddress_in: [${options.contracts
        .map((contract) => `"${contract}"`)
        .join(', ')}]`
    )
  }
  return gql`
    query NFTs(${NFTS_FILTERS}) {
      nfts(
        where: {
          searchEstateSize_gt: 0
          searchParcelIsInBounds: true
          ${extraWhere.join('\n')}
        }
        ${NFTS_ARGUMENTS}
      ) {
        ${isCount ? 'id' : '...nftFragment'}
      }
    }
    ${isCount ? '' : nftFragment()}
  `
}

export function getOrderBy(sortBy?: SortBy): keyof NFTFragmet {
  switch (sortBy) {
    case SortBy.BIRTH:
      return 'createdAt'
    case SortBy.NAME:
      return 'name'
    case SortBy.RECENTLY_LISTED:
      return 'searchOrderCreatedAt'
    case SortBy.PRICE:
      return 'searchOrderPrice'
    default:
      return getOrderBy(SortBy.BIRTH)
  }
}

export function fromFragment(fragment: NFTFragmet): SortableNFT {
  const result: SortableNFT = {
    id: fragment.id,
    tokenId: fragment.tokenId,
    contractAddress: fragment.contractAddress,
    activeOrderId: '',
    owner: fragment.owner.address.toLowerCase(),
    name: fragment.name,
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
          }
        : undefined,
      estate: fragment.estate
        ? {
            description:
              (fragment.estate.data && fragment.estate.data.description) ||
              null,
            size: fragment.estate.size,
            parcels: fragment.estate.parcels.map(({ x, y }) => ({ x, y })),
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
    category: fragment.category,
    network: Network.ETHEREUM,
    sort: {
      [SortBy.BIRTH]: fromNumber(fragment.createdAt),
      [SortBy.NAME]: fragment.name,
      [SortBy.RECENTLY_LISTED]: fromNumber(fragment.searchOrderCreatedAt),
      [SortBy.PRICE]: fromWei(fragment.searchOrderPrice),
    },
  }

  // remove undefined data
  for (const property of Object.keys(result.data)) {
    const key = property as keyof typeof result.data
    if (!result.data[key]) {
      delete result.data[key]
    }
  }

  return result
}

import { DocumentNode, gql } from 'apollo-boost'
import {
  SortBy,
  OrderDirection,
  DEFAULT_SORT_BY,
  NFTOptions,
  NFTVariables,
  WearableGender,
} from './types'

const NFTS_FILTERS = `
  $first: Int
  $skip: Int
  $orderBy: String
  $orderDirection: String
  $expiresAt: String
  $address: String
  $wearableCategory: String
  $isWearableHead: Boolean
  $isWearableAccessory: Boolean
`

const NFTS_ARGUMENTS = `
  first: 1000
  skip: 0
  orderBy: $orderBy
  orderDirection: $orderDirection
`

export function getOrderDirection(orderBy?: SortBy): OrderDirection {
  switch (orderBy) {
    case SortBy.BIRTH:
    case SortBy.RECENTLY_LISTED:
      return OrderDirection.DESC
    case SortBy.NAME:
    case SortBy.PRICE:
      return OrderDirection.ASC
    default:
      return getOrderDirection(DEFAULT_SORT_BY)
  }
}

export function getQuery(
  options: NFTOptions,
  fragmentName: string,
  getNFTFragment: () => DocumentNode,
  getExtraVariables?: (options: NFTOptions) => string[],
  getExtraWhere?: (options: NFTOptions) => string[],
  isCount = false
) {
  const where: string[] = []

  if (options.address) {
    where.push('owner: $address')
  }

  if (
    options.isOnSale ||
    options.sortBy === SortBy.PRICE ||
    options.sortBy === SortBy.RECENTLY_LISTED
  ) {
    where.push('searchOrderStatus: open')
    where.push('searchOrderExpiresAt_gt: $expiresAt')
  }

  if (options.search) {
    where.push(`searchText_contains: "${options.search.trim().toLowerCase()}"`)
  }

  if (options.wearableCategory) {
    where.push('searchWearableCategory: $wearableCategory')
  }

  if (options.isWearableHead) {
    where.push('searchIsWearableHead: $isWearableHead')
  }

  if (options.isWearableAccessory) {
    where.push('searchIsWearableAccessory: $isWearableAccessory')
  }

  if (options.wearableRarities && options.wearableRarities.length > 0) {
    where.push(
      `searchWearableRarity_in: [${options.wearableRarities
        .map((rarity) => `"${rarity}"`)
        .join(',')}]`
    )
  }

  if (options.wearableGenders && options.wearableGenders.length > 0) {
    const hasMale = options.wearableGenders.includes(WearableGender.MALE)
    const hasFemale = options.wearableGenders.includes(WearableGender.FEMALE)

    if (hasMale && !hasFemale) {
      where.push(`searchWearableBodyShapes: [BaseMale]`)
    } else if (hasFemale && !hasMale) {
      where.push(`searchWearableBodyShapes: [BaseFemale]`)
    } else if (hasMale && hasFemale) {
      where.push(`searchWearableBodyShapes_contains: [BaseMale, BaseFemale]`)
    }
  }

  if (options.contracts && options.contracts.length > 0) {
    where.push(
      `contractAddress_in: [${options.contracts
        .map((contract) => `"${contract}"`)
        .join(', ')}]`
    )
  }

  const query = `query NFTs(
    ${NFTS_FILTERS}
    ${getExtraVariables ? getExtraVariables(options).join('\n') : ''}
    ) {
    nfts(
      where: {
        ${where.join('\n')}
        ${getExtraWhere ? getExtraWhere(options).join('\n') : ''}
      }${NFTS_ARGUMENTS})
    {
      ${isCount ? 'id' : `...${fragmentName}`}
    }
  }`

  return gql`
    ${query}
    ${isCount ? '' : getNFTFragment()}
  `
}

export function getVariables<T>(
  options: NFTOptions,
  getOrderBy: (sortBy?: SortBy) => keyof T
): NFTVariables {
  const { sortBy, ...variables } = options
  const orderBy = getOrderBy(sortBy) as string
  const orderDirection = getOrderDirection(sortBy)
  return {
    ...variables,
    orderBy,
    orderDirection,
    expiresAt: Date.now().toString(),
  }
}

export function fromNumber(input: string | null) {
  if (input !== null) {
    const parsed = parseInt(input, 10)
    if (!isNaN(parsed)) {
      return parsed
    }
  }
  return null
}

export function fromWei(input: string | null) {
  if (input !== null) {
    const parsed = fromNumber(input)
    if (parsed !== null) {
      return parsed / 10 ** 18
    }
  }
  return null
}

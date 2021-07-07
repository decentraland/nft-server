import { NFTSortBy, NFTOptions, WearableGender, QueryVariables } from './types'

export const NFT_DEFAULT_SORT_BY = NFTSortBy.RECENTLY_LISTED

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

export function getOrderDirection(sortBy?: NFTSortBy): 'asc' | 'desc' {
  switch (sortBy) {
    case NFTSortBy.NEWEST:
    case NFTSortBy.RECENTLY_LISTED:
      return 'desc'
    case NFTSortBy.NAME:
    case NFTSortBy.CHEAPEST:
      return 'asc'
    default:
      return getOrderDirection(NFT_DEFAULT_SORT_BY)
  }
}

export function getQueryVariables<T>(
  options: NFTOptions,
  getOrderBy: (sortBy?: NFTSortBy) => keyof T
): QueryVariables {
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

export function getFetchQuery(
  options: NFTOptions,
  fragmentName: string,
  getNFTFragment: () => string,
  getExtraVariables?: (options: NFTOptions) => string[],
  getExtraWhere?: (options: NFTOptions) => string[],
  isCount = false
) {
  const where: string[] = []

  if (options.owner) {
    where.push('owner: $address')
  }

  if (
    options.isOnSale ||
    options.sortBy === NFTSortBy.CHEAPEST ||
    options.sortBy === NFTSortBy.RECENTLY_LISTED
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

  if (options.contractAddresses && options.contractAddresses.length > 0) {
    where.push(
      `contractAddress_in: [${options.contractAddresses
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

  return `
    ${query}
    ${isCount ? '' : getNFTFragment()}
  `
}

export function getFetchOneQuery(
  fragmentName: string,
  getFragment: () => string
) {
  return `
  query NFTByTokenId($contractAddress: String, $tokenId: String) {
    nfts(
      where: { contractAddress: $contractAddress, tokenId: $tokenId }
      first: 1
      ) {
        ...${fragmentName}
      }
    }
    ${getFragment()}
    `
}

export function getId(contractAddress: string, tokenId: string) {
  return `${contractAddress}-${tokenId}`
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

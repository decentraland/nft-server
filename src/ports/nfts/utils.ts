import { NFTSortBy, NFTFilters, WearableGender, QueryVariables } from './types'

export const NFT_DEFAULT_SORT_BY = NFTSortBy.NEWEST

const NFTS_FILTERS = `
  $first: Int
  $skip: Int
  $orderBy: String
  $orderDirection: String
  $expiresAt: String
  $owner: String
  $wearableCategory: String
  $isWearableHead: Boolean
  $isWearableAccessory: Boolean
`

const getArguments = (total: number) => `
  first: ${total}
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
  options: NFTFilters,
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
  filters: NFTFilters,
  fragmentName: string,
  getNFTFragment: () => string,
  getExtraVariables?: (options: NFTFilters) => string[],
  getExtraWhere?: (options: NFTFilters) => string[],
  isCount = false
) {
  const where: string[] = []

  if (filters.owner) {
    where.push('owner: $owner')
  }

  if (
    filters.isOnSale ||
    filters.sortBy === NFTSortBy.CHEAPEST ||
    filters.sortBy === NFTSortBy.RECENTLY_LISTED
  ) {
    where.push('searchOrderStatus: open')
    where.push('searchOrderExpiresAt_gt: $expiresAt')
  }

  if (filters.search) {
    where.push(`searchText_contains: "${filters.search.trim().toLowerCase()}"`)
  }

  if (filters.wearableCategory) {
    where.push('searchWearableCategory: $wearableCategory')
  }

  if (filters.isWearableHead) {
    where.push('searchIsWearableHead: $isWearableHead')
  }

  if (filters.isWearableAccessory) {
    where.push('searchIsWearableAccessory: $isWearableAccessory')
  }

  if (filters.wearableRarities && filters.wearableRarities.length > 0) {
    where.push(
      `searchWearableRarity_in: [${filters.wearableRarities
        .map((rarity) => `"${rarity}"`)
        .join(',')}]`
    )
  }

  if (filters.wearableGenders && filters.wearableGenders.length > 0) {
    const hasMale = filters.wearableGenders.includes(WearableGender.MALE)
    const hasFemale = filters.wearableGenders.includes(WearableGender.FEMALE)

    if (hasMale && !hasFemale) {
      where.push(`searchWearableBodyShapes: [BaseMale]`)
    } else if (hasFemale && !hasMale) {
      where.push(`searchWearableBodyShapes: [BaseFemale]`)
    } else if (hasMale && hasFemale) {
      where.push(`searchWearableBodyShapes_contains: [BaseMale, BaseFemale]`)
    }
  }

  if (filters.contractAddresses && filters.contractAddresses.length > 0) {
    where.push(
      `contractAddress_in: [${filters.contractAddresses
        .map((contract) => `"${contract}"`)
        .join(', ')}]`
    )
  }

  // Compute total nfts to query. If there's a "skip" we add it to the total, since we need all the prior results to later merge them in a single page. If nothing is provided we default to the max. When counting we also use the max.
  const max = 1000
  const total = isCount
    ? max
    : typeof filters.first !== 'undefined'
    ? typeof filters.skip !== 'undefined'
      ? filters.skip + filters.first
      : filters.first
    : max

  const query = `query NFTs(
    ${NFTS_FILTERS}
    ${getExtraVariables ? getExtraVariables(filters).join('\n') : ''}
    ) {
    nfts(
      where: {
        ${where.join('\n')}
        ${getExtraWhere ? getExtraWhere(filters).join('\n') : ''}
      }${getArguments(total)})
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

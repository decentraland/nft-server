import { EmotePlayMode, NFTCategory, NFTFilters, NFTSortBy } from '@dcl/schemas'
import { getGenderFilterQuery } from '../utils'
import { QueryVariables } from './types'

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
    case NFTSortBy.RECENTLY_SOLD:
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

export function addWearableCategoryAndRaritiesFilters(
  filters: Pick<
    NFTFilters,
    | 'wearableCategory'
    | 'category'
    | 'isWearableHead'
    | 'isWearableAccessory'
    | 'wearableGenders'
    | 'itemRarities'
  >,
  where: string[]
) {
  if (!filters.category || filters.category === NFTCategory.WEARABLE) {
    if (filters.wearableCategory) {
      where.push('searchWearableCategory: $wearableCategory')
    }

    if (filters.isWearableHead) {
      where.push('searchIsWearableHead: $isWearableHead')
    }

    if (filters.isWearableAccessory) {
      where.push('searchIsWearableAccessory: $isWearableAccessory')
    }

    if (filters.wearableGenders && filters.wearableGenders.length > 0) {
      const genderQuery = getGenderFilterQuery(filters.wearableGenders, false)
      where.push(genderQuery)
    }

    if (filters.itemRarities && filters.itemRarities.length > 0) {
      where.push(
        `searchWearableRarity_in: [${filters.itemRarities
          .map((rarity) => `"${rarity}"`)
          .join(',')}]`
      )
    }
  }
}

export function addEmoteCategoryAndRaritiesFilters(
  filters: Pick<
    NFTFilters,
    | 'category'
    | 'emoteCategory'
    | 'emoteGenders'
    | 'emotePlayMode'
    | 'itemRarities'
  >,
  where: string[]
) {
  if (!filters.category || filters.category === NFTCategory.EMOTE) {
    if (filters.emoteCategory) {
      where.push('searchEmoteCategory: $emoteCategory')
    }

    if (filters.emoteGenders && filters.emoteGenders.length > 0) {
      const genderQuery = getGenderFilterQuery(filters.emoteGenders, true)
      if (genderQuery) {
        where.push(genderQuery)
      }
    }

    /**
     * If emotePlayMode length is more than 1 we are ignoring the filter. This is done like this because
     * we are now saving the playMode as a boolean in the graph (loop), so 2 properties means we want all items
     * This should change when we add more play mode types.
     */
    if (filters.emotePlayMode && filters.emotePlayMode.length === 1) {
      where.push(
        `searchEmoteLoop: ${filters.emotePlayMode[0] === EmotePlayMode.LOOP}`
      )
    }

    if (filters.itemRarities && filters.itemRarities.length > 0) {
      where.push(
        `searchEmoteRarity_in: [${filters.itemRarities
          .map((rarity) => `"${rarity}"`)
          .join(',')}]`
      )
    }
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

  if (filters.maxPrice) {
    where.push(`searchOrderPrice_lte: "${filters.maxPrice}"`)
  }

  if (filters.minPrice) {
    where.push(`searchOrderPrice_gte: "${filters.minPrice}"`)
  }

  if (filters.maxEstateSize) {
    where.push(`searchEstateSize_lte: ${filters.maxEstateSize}`)
  }

  if (filters.minEstateSize) {
    where.push(`searchEstateSize_gte: ${filters.minEstateSize}`)
  }

  if (filters.contractAddresses && filters.contractAddresses.length > 0) {
    where.push(
      `contractAddress_in: [${filters.contractAddresses
        .map((contract) => `"${contract}"`)
        .join(', ')}]`
    )
  }

  if (filters.ids && filters.ids.length > 0) {
    where.push(`id_in: [${filters.ids.map((id) => `"${id}"`).join(', ')}]`)
  }

  if (filters.sortBy === NFTSortBy.RECENTLY_SOLD) {
    where.push(`soldAt_not: null`)
  }

  addWearableCategoryAndRaritiesFilters(filters, where)

  addEmoteCategoryAndRaritiesFilters(filters, where)

  if (filters.adjacentToRoad) {
    where.push('searchAdjacentToRoad: true')
  }

  if (filters.isLand && (filters.minDistanceToPlaza !== undefined || filters.maxDistanceToPlaza !== undefined)) {
    const minDistanceToPlaza = filters.minDistanceToPlaza || 0;
    where.push(`searchDistanceToPlaza_gte: ${minDistanceToPlaza}`)

    if (filters.maxDistanceToPlaza) {
      where.push(`searchDistanceToPlaza_lte: ${filters.maxDistanceToPlaza}`)
    }
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

export function getByTokenIdQuery(
  fragmentName: string,
  getFragment: () => string
) {
  return `
  query NFTByTokenId($tokenIds: [String!]) {
    nfts(
      where: { id_in: $tokenIds }
      first: 1000
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

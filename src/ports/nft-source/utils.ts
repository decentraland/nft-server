import {
  SortBy,
  OrderDirection,
  DEFAULT_SORT_BY,
  NFTOptions,
  NFTVariables,
} from './types'

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

export function getVariables(
  options: NFTOptions,
  getOrderBy: (sortBy?: SortBy) => string
): NFTVariables {
  const { sortBy, ...variables } = options
  const orderBy = getOrderBy(sortBy)
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

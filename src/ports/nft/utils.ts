import { SortBy, SortDirection, DEFAULT_SORT_BY, SortType } from './types'

export function getSortDirection(orderBy?: SortBy): SortDirection {
  switch (orderBy) {
    case SortBy.BIRTH:
    case SortBy.RECENTLY_LISTED:
      return SortDirection.DESC
    case SortBy.NAME:
    case SortBy.PRICE:
      return SortDirection.ASC
    default:
      return getSortDirection(DEFAULT_SORT_BY)
  }
}

export function getSortType(orderBy?: SortBy): SortType {
  switch (orderBy) {
    case SortBy.BIRTH:
    case SortBy.RECENTLY_LISTED:
    case SortBy.PRICE:
      return SortType.NUMERIC
    case SortBy.NAME:
      return SortType.TEXT
    default:
      return getSortType(DEFAULT_SORT_BY)
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

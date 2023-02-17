import { AccountSortBy } from '@dcl/schemas'

export const getMarketplaceAccountFragment = (withRoyalties?: boolean) => `
  fragment accountFragment on Account {
    id
    address
    sales
    purchases
    spent
    earned
    ${withRoyalties ? 'royalties' : ''}
  }
`

export function getMarketplaceAccountOrderBy(sortBy?: AccountSortBy) {
  let orderBy: string
  let orderDirection: string
  switch (sortBy) {
    case AccountSortBy.MOST_PURCHASES:
      orderBy = 'purchases'
      orderDirection = 'desc'
      break
    case AccountSortBy.MOST_ROYALTIES:
      orderBy = 'royalties'
      orderDirection = 'desc'
      break
    case AccountSortBy.MOST_SALES:
      orderBy = 'sales'
      orderDirection = 'desc'
      break
    case AccountSortBy.MOST_SPENT:
      orderBy = 'spent'
      orderDirection = 'desc'
      break
    default:
      orderBy = 'earned'
      orderDirection = 'desc'
  }
  return { orderBy, orderDirection }
}

import { AccountSortBy } from '@dcl/schemas'
import { getMarketplaceAccountOrderBy } from './marketplace'

export const getCollectionsAccountFragment = (withRoyalties?: boolean) => `
  fragment accountFragment on Account {
    id
    address
    sales
    purchases
    spent
    earned
    collections
    ${withRoyalties ? 'royalties' : ''}
  }
`

export function getCollectionsAccountOrderBy(sortBy?: AccountSortBy) {
  if (sortBy === AccountSortBy.MOST_COLLECTIONS) {
    return {
      orderBy: 'collections',
      orderDirection: 'desc',
    }
  }
  return getMarketplaceAccountOrderBy(sortBy)
}

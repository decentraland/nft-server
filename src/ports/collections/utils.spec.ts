import { CollectionSortBy } from '@dcl/schemas'
import { getCollectionsQuery } from './utils'

describe('#getCollectionsQuery', () => {
  describe('when sortBy is CollectionSortBy.RECENTLY_LISTED', () => {
    it('should add firstListedAt_not: null where filter', () => {
      const query = getCollectionsQuery({
        sortBy: CollectionSortBy.RECENTLY_LISTED,
      })

      expect(query.includes('firstListedAt_not: null')).toBeTruthy()
    })

    it('should add firstListedAt as orderBy', () => {
      const query = getCollectionsQuery({
        sortBy: CollectionSortBy.RECENTLY_LISTED,
      })

      expect(query.includes('orderBy: firstListedAt')).toBeTruthy()
    })

    it('should add desc as orderDirection', () => {
      const query = getCollectionsQuery({
        sortBy: CollectionSortBy.RECENTLY_LISTED,
      })

      expect(query.includes('orderDirection: desc')).toBeTruthy()
    })
  })
})

import { ChainId, CollectionSortBy, Network } from '@dcl/schemas'
import { CollectionFragment } from './types'
import { fromCollectionFragment, getCollectionsQuery } from './utils'

describe('#getCollectionsQuery', () => {
  describe('when sortBy is CollectionSortBy.RECENTLY_LISTED', () => {
    let query: string

    beforeEach(() => {
      query = getCollectionsQuery({
        sortBy: CollectionSortBy.RECENTLY_LISTED,
      })
    })

    it('should add firstListedAt_not: null where filter', () => {
      expect(query.includes('firstListedAt_not: null')).toBeTruthy()
    })

    it('should add firstListedAt as orderBy', () => {
      expect(query.includes('orderBy: firstListedAt')).toBeTruthy()
    })

    it('should add desc as orderDirection', () => {
      expect(query.includes('orderDirection: desc')).toBeTruthy()
    })
  })
})

describe('#fromCollectionFragment', () => {
  let collectionFragment: CollectionFragment

  beforeEach(() => {
    collectionFragment = {
      id: 'id',
      urn: 'urn',
      name: 'name',
      creator: 'creator',
      searchIsStoreMinter: false,
      itemsCount: 100,
      createdAt: '100',
      updatedAt: '200',
      reviewedAt: '300',
      firstListedAt: null,
    }
  })

  describe('when fragment firstListedAt is null', () => {
    beforeEach(() => {
      collectionFragment.firstListedAt = null
    })

    it('should return a Collection with firstListedAt as null', () => {
      const collection = fromCollectionFragment(
        collectionFragment,
        Network.MATIC,
        ChainId.MATIC_MUMBAI
      )

      expect(collection.firstListedAt).toBeNull()
    })
  })

  describe('when fragment firstListedAt is "100"', () => {
    beforeEach(() => {
      collectionFragment.firstListedAt = '100'
    })

    it('should return a Collection with firstListedAt as 100000', () => {
      const collection = fromCollectionFragment(
        collectionFragment,
        Network.MATIC,
        ChainId.MATIC_MUMBAI
      )

      expect(collection.firstListedAt).toBe(100000)
    })
  })
})

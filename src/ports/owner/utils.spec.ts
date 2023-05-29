import { FetchOptions } from '../merger/types'
import { OwnersFilters, OwnersSortBy } from './types'
import {
  OWNERS_QUERY_DEFAULT_LIMIT,
  OWNERS_QUERY_DEFAULT_OFFSET,
  getOwnersSQLQuery,
} from './utils'

describe('#getOwnersSQLQuery', () => {
  let schemaVersion: string
  let queryFilters: FetchOptions<OwnersFilters, OwnersSortBy>
  let isCount: boolean

  beforeEach(() => {
    schemaVersion = 'sgd123'
    queryFilters = {
      contractAddress: 'contractAddress',
      itemId: 'itemId',
      first: 10,
      skip: 10,
      sortBy: OwnersSortBy.ISSUED_ID,
    }
    isCount = false
  })

  describe('when isCount is true', () => {
    beforeEach(() => {
      isCount = true
    })

    it('should have COUNT(*) as part of the query', () => {
      const query = getOwnersSQLQuery(schemaVersion, queryFilters, isCount)

      expect(query.text).toContain('COUNT(*)')
    })

    it('should not have offset value', () => {
      const query = getOwnersSQLQuery(schemaVersion, queryFilters, isCount)

      expect(query.text).not.toContain(`OFFSET ${queryFilters.skip}`)
    })

    it('should not have limit value', () => {
      const query = getOwnersSQLQuery(schemaVersion, queryFilters, isCount)

      expect(query.text).not.toContain(`LIMIT ${queryFilters.first}`)
    })

    it('should the WHERE statement and have both contractAddress and itemId in the variables array', () => {
      const query = getOwnersSQLQuery(schemaVersion, queryFilters, isCount)

      expect(query.text).toContain('WHERE')
      expect(query.values).toEqual([
        queryFilters.contractAddress,
        queryFilters.itemId,
      ])
    })
  })

  describe('when isCount is false', () => {
    it('should have the SELECT and main fields as part of the query', () => {
      const query = getOwnersSQLQuery(schemaVersion, queryFilters)

      expect(query.text).toContain('nfts.owner, nfts.issued_id, nfts.token_id')
    })
    describe('and has first', () => {
      it('should have LIMIT value ', () => {
        const query = getOwnersSQLQuery(schemaVersion, queryFilters)

        expect(query.text).toContain(`LIMIT $`)
        expect(query.values.includes(queryFilters.first)).toBeTruthy()
      })
    })
    describe('and has no first', () => {
      beforeEach(() => {
        queryFilters.first = undefined
      })
      it('should have LIMIT default value ', () => {
        const query = getOwnersSQLQuery(schemaVersion, queryFilters)

        expect(query.text).toContain(`LIMIT $`)
        expect(query.values.includes(OWNERS_QUERY_DEFAULT_LIMIT)).toBeTruthy()
      })
    })

    describe('and has skip', () => {
      it('should have OFFSET value ', () => {
        const query = getOwnersSQLQuery(schemaVersion, queryFilters)

        expect(query.text).toContain(`OFFSET $`)
        expect(query.values.includes(queryFilters.skip)).toBeTruthy()
      })
    })
    describe('and has no skip', () => {
      beforeEach(() => {
        queryFilters.skip = undefined
      })
      it('should have OFFSET default value ', () => {
        const query = getOwnersSQLQuery(schemaVersion, queryFilters)

        expect(query.text).toContain(`OFFSET $`)
        expect(query.values.includes(OWNERS_QUERY_DEFAULT_OFFSET)).toBeTruthy()
      })
    })
  })

  describe('when the sortBy filter is undefined', () => {
    beforeEach(() => {
      delete queryFilters.sortBy
    })

    it('should not contain orderBy', () => {
      const query = getOwnersSQLQuery(schemaVersion, queryFilters)

      expect(query.text).not.toContain(`ORDER BY`)
    })
  })

  describe('when sortBy is not undefined', () => {
    describe('and is sorting by issued_id', () => {
      it('should have orderBy value as sortBy prop ', () => {
        const query = getOwnersSQLQuery(schemaVersion, queryFilters)

        expect(query.text).toContain('ORDER BY issued_id')
      })
    })
  })

  describe('when orderDirection is undefined', () => {
    it('should not contain orderDirection', () => {
      const query = getOwnersSQLQuery(schemaVersion, queryFilters, isCount)

      expect(query).not.toContain(`orderDirection`)
    })
  })

  describe('when orderDirection is not undefined', () => {
    beforeEach(() => {
      queryFilters = { ...queryFilters, orderDirection: 'desc' }
    })

    it('should have ORDER BY value and the direction set correctly ', () => {
      const query = getOwnersSQLQuery(schemaVersion, queryFilters, isCount)

      expect(query.text).toContain(
        `${queryFilters.orderDirection?.toUpperCase()}`
      )
    })
  })
})

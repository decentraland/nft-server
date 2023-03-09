import { FetchOptions } from '../merger/types'
import { OwnersFilters, OwnersSortBy } from './types'
import { getOwnersQuery } from './utils'

describe('#getOwnersQuery', () => {
  let queryFilters: FetchOptions<OwnersFilters, OwnersSortBy>
  let isCount: boolean

  beforeEach(() => {
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

    it('should have first value in 1000', () => {
      const query = getOwnersQuery(queryFilters, isCount)

      expect(query).toContain('first: 1000')
    })

    it('should have skip value as undefined', () => {
      const query = getOwnersQuery(queryFilters, isCount)

      expect(query).not.toContain('skip')
    })

    it('should contain id', () => {
      const query = getOwnersQuery(queryFilters, isCount)

      expect(query).toContain('id')
      expect(query).not.toContain('...ownerFragment')
      expect(query).not.toContain('fragment ownerFragment on NFT')
    })
  })

  describe('when isCount is false', () => {
    it('should have first value as first prop', () => {
      const query = getOwnersQuery(queryFilters, isCount)

      expect(query).toContain(`first: ${queryFilters.first}`)
    })

    it('should have skip value as skip prop', () => {
      const query = getOwnersQuery(queryFilters, isCount)

      expect(query).toContain(`skip: ${queryFilters.skip}`)
    })

    it('should contain ownerFragment', () => {
      const query = getOwnersQuery(queryFilters, isCount)

      expect(query).toContain('...ownerFragment')
      expect(query).toContain('fragment ownerFragment on NFT')
    })
  })

  describe('when sortby is undefined', () => {
    beforeEach(() => {
      queryFilters = { ...queryFilters, sortBy: undefined }
    })

    it('should not contain orderBy', () => {
      const query = getOwnersQuery(queryFilters, isCount)

      expect(query).not.toContain(`orderBy`)
    })
  })

  describe('when sortby is not undefined', () => {
    it('should have orderby value as sortbyprop ', () => {
      const query = getOwnersQuery(queryFilters, isCount)

      expect(query).toContain(`orderBy: ${queryFilters.sortBy}`)
    })
  })

  describe('when orderDirection is undefined', () => {
    it('should not contain orderDirection', () => {
      const query = getOwnersQuery(queryFilters, isCount)

      expect(query).not.toContain(`orderDirection`)
    })
  })

  describe('when orderDirection is not undefined', () => {
    beforeEach(() => {
      queryFilters = { ...queryFilters, orderDirection: 'desc' }
    })

    it('should have orderDirection value as orderDirection ', () => {
      const query = getOwnersQuery(queryFilters, isCount)

      expect(query).toContain(`orderDirection: ${queryFilters.orderDirection}`)
    })
  })

  it('should have contractAddress and itemId values as the ones passed by params', () => {
    const query = getOwnersQuery(queryFilters, isCount)

    expect(query).toContain(`${queryFilters.contractAddress}`)
    expect(query).toContain(`${queryFilters.itemId}`)
  })
})

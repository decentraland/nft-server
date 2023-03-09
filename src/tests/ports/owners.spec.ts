import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { FetchOptions } from '../../ports/merger/types'
import { createOwnersComponent } from '../../ports/owner/component'
import {
  IOwnerDataComponent,
  OwnerFragment,
  OwnersFilters,
  OwnersSortBy,
} from '../../ports/owner/types'

let collectionSubgraphMock: ISubgraphComponent
let getOwnersQueryMock: jest.Mock
let ownersComponent: IOwnerDataComponent
let queryFilters: FetchOptions<OwnersFilters, OwnersSortBy>

describe('when fetching owners', () => {
  beforeEach(() => {
    getOwnersQueryMock = jest.fn()

    collectionSubgraphMock = {
      query: getOwnersQueryMock,
    }

    ownersComponent = createOwnersComponent({
      subgraph: collectionSubgraphMock,
    })

    queryFilters = {
      contractAddress: 'contractAddress',
      itemId: 'itemId',
      first: 10,
      skip: 10,
      sortBy: OwnersSortBy.ISSUED_ID,
    }
  })

  describe('and the request fails', () => {
    describe('when contractAddress is not provided', () => {
      beforeEach(() => {
        delete queryFilters.contractAddress
      })

      it('should throw an http 400 error with a message requiring itemId and contractAddress', () => {
        return expect(
          ownersComponent.fetchAndCount(queryFilters)
        ).rejects.toThrowError(
          'itemId and contractAddress are neccesary params.'
        )
      })
    })

    describe('when itemId is not provided', () => {
      beforeEach(() => {
        delete queryFilters.itemId
      })

      it('should throw an http 400 error with a message requiring itemId and contractAddress', () => {
        return expect(
          ownersComponent.fetchAndCount(queryFilters)
        ).rejects.toThrowError(
          'itemId and contractAddress are neccesary params.'
        )
      })
    })

    describe('when the subgraph component throws an error', () => {
      beforeEach(() => {
        getOwnersQueryMock.mockRejectedValueOnce(new Error('An error occurred'))
      })

      it('should be propagated to fetchAndCount', () => {
        return expect(
          ownersComponent.fetchAndCount(queryFilters)
        ).rejects.toThrowError(
          'An error occurred'
        )
      })
    })
  })

  describe('when the subgraph component resolves 4 owner fragments', () => {
    let ownersFragment: OwnerFragment[]
    let countResponse: { id: string }[]

    beforeEach(() => {
      ownersFragment = [
        {
          issuedId: `issue1`,
          owner: { id: `1` },
          searchOrderStatus: 'null',
          searchOrderExpiresAt: 'null',
        },
        {
          issuedId: `issue2`,
          owner: { id: `2` },
          searchOrderStatus: 'open',
          searchOrderExpiresAt: '1674604800000',
        },
        {
          issuedId: `issue3`,
          owner: { id: `3` },
          searchOrderStatus: 'null',
          searchOrderExpiresAt: 'null',
        },
        {
          issuedId: `issue4`,
          owner: { id: `4` },
          searchOrderStatus: 'open',
          searchOrderExpiresAt: '1674604800000',
        },
      ]

      countResponse = [
        {
          id: `issue1`,
        },
        {
          id: `issue2`,
        },
        {
          id: `issue3`,
        },
        {
          id: `issue4`,
        },
      ]

      getOwnersQueryMock.mockResolvedValueOnce({ nfts: ownersFragment })
      getOwnersQueryMock.mockResolvedValueOnce({ nfts: countResponse })
    })

    it('should be mapped to 4 owners', () => {
      const expectedResult = {
        data:  [
        {
          issuedId: `issue1`,
          ownerId: `1` ,
          orderStatus: 'null',
          orderExpiresAt: 'null',
        },
        {
          issuedId: `issue2`,
          ownerId: `2` ,
          orderStatus: 'open',
          orderExpiresAt: '1674604800000',
        },
        {
          issuedId: `issue3`,
          ownerId: `3` ,
          orderStatus: 'null',
          orderExpiresAt: 'null',
        },
        {
          issuedId: `issue4`,
          ownerId: `4` ,
          orderStatus: 'open',
          orderExpiresAt: '1674604800000',
        },
      ],
        total: countResponse.length,
      }

      return expect(
        ownersComponent.fetchAndCount(queryFilters)
      ).resolves.toEqual(expectedResult)
    })
  })
})

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
let ownersComponentMock: IOwnerDataComponent
let queryFilters: FetchOptions<OwnersFilters, OwnersSortBy>

describe('when fetching owners', () => {
  beforeEach(() => {
    getOwnersQueryMock = jest.fn()

    collectionSubgraphMock = {
      query: getOwnersQueryMock,
    }

    ownersComponentMock = createOwnersComponent({
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

  afterEach(() => {
    getOwnersQueryMock.mockRestore()
  })

  describe('and the request fails', () => {
    beforeEach(() => {
      getOwnersQueryMock.mockRejectedValueOnce(
        new Error('itemId and contractAddress are neccesary params.')
      )
    })

    it('should propagate the error', () => {
      return expect(
        ownersComponentMock.fetchAndCount(queryFilters)
      ).rejects.toThrowError('itemId and contractAddress are neccesary params.')
    })
  })

  describe('and the request is successful', () => {
    let ownersFragment: OwnerFragment[]
    let countResponse: { id: string }[]

    beforeEach(() => {
      ownersFragment = Array.from({ length: 2 }, (_, i) => ({
        issuedId: `issue${i}`,
        owner: { id: `${i}` },
        searchOrderStatus: i % 2 ? 'open' : 'null',
        searchOrderExpiresAt: i % 2 ? '1674604800000' : 'null',
      }))

      countResponse = Array.from({ length: 2 }, (_, i) => ({
        id: `issue${i}`,
      }))

      getOwnersQueryMock.mockResolvedValueOnce({ nfts: ownersFragment })
      getOwnersQueryMock.mockResolvedValueOnce({ nfts: countResponse })
    })

    it('should return the converted fragment and counted data', () => {
      const expectedResult = {
        data: ownersFragment.map((element: OwnerFragment) => ({
          issuedId: element.issuedId,
          ownerId: element.owner.id,
          orderStatus: element.searchOrderStatus,
          orderExpiresAt: element.searchOrderExpiresAt,
        })),
        total: countResponse.length,
      }

      return expect(
        ownersComponentMock.fetchAndCount(queryFilters)
      ).resolves.toEqual(expectedResult)
    })
  })
})

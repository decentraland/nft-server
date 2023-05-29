import { IPgComponent } from '@well-known-components/pg-component'
import { FetchOptions } from '../../ports/merger/types'
import {
  BAD_REQUEST_ERROR_MESSAGE,
  createOwnersComponent,
} from '../../ports/owner/component'
import {
  IOwnerDataComponent,
  OwnerCountDBRow,
  OwnerDBRow,
  OwnersFilters,
  OwnersSortBy,
} from '../../ports/owner/types'
import { createTestDbComponent } from '../components'

let getOwnersQueryMock: jest.Mock
let ownersComponent: IOwnerDataComponent
let queryFilters: FetchOptions<OwnersFilters, OwnersSortBy>

let dbQueryMock: jest.Mock
let dbClientQueryMock: jest.Mock
let dbClientReleaseMock: jest.Mock
let database: IPgComponent

describe('when fetching owners', () => {
  beforeEach(() => {
    getOwnersQueryMock = jest.fn()
    dbQueryMock = jest.fn()
    dbClientQueryMock = jest.fn()
    dbClientReleaseMock = jest.fn()

    database = createTestDbComponent({
      query: dbQueryMock,
      getPool: jest.fn().mockReturnValue({
        connect: () => ({
          query: dbClientQueryMock,
          release: dbClientReleaseMock,
        }),
      }),
    })

    ownersComponent = createOwnersComponent({
      database,
    })

    queryFilters = {
      contractAddress: 'contractAddress',
      itemId: 'itemId',
      first: 10,
      skip: 10,
      sortBy: OwnersSortBy.ISSUED_ID,
    }
  })

  describe('when contractAddress is not provided', () => {
    beforeEach(() => {
      delete queryFilters.contractAddress
    })

    it('should throw an http 400 error with a message requiring itemId and contractAddress', () => {
      return expect(
        ownersComponent.fetchAndCount(queryFilters)
      ).rejects.toThrowError('itemId and contractAddress are neccesary params.')
    })
  })

  describe('when itemId is not provided', () => {
    beforeEach(() => {
      delete queryFilters.itemId
    })

    it('should throw an http 400 error with a message requiring itemId and contractAddress', () => {
      return expect(
        ownersComponent.fetchAndCount(queryFilters)
      ).rejects.toThrowError('itemId and contractAddress are neccesary params.')
    })
  })

  describe('when the database component throws an error', () => {
    beforeEach(() => {
      getOwnersQueryMock.mockRejectedValueOnce(new Error('An error occurred'))
    })

    it('should be propagated to fetchAndCount', () => {
      return expect(
        ownersComponent.fetchAndCount(queryFilters)
      ).rejects.toThrowError(BAD_REQUEST_ERROR_MESSAGE)
    })
  })

  describe('when the database component resolves 4 owner db fragments', () => {
    let ownersDBRows: OwnerDBRow[]
    let ownersCountDbRows: OwnerCountDBRow[]
    let latestSubgraphSchemaResponse: {
      rows: { entity_schema: string }[]
      rowCount: number
    }
    let latestSchema = 'sgd1234'
    let total: string

    beforeEach(() => {
      latestSubgraphSchemaResponse = {
        rows: [
          {
            entity_schema: latestSchema,
          },
        ],
        rowCount: 0,
      }
      total = '4'
      ownersDBRows = [
        {
          issued_id: 'issue1',
          owner: '1',
          token_id: '1',
        },
        {
          issued_id: `issue2`,
          owner: '2',
          token_id: '2',
        },
        {
          issued_id: `issue3`,
          owner: '3',
          token_id: '3',
        },
        {
          issued_id: `issue4`,
          owner: '4',
          token_id: '4',
        },
      ]

      ownersCountDbRows = [
        {
          count: total,
        },
      ]

      dbClientQueryMock.mockResolvedValueOnce(latestSubgraphSchemaResponse)
      dbClientQueryMock.mockResolvedValueOnce({
        rows: ownersDBRows,
        rowCount: 4,
      })
      dbClientQueryMock.mockResolvedValueOnce({
        rows: ownersCountDbRows,
        rowCount: 1,
      })
    })

    it('should be mapped to 4 owners', () => {
      const expectedResult = {
        data: [
          {
            issuedId: `issue1`,
            ownerId: `1`,
            tokenId: '1',
          },
          {
            issuedId: `issue2`,
            ownerId: `2`,
            tokenId: '2',
          },
          {
            issuedId: `issue3`,
            ownerId: `3`,
            tokenId: '3',
          },
          {
            issuedId: `issue4`,
            ownerId: `4`,
            tokenId: '4',
          },
        ],
        total: Number(total),
      }

      return expect(
        ownersComponent.fetchAndCount(queryFilters)
      ).resolves.toEqual(expectedResult)
    })
  })
})

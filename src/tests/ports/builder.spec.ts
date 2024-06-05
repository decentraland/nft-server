import { IBuilderComponent, createBuilderComponent } from '../../ports/builder'
import { createTestDbComponent } from '../components'

let builderComponent: IBuilderComponent
let queryMock: jest.Mock

describe('when getting the wearable utility', () => {
  let blockchainItemId: string
  let collectionAddress: string

  beforeEach(() => {
    blockchainItemId = '1'
    collectionAddress = '0x123'
    queryMock = jest.fn()
    builderComponent = createBuilderComponent({
      logs: {
        getLogger: () => ({
          info: jest.fn(),
          log: jest.fn(),
          error: jest.fn(),
          warn: jest.fn(),
          debug: jest.fn(),
        }),
      },
      database: createTestDbComponent({ query: queryMock }),
    })
  })

  describe('when performing the request', () => {
    beforeEach(() => {
      queryMock.mockResolvedValueOnce({
        rows: [{ utility: 'This is a utility' }],
        rowCount: 1,
      })
    })

    it('should query the builder DB with the contract address and item id', async () => {
      expect(
        await builderComponent.getItemUtility(
          collectionAddress,
          blockchainItemId
        )
      ).toEqual(expect.anything())

      const firstCall = queryMock.mock.calls[0][0]
      expect(firstCall.text).toMatch(
        'WHERE items.blockchain_item_id = $1 AND collections.contract_address = $2'
      )
      expect(firstCall.values).toEqual([blockchainItemId, collectionAddress])
    })
  })

  describe('and the query returns a row', () => {
    let data: { utility: string | null }

    beforeEach(() => {
      data = { utility: null }
      queryMock.mockResolvedValueOnce({
        rows: [data],
        rowCount: 1,
      })
    })

    describe('and the utility is null', () => {
      beforeEach(() => {
        data.utility = null
      })

      it('should resolve to undefined', async () => {
        expect(
          await builderComponent.getItemUtility(
            collectionAddress,
            blockchainItemId
          )
        ).toBeUndefined()
      })
    })

    describe('and the utility is not null', () => {
      beforeEach(() => {
        data.utility = 'This is a utility'
      })

      it('should resolve to the utility', async () => {
        expect(
          await builderComponent.getItemUtility(
            collectionAddress,
            blockchainItemId
          )
        ).toEqual(data.utility)
      })
    })
  })

  describe('and the query returns no rows', () => {
    beforeEach(() => {
      queryMock.mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
      })
    })

    it('should resolve to undefined', async () => {
      expect(
        await builderComponent.getItemUtility(
          collectionAddress,
          blockchainItemId
        )
      ).toBeUndefined()
    })
  })

  describe('and the query fails', () => {
    beforeEach(() => {
      queryMock.mockRejectedValueOnce(new Error('An error occurred'))
    })

    it('should resolve to undefined', async () => {
      expect(
        await builderComponent.getItemUtility(
          collectionAddress,
          blockchainItemId
        )
      ).toBeUndefined()
    })
  })
})

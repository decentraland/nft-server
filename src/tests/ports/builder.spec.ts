import { IBuilderComponent, createBuilderComponent } from '../../ports/builder'

let builderComponent: IBuilderComponent
let fetchMock: jest.Mock
const builderUrl = 'http://example.com'

describe('when getting the wearable utility', () => {
  let blockchainItemId: string
  let collectionAddress: string

  beforeEach(() => {
    blockchainItemId = '1'
    collectionAddress = '0x123'
    fetchMock = jest.fn()
    builderComponent = createBuilderComponent({
      url: builderUrl,
      logs: {
        getLogger: () => ({
          info: jest.fn(),
          log: jest.fn(),
          error: jest.fn(),
          warn: jest.fn(),
          debug: jest.fn(),
        }),
      },
      fetcher: {
        fetch: fetchMock,
      },
    })
  })

  describe('when performing the request', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: { utility: 'This is a utility' } }),
      })
    })

    it('should query the utility endpoint with the contract address and item id', async () => {
      expect(
        await builderComponent.getItemUtility(
          collectionAddress,
          blockchainItemId
        )
      ).toEqual(expect.anything())
      expect(fetchMock).toHaveBeenCalledWith(
        `${builderUrl}/v1/published-collections/${collectionAddress}/items/${blockchainItemId}/utility`
      )
    })
  })

  describe('and the request is successful', () => {
    let data: { utility: string | null }
    beforeEach(() => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data }),
      })
    })

    describe('and the utility is null', () => {
      beforeEach(() => {
        data = { utility: null }
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
        data = { utility: 'This is a utility' }
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

  describe("and the request fails with a status different than a 200's", () => {
    beforeEach(() => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 404,
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

  describe('and the request fails', () => {
    beforeEach(() => {
      fetchMock.mockRejectedValueOnce(new Error('An error occurred'))
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

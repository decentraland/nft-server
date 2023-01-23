import { NFTCategory } from '@dcl/schemas'
import { IMergerComponent } from '../../../ports/merger/types'
import { createPricesSource } from '../../../adapters/sources/prices'
import {
  IPricesComponent,
  PriceFilters,
  PriceFragment,
  PriceSortBy,
} from '../../../ports/prices/types'
import { convertPriceFragmentToSortableResult } from '../../../logic/prices'

let pricesSource: IMergerComponent.Source<
  PriceFragment,
  PriceFilters,
  PriceSortBy
>
let pricesComponentMock: IPricesComponent
let fetchMock: jest.Mock
let countMock: jest.Mock
let shouldFetch: jest.Mock
let filters: PriceFilters
let pricesResponse: PriceFragment[]

beforeEach(() => {
  shouldFetch = jest.fn()
  fetchMock = jest.fn()
  countMock = jest.fn()
  filters = {
    category: NFTCategory.PARCEL,
  }
  pricesComponentMock = {
    fetch: fetchMock,
    count: countMock,
  }
  pricesSource = createPricesSource(pricesComponentMock, { shouldFetch })
})

describe('when fetching nft prices', () => {
  describe("and it shouldn't fetch nfts prices", () => {
    beforeEach(() => {
      shouldFetch.mockResolvedValueOnce(false)
      fetchMock.mockResolvedValueOnce([])
    })
    it('should return an empty array', () => {
      return expect(pricesSource.fetch(filters)).resolves.toEqual([])
    })
  })

  describe('and it should fetch nfts prices', () => {
    beforeEach(() => {
      shouldFetch.mockResolvedValueOnce(true)
      pricesResponse = [
        {
          id: '1',
          price: '23',
        },
        {
          id: '2',
          price: '34',
        },
      ]
      fetchMock.mockResolvedValueOnce(pricesResponse)
    })
    it('should return the price response as a sortable result', () => {
      return expect(pricesSource.fetch(filters)).resolves.toEqual(
        pricesResponse.map(convertPriceFragmentToSortableResult)
      )
    })
  })

  describe('and the fetching fails', () => {
    beforeEach(() => {
      shouldFetch.mockResolvedValueOnce(true)
      fetchMock.mockRejectedValueOnce(new Error('An error occurred'))
    })

    it('should reject propagating the error', () => {
      return expect(pricesSource.fetch(filters)).rejects.toThrowError(
        'An error occurred'
      )
    })
  })
})

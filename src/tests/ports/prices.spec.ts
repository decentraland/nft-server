import { NFTCategory } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { createPricesComponent } from '../../ports/prices/component'
import { getCollectionPricesQuery } from '../../logic/prices/collections'
import {
  IPricesComponent,
  PriceFilters,
  PriceFragment,
} from '../../ports/prices/types'
import { MAX_RESULTS } from '../../ports/prices/utils'

const error = 'An error occurred'

let collectionsPriceComponent: IPricesComponent
let collectionsSubgraph: ISubgraphComponent
let collectionsSubgraphQueryMock: jest.Mock
let filters: PriceFilters

describe('when getting prices', () => {
  beforeEach(() => {
    filters = {
      category: NFTCategory.WEARABLE,
    }
    collectionsSubgraphQueryMock = jest.fn()
    collectionsSubgraph = {
      query: collectionsSubgraphQueryMock,
    }
    collectionsPriceComponent = createPricesComponent({
      subgraph: collectionsSubgraph,
      queryGetter: getCollectionPricesQuery,
    })
  })

  describe('and the subgraph fetch throws an error', () => {
    beforeEach(() => {
      collectionsSubgraphQueryMock.mockRejectedValueOnce(new Error(error))
    })

    it('should propagate the error', () => {
      return expect(
        collectionsPriceComponent.fetch(filters)
      ).rejects.toThrowError(error)
    })
  })

  describe('and the filters are not valid', () => {
    it('should propagate the error', () => {
      return expect(
        collectionsPriceComponent.fetch({
          category: 'anInvalidOne' as NFTCategory,
        })
      ).resolves.toEqual([])
    })
  })

  describe('and the request is successful', () => {
    describe('and it iterates over the graph because there are more results than the max', () => {
      let firstPagePriceFragments: PriceFragment[]
      let secondPagePriceFragments: PriceFragment[]

      beforeEach(() => {
        firstPagePriceFragments = Array.from(
          { length: MAX_RESULTS + 1 },
          (_, i) => ({
            id: `contractAddress-${i.toString()}-tokenId-${i.toString()}`,
            price: `${i}`,
          })
        )
        secondPagePriceFragments = Array.from(
          { length: MAX_RESULTS - 1 },
          (_, i) => ({
            id: `contractAddress-${i.toString()}-tokenId-${i.toString()}`,
            price: `${i}`,
          })
        )

        collectionsSubgraphQueryMock.mockResolvedValueOnce({
          prices: firstPagePriceFragments,
        })
        collectionsSubgraphQueryMock.mockResolvedValueOnce({
          prices: secondPagePriceFragments,
        })
      })

      it('should return the fragments concatenated', () => {
        return expect(
          collectionsPriceComponent.fetch(filters)
        ).resolves.toEqual([
          ...firstPagePriceFragments,
          ...secondPagePriceFragments,
        ])
      })
    })
  })

  describe('and fetching from the subgraph fails', () => {
    beforeEach(() => {
      collectionsSubgraphQueryMock.mockRejectedValueOnce(
        new Error('An error occurred')
      )
    })

    it('should throw an error with the message returned in the JSON message', () => {
      return expect(
        collectionsPriceComponent.fetch(filters)
      ).rejects.toThrowError(error)
    })
  })
})

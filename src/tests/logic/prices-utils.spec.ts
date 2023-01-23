import {
  PriceFilterExtraOption,
  PriceFragment,
  PriceSortBy,
} from '../../ports/prices/types'
import { convertPriceFragmentToSortableResult } from '../../logic/prices'
import { collectionsShouldFetch } from '../../logic/prices/collections'
import { NFTCategory } from '@dcl/schemas'
import { marketplaceShouldFetch } from '../../logic/prices/marketplace'

describe('when converting PriceFragments to sortable results', () => {
  let priceFragment: PriceFragment

  beforeEach(() => {
    priceFragment = {
      id: '1',
      price: '1',
    }
  })

  describe('and the nft result contains an order', () => {
    it('should return a sortable result with the nft result and the order sorts set', () => {
      expect(convertPriceFragmentToSortableResult(priceFragment)).toEqual({
        result: priceFragment,
        sort: {
          [PriceSortBy.PRICE]: null,
        },
      })
    })
  })
})

describe('shouldFetch logic ', () => {
  describe('and using the collections subgraph', () => {
    test.each([
      [NFTCategory.EMOTE, true],
      [NFTCategory.WEARABLE, true],
      [NFTCategory.ESTATE, false],
      [NFTCategory.PARCEL, false],
      [NFTCategory.ENS, false],
      [PriceFilterExtraOption.LAND, false],
    ])('Fetching %s should be %s', (category, expected) => {
      expect(collectionsShouldFetch({ category })).toEqual(expected)
    })
  })

  describe('and using the marketplace subgraph', () => {
    test.each([
      [NFTCategory.WEARABLE, true],
      [NFTCategory.ESTATE, true],
      [NFTCategory.PARCEL, true],
      [NFTCategory.ENS, true],
      [PriceFilterExtraOption.LAND, true],
      [NFTCategory.EMOTE, false],
    ])('Fetching %s should be %s', (category, expected) => {
      expect(marketplaceShouldFetch({ category })).toEqual(expected)
    })
  })
})

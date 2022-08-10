import { NFTCategory } from '@dcl/schemas'
import {
  PROHIBITED_FILTERS,
  PROHIBITED_SORTING,
  shouldFetch,
} from '../../logic/nfts/rentals'

describe('when checking if the rental should be checked', () => {
  PROHIBITED_FILTERS.forEach((filter) => {
    describe(`and the filter ${filter} is set which is prohibited`, () => {
      it('should return false', () => {
        expect(shouldFetch({ [filter]: true, isOnRent: true })).toBe(false)
      })
    })
  })

  PROHIBITED_SORTING.forEach((sortBy) => {
    describe(`and the sort by filter is set to ${sortBy} which is prohibited`, () => {
      it('should return false', () => {
        expect(shouldFetch({ sortBy, isOnRent: true })).toBe(false)
      })
    })
  })

  Object.keys(NFTCategory)
    .filter(
      (category) =>
        category !== NFTCategory.ESTATE && category !== NFTCategory.PARCEL
    )
    .forEach((category) => {
      describe(`and the category is set to ${category} which is not a LAND category`, () => {
        it('should return false', () => {
          expect(
            shouldFetch({ isOnRent: true, category: category as NFTCategory })
          ).toBe(false)
        })
      })
    })

  describe('and the isOnRent filter is not set', () => {
    it('should return false', () => {
      expect(shouldFetch({})).toBe(false)
    })
  })

  describe('and the isOnRent filter is not true', () => {
    it('should return false', () => {
      expect(shouldFetch({ isOnRent: false })).toBe(false)
    })
  })

  describe('and the isOnRent filter is set to true', () => {
    it('should return true', () => {
      expect(shouldFetch({ isOnRent: true })).toBe(true)
    })
  })
  ;[(NFTCategory.ESTATE, NFTCategory.PARCEL)].forEach((category) => {
    describe(`and the categories filter is set to ${category} which is a LAND category`, () => {
      it('should return true', () => {
        expect(shouldFetch({ isOnRent: true, category })).toBe(true)
      })
    })
  })
  ;[
    'contractAddresses',
    'network',
    'tokenId',
    'isLand',
    'search',
    'owner',
    'first',
    'skip',
  ].forEach((filter) => {
    describe(`and the filter ${filter} filter is set which is permitted`, () => {
      it('should return true', () => {
        expect(shouldFetch({ isOnRent: true, [filter]: true })).toBe(true)
      })
    })
  })
})

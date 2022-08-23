import { NFTCategory } from '@dcl/schemas'
import {
  PROHIBITED_FILTERS,
  PROHIBITED_SORTING,
  shouldFetch,
} from '../../logic/nfts/rentals'

describe('when checking if the rental should be fetched', () => {
  PROHIBITED_FILTERS.forEach((filter) => {
    describe(`and the filter ${filter} is set which is prohibited`, () => {
      it('should return false', () => {
        expect(
          shouldFetch({ [filter]: true, isOnRent: true, isLand: true })
        ).toBe(false)
      })
    })
  })

  PROHIBITED_SORTING.forEach((sortBy) => {
    describe(`and the sort by filter is set to ${sortBy} which is prohibited`, () => {
      it('should return false', () => {
        expect(shouldFetch({ sortBy, isOnRent: true, isLand: true })).toBe(
          false
        )
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

  describe('and the isOnRent filter is not true but the isLand one is', () => {
    it('should return false', () => {
      expect(shouldFetch({ isOnRent: false, isLand: true })).toBe(false)
    })
  })

  describe('and the isOnRent and isLand filter are set to true', () => {
    it('should return true', () => {
      expect(shouldFetch({ isOnRent: true, isLand: true })).toBe(true)
    })
  })

  describe('and the isOnRent filter is set but isLand is set to false', () => {
    it('should return false', () => {
      expect(shouldFetch({ isOnRent: true, isLand: false })).toBe(false)
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
        expect(
          shouldFetch({ isOnRent: true, isLand: true, [filter]: true })
        ).toBe(true)
      })
    })
  })
})

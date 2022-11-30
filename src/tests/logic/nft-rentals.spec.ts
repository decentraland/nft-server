import { Contract, NFTCategory, NFTFilters } from '@dcl/schemas'
import {
  getLandAndEstateContractAddresses,
  PROHIBITED_FILTERS,
  PROHIBITED_SORTING,
  rentalNFTComponentShouldFetch,
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

describe('when calling rentalNFTComponentShouldFetch', () => {
  let filters: NFTFilters

  beforeEach(() => {
    filters = {
      owner: 'owner',
      isOnRent: false,
      isLand: true,
      category: NFTCategory.ESTATE,
    }
  })

  describe('when called without owner', () => {
    beforeEach(() => {
      delete filters.owner
    })

    it('should return false', () => {
      expect(rentalNFTComponentShouldFetch(filters)).toBeFalsy()
    })
  })

  describe('when called with isLand as false and no category', () => {
    beforeEach(() => {
      filters.isLand = false
      delete filters.category
    })

    it('should return false', () => {
      expect(rentalNFTComponentShouldFetch(filters)).toBeFalsy()
    })
  })

  describe('when called with isOnRent as true', () => {
    beforeEach(() => {
      filters.isOnRent = true
    })

    it('should return false', () => {
      expect(rentalNFTComponentShouldFetch(filters)).toBeFalsy()
    })
  })

  describe('when called with a category that is not parcel/estate and no isLand', () => {
    beforeEach(() => {
      delete filters.isLand
      filters.category = NFTCategory.EMOTE
    })

    it('should return false', () => {
      expect(rentalNFTComponentShouldFetch(filters)).toBeFalsy()
    })
  })

  describe('when called with the right filters', () => {
    it('should return true', () => {
      expect(rentalNFTComponentShouldFetch(filters)).toBeTruthy()
    })
  })
})

describe('when calling getLandAndEstateContractAddresses', () => {
  let contracts: Contract[]

  beforeEach(() => {
    contracts = [
      {
        name: 'LAND',
        address: 'LAND_ADDRESS',
      },
      {
        name: 'Estates',
        address: 'ESTATES_ADDRESS',
      },
    ] as Contract[]
  })

  describe("when the provided contracts don't contain LAND", () => {
    beforeEach(() => {
      contracts = [contracts[1]]
    })

    it('should throw an error indicating a contract is missing', () => {
      expect(() => getLandAndEstateContractAddresses(contracts)).toThrowError(
        'LAND and Estates contracts are required'
      )
    })
  })

  describe("when the provided contracts don't contain Estates", () => {
    beforeEach(() => {
      contracts = [contracts[0]]
    })

    it('should throw an error indicating a contract is missing', () => {
      expect(() => getLandAndEstateContractAddresses(contracts)).toThrowError(
        'LAND and Estates contracts are required'
      )
    })
  })

  describe('when the provided contracts contain both LAND and Estates', () => {
    it('should return an object with their addresses lower cased', () => {
      expect(getLandAndEstateContractAddresses(contracts)).toEqual({
        land: contracts[0].address.toLowerCase(),
        estate: contracts[1].address.toLowerCase(),
      })
    })
  })
})

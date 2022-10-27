import { NFTCategory, RentalStatus } from '@dcl/schemas'
import {
  fromMarketplaceNFTFragment,
  MarketplaceNFTFragment,
  marketplaceShouldFetch,
  PROHIBITED_SORT_BYS,
} from './marketplace'

describe('when building a result from the marketplace fragment', () => {
  let marketplaceFragment: MarketplaceNFTFragment
  beforeEach(() => {
    marketplaceFragment = {
      owner: { address: 'anOwner' },
      id: 'id',
      contractAddress: 'anAddress',
      tokenId: 'aTokenId',
      activeOrder: null,
      createdAt: '0',
      updatedAt: '0',
      soldAt: '0',
      searchOrderPrice: 'anOrderPrice',
      searchOrderCreatedAt: 'anOrderTime',
      name: 'aName',
      category: NFTCategory.PARCEL,
      image: 'anImage',
      parcel: {
        x: '20',
        y: '30',
        data: null,
        estate: null,
      },
    }
  })

  describe('with a parcel that belongs to an estate', () => {
    beforeEach(() => {
      marketplaceFragment.parcel!.estate = {
        tokenId: 'string',
        data: null,
      }
    })

    describe('with a estate that contains data', () => {
      describe('without a null name', () => {
        beforeEach(() => {
          marketplaceFragment.parcel!.estate!.data = {
            name: 'name',
          }
        })

        it('should return a result containing a parcel with the estate, containing its name', () => {
          const result = fromMarketplaceNFTFragment(marketplaceFragment)
          const parcelEstate = result.nft.data.parcel!.estate

          expect(parcelEstate).toEqual({
            tokenId: marketplaceFragment.parcel!.estate!.tokenId,
            name: marketplaceFragment.parcel!.estate!.data!.name,
          })
        })
      })

      describe('with a null name', () => {
        beforeEach(() => {
          marketplaceFragment.parcel!.estate!.data = {
            name: null,
          }
        })

        it('should return a result containing a parcel with the estate, having its name as "Estate"', () => {
          const result = fromMarketplaceNFTFragment(marketplaceFragment)
          const parcelEstate = result.nft.data.parcel!.estate

          expect(parcelEstate).toEqual({
            tokenId: marketplaceFragment.parcel!.estate!.tokenId,
            name: 'Estate',
          })
        })
      })
    })

    describe("with a estate that doesn't contain data", () => {
      beforeEach(() => {
        marketplaceFragment.parcel!.estate!.data = null
      })

      it('should return a result containing a parcel with the estate, having its name as "Estate"', () => {
        const result = fromMarketplaceNFTFragment(marketplaceFragment)
        const parcelEstate = result.nft.data.parcel!.estate

        expect(parcelEstate).toEqual({
          tokenId: marketplaceFragment.parcel!.estate!.tokenId,
          name: 'Estate',
        })
      })
    })
  })

  describe("with a parcel that doesn't belong to an estate", () => {
    beforeEach(() => {
      marketplaceFragment.parcel!.estate = null
    })

    it('should return a result containing a parcel with a null estate', () => {
      const result = fromMarketplaceNFTFragment(marketplaceFragment)
      const parcelEstate = result.nft.data.parcel!.estate

      expect(parcelEstate).toBeNull()
    })
  })
})

describe('when deciding if the marketplace should fetch', () => {
  let rentalStatus: RentalStatus[] | undefined

  PROHIBITED_SORT_BYS.forEach((sortBy) => {
    describe(`and the filter to sort by is ${sortBy} which is not permitted`, () => {
      it('should return false', () => {
        expect(marketplaceShouldFetch({ sortBy })).toBe(false)
      })
    })
  })

  describe('and the filter rentalStatus is set and no prohibited sort by is set', () => {
    describe('and the list of rental statuses is empty', () => {
      beforeEach(() => {
        rentalStatus = []
      })

      it('should return true', () => {
        expect(marketplaceShouldFetch({ rentalStatus })).toBe(true)
      })
    })

    describe('and the list of rental statuses is not empty', () => {
      beforeEach(() => {
        rentalStatus = [RentalStatus.CLAIMED]
      })

      it('should return false', () => {
        expect(marketplaceShouldFetch({ rentalStatus })).toBe(false)
      })
    })
  })

  describe('and the filter rentalStatus is not set and no prohibited sort by is set', () => {
    beforeEach(() => {
      rentalStatus = undefined
    })

    it('should return false', () => {
      expect(marketplaceShouldFetch({ rentalStatus })).toBe(true)
    })
  })
})

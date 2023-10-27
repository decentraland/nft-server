import { ListingStatus, NFTCategory, RentalStatus } from '@dcl/schemas'
import {
  fromMarketplaceNFTFragment,
  fromMarketplaceOrderFragment,
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

  describe('when the nft contains an order', () => {
    beforeEach(() => {
      marketplaceFragment.activeOrder = {
        id: 'anId',
        marketplaceAddress: '0xeAeD941633b992602326650221bbe92F561A157A',
        owner: '0xCAdFbeDfc7B719BB9f2542F0E810a7C1d6c1F977',
        buyer: '0x999999cf1046e68e36E1aA2E0E07105eDDD1f08E',
        nftAddress: '0xc0ffee254729296a45a3885639AC7E10F9d54979',
        price: '0',
        status: ListingStatus.OPEN,
        expiresAt: '0',
        createdAt: '0',
        updatedAt: '0',
        nft: {
          tokenId: 'aTokenId',
          issuedId: null,
          tokenURI: '',
        },
      }
    })

    describe('and the order is expired', () => {
      beforeEach(() => {
        marketplaceFragment.activeOrder!.expiresAt = Math.floor(
          Date.now() / 1000
        ).toString()
      })

      it('should not contain an order', () => {
        expect(fromMarketplaceNFTFragment(marketplaceFragment)).toMatchObject({
          nft: {
            activeOrderId: null,
          },
          order: null,
        })
      })
    })

    describe('and the order is not expired', () => {
      beforeEach(() => {
        marketplaceFragment.activeOrder!.expiresAt = Math.floor(
          Date.now() + 60 * 1000 * 60
        ).toString()
      })

      it('should contain an order', () => {
        expect(fromMarketplaceNFTFragment(marketplaceFragment)).toMatchObject({
          nft: {
            activeOrderId: marketplaceFragment.activeOrder?.id ?? null,
          },
          order: marketplaceFragment.activeOrder
            ? fromMarketplaceOrderFragment(marketplaceFragment.activeOrder)
            : null,
        })
      })
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

      it('should return true', () => {
        expect(marketplaceShouldFetch({ rentalStatus })).toBe(true)
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

  describe('and the tenant filter is set', () => {
    it('should return false', () => {
      expect(marketplaceShouldFetch({ tenant: 'aTenant' })).toBe(false)
    })
  })

  describe('and the tenant filter is not set', () => {
    it('should return true', () => {
      expect(marketplaceShouldFetch({})).toBe(true)
    })
  })
})

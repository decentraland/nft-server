import { Network } from '@dcl/schemas'
import { NFTCategory } from '../../source/types'
import {
  fromMarketplaceNFTFragment,
  MarketplaceNFTFragment,
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
      createdAt: 'anOrderTime',
      searchOrderPrice: 'anOrderPrice',
      searchOrderCreatedAt: 'anOrderTime',
      name: 'aName',
      category: NFTCategory.PARCEL,
      image: 'anImage',
      url: 'aURL',
      network: Network.ETHEREUM,
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

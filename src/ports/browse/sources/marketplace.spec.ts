import { Network } from '@dcl/schemas'
import { NFTCategory } from '../../source/types'
import { fromMarketplaceFragment, MarketplaceFragment } from './marketplace'

describe('when building a result from the marketplace fragment', () => {
  let marketplaceFragment: MarketplaceFragment
  beforeEach(() => {
    marketplaceFragment = {
      owner: { address: 'anOwner' },
      id: 'id',
      contractAddress: 'address',
      tokenId: 'aTokenId',
      activeOrder: null,
      createdAt: 'as',
      searchOrderPrice: 's',
      searchOrderCreatedAt: 'sd',
      name: 'name',
      category: NFTCategory.PARCEL,
      image: 'anImage',
      url: 'aUrl',
      network: Network.ETHEREUM,
      parcel: {
        x: 'x',
        y: 'y',
        data: null,
        estate: null,
      },
    }
  })

  describe('with a parcel that belongs to an estate', () => {
    beforeEach(() => {
      marketplaceFragment.parcel!.estate = {
        tokenId: 'string',
        data: {
          name: 'name',
        },
      }
    })

    it('should return a result containing a parcel with the estate', () => {
      const result = fromMarketplaceFragment(marketplaceFragment);
      const parcelEstate = result.nft.data.parcel!.estate;

      expect(parcelEstate).toEqual({
        tokenId: marketplaceFragment.parcel!.estate?.tokenId,
        name: marketplaceFragment.parcel!.estate?.data.name
      })
    })
  })

  describe("with a parcel that doesn't belong to an estate", () => {
    beforeEach(() => {
      marketplaceFragment.parcel!.estate = null;
    })

    it('should return a result containing a parcel with a null estate', () => {
      const result = fromMarketplaceFragment(marketplaceFragment);
      const parcelEstate = result.nft.data.parcel!.estate;

      expect(parcelEstate).toBeNull();
    })
  })
})

import {
  createRentalsNFTComponent,
  MAX_SUBGRAPH_QUERY_IN_ELEMENTS,
} from '../../ports/nfts/rentalsNFTComponent'
import { INFTsComponent } from '../../ports/nfts/types'
import { IRentalsComponent, RentalAsset } from '../../ports/rentals/types'

let mockMarketplaceNFTsComponent: INFTsComponent
let mockRentalsComponent: IRentalsComponent
let mockContractAddresses: { land: string; estate: string }

let rentalsNFTComponent: INFTsComponent

beforeEach(() => {
  mockMarketplaceNFTsComponent = {
    count: jest.fn(),
    fetch: jest.fn(),
    fetchByTokenIds: jest.fn(),
    fetchOne: jest.fn(),
  }

  mockRentalsComponent = {
    getRentalAssets: jest.fn().mockResolvedValue([{}]),
    getRentalsListings: jest.fn(),
    getRentalsListingsOfNFTs: jest.fn(),
  }

  mockContractAddresses = { land: 'land', estate: 'estate' }

  rentalsNFTComponent = createRentalsNFTComponent({
    contractAddresses: mockContractAddresses,
    marketplaceNFTsComponent: mockMarketplaceNFTsComponent,
    rentalsComponent: mockRentalsComponent,
  })
})

describe('when fetching nfts', () => {
  describe('when calling getRentalAssets from the IRentalsComponent', () => {
    it('should be called with the provided filters owner in the lessors array', async () => {
      await rentalsNFTComponent.fetch({ owner: 'owner' })

      expect(mockRentalsComponent.getRentalAssets).toHaveBeenCalledWith(
        expect.objectContaining({
          lessors: ['owner'],
        })
      )
    })

    it('should call getRentalAssets with the land and estate addresses provided when instantiating the component', async () => {
      await rentalsNFTComponent.fetch({})

      expect(mockRentalsComponent.getRentalAssets).toHaveBeenCalledWith(
        expect.objectContaining({
          contractAddresses: [
            mockContractAddresses.land,
            mockContractAddresses.estate,
          ],
        })
      )
    })

    it('should call getRentalAssets with isClaimed as false', async () => {
      await rentalsNFTComponent.fetch({})

      expect(mockRentalsComponent.getRentalAssets).toHaveBeenCalledWith(
        expect.objectContaining({
          isClaimed: false,
        })
      )
    })

    it('should call getRentalAssets with first as the defined MAX_SUBGRAPH_QUERY_IN_ELEMENTS', async () => {
      await rentalsNFTComponent.fetch({})

      expect(mockRentalsComponent.getRentalAssets).toHaveBeenCalledWith(
        expect.objectContaining({
          first: MAX_SUBGRAPH_QUERY_IN_ELEMENTS,
        })
      )
    })
  })

  describe('when calling fetch from the marketplaceNFTsComponent', () => {
    describe('when getRentalAssets has returned one rental asset that is a land', () => {
      let rentalAssetTokenId: string
      let rentalAsset: RentalAsset

      beforeEach(() => {
        rentalAssetTokenId = 'tokenId'
        rentalAsset = {
          id: `${mockContractAddresses.land}-${rentalAssetTokenId}`,
          contractAddress: mockContractAddresses.land,
          tokenId: rentalAssetTokenId,
          isClaimed: false,
          lessor: 'owner',
        }

        mockRentalsComponent.getRentalAssets = jest
          .fn()
          .mockResolvedValue([rentalAsset])
      })

      it('should call fetch with ids based on the obtained rental asset that is a land', async () => {
        await rentalsNFTComponent.fetch({})

        expect(mockMarketplaceNFTsComponent.fetch).toHaveBeenCalledWith(
          expect.objectContaining({
            ids: [`parcel-${rentalAsset.id}`],
          })
        )
      })

      it('should call fetch without owner in the filters', async () => {
        await rentalsNFTComponent.fetch({ owner: 'owner' })

        expect(mockMarketplaceNFTsComponent.fetch).not.toHaveBeenCalledWith(
          expect.objectContaining({
            owner: 'owner',
          })
        )
      })
    })

    describe('when getRentalAssets has returned one rental asset that is an estate', () => {
      let rentalAssetTokenId: string
      let rentalAsset: RentalAsset

      beforeEach(() => {
        rentalAssetTokenId = 'tokenId'
        rentalAsset = {
          id: `${mockContractAddresses.estate}-${rentalAssetTokenId}`,
          contractAddress: mockContractAddresses.estate,
          tokenId: rentalAssetTokenId,
          isClaimed: false,
          lessor: 'owner',
        }

        mockRentalsComponent.getRentalAssets = jest
          .fn()
          .mockResolvedValue([rentalAsset])
      })

      it('should call fetch with ids based on the obtained rental asset that is an estate', async () => {
        await rentalsNFTComponent.fetch({})

        expect(mockMarketplaceNFTsComponent.fetch).toHaveBeenCalledWith(
          expect.objectContaining({
            ids: [`estate-${rentalAsset.id}`],
          })
        )
      })
    })
  })
})

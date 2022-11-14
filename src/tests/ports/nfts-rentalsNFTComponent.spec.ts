import { Contract, NFTFilters } from '@dcl/schemas'
import {
  createRentalsNFTComponent,
  getLandAndEstateContractAddresses,
  MAX_SUBGRAPH_QUERY_IN_ELEMENTS,
  rentalNFTComponentShouldFetch,
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

  describe('when marketplaceNFTsComponent returns a single nft', () => {
    let mockNft = { id: 'some-nft' }

    beforeEach(() => {
      mockMarketplaceNFTsComponent.fetch = jest
        .fn()
        .mockResolvedValue([mockNft])
    })

    it('should finally return an array with that nft', async () => {
      const result = await rentalsNFTComponent.fetch({})

      expect(result).toEqual([mockNft])
    })
  })
})

describe('when counting nfts', () => {
  describe('when calling count from the marketplaceNFTsComponent', () => {
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
        await rentalsNFTComponent.count({})

        expect(mockMarketplaceNFTsComponent.count).toHaveBeenCalledWith(
          expect.objectContaining({
            ids: [`parcel-${rentalAsset.id}`],
          })
        )
      })

      it('should call count without owner in the filters', async () => {
        await rentalsNFTComponent.count({ owner: 'owner' })

        expect(mockMarketplaceNFTsComponent.count).not.toHaveBeenCalledWith(
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
        await rentalsNFTComponent.count({})

        expect(mockMarketplaceNFTsComponent.count).toHaveBeenCalledWith(
          expect.objectContaining({
            ids: [`estate-${rentalAsset.id}`],
          })
        )
      })
    })
  })

  describe('when marketplaceNFTsComponent returns a count of 1', () => {
    beforeEach(() => {
      mockMarketplaceNFTsComponent.count = jest.fn().mockResolvedValue(1)
    })

    it('should finally return a count of 1', async () => {
      const result = await rentalsNFTComponent.count({})

      expect(result).toBe(1)
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

  describe('when called with isLand as false owner', () => {
    beforeEach(() => {
      filters.isLand = false
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

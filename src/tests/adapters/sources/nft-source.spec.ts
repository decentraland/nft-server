import {
  NFT,
  NFTCategory,
  NFTFilters,
  NFTSortBy,
  RentalListing,
  RentalStatus,
} from '@dcl/schemas'
import { createNFTsSource } from '../../../adapters/sources/nfts'
import {
  buildNftId,
  convertNFTResultToSortableResult,
} from '../../../logic/nfts/utils'
import { IMergerComponent, Sortable } from '../../../ports/merger/types'
import { INFTsComponent, NFTResult } from '../../../ports/nfts/types'
import { IRentalsComponent } from '../../../ports/rentals/types'

let nftComponentMock: INFTsComponent
let nftSource: IMergerComponent.Source<NFTResult, NFTFilters, NFTSortBy>
let options: {
  rentals?: IRentalsComponent
  shouldFetch?: (options: NFTFilters) => boolean
  isRentalsEnabled?: boolean
}
let fetchMock: jest.Mock
let fetchOneMock: jest.Mock
let fetchByTokenIdsMock: jest.Mock
let countMock: jest.Mock
let shouldFetchMock: jest.Mock
let getRentalsListingsMock: jest.Mock
let getRentalsListingsOfNFTsMock: jest.Mock

beforeEach(() => {
  fetchMock = jest.fn()
  fetchByTokenIdsMock = jest.fn()
  countMock = jest.fn()
  fetchOneMock = jest.fn()
  shouldFetchMock = jest.fn()
  getRentalsListingsMock = jest.fn()
  getRentalsListingsOfNFTsMock = jest.fn()

  nftComponentMock = {
    fetch: fetchMock,
    fetchOne: fetchOneMock,
    fetchByTokenIds: fetchByTokenIdsMock,
    count: countMock,
  }

  options = {
    shouldFetch: shouldFetchMock,
    isRentalsEnabled: true,
    rentals: {
      getRentalsListings: getRentalsListingsMock,
      getRentalsListingsOfNFTs: getRentalsListingsOfNFTsMock,
      getRentalAssets: jest.fn(),
    },
  }

  nftSource = createNFTsSource(nftComponentMock, options)
})

describe('when fetching nfts', () => {
  describe("and the should fetch optional function is set and it shouldn't fetch nfts", () => {
    beforeEach(() => {
      shouldFetchMock.mockReturnValueOnce(false)
    })

    it('should resolve to an empty array', () => {
      return expect(nftSource.fetch({})).resolves.toEqual([])
    })
  })

  describe('and the should fetch optional function is set and it should fetch nfts', () => {
    let nftsWithoutRentals: NFTResult[]
    let nftsThatAreNotLAND: NFTResult[]
    let nftsWithRentals: NFTResult[]
    let allNfts: NFTResult[]
    let rentalListings: RentalListing[]
    let result: Sortable<NFTResult, NFTSortBy>[]

    beforeEach(async () => {
      nftsWithoutRentals = Array.from({ length: 2 }, (_, i) => ({
        nft: {
          id: `${NFTCategory.PARCEL}-0x0-${i.toString()}`,
          openRentalId: null,
          name: `no-rental-name-${i}`,
          contractAddress: '0x0',
          tokenId: i.toString(),
          category: NFTCategory.PARCEL,
          createdAt: Date.now(),
          soldAt: Date.now(),
        } as NFT,
        order: null,
        rental: null,
      }))
      nftsThatAreNotLAND = Array.from({ length: 2 }, (_, i) => ({
        nft: {
          id: `${NFTCategory.ENS}-0x1-${i.toString()}`,
          openRentalId: null,
          name: `no-land-name-${i}`,
          contractAddress: '0x1',
          tokenId: i.toString(),
          category: NFTCategory.ENS,
          createdAt: Date.now(),
          soldAt: Date.now(),
        } as NFT,
        order: null,
        rental: null,
      }))
      nftsWithRentals = Array.from({ length: 2 }, (_, i) => ({
        nft: {
          id: `${NFTCategory.PARCEL}-0x2-${i.toString()}`,
          openRentalId: `rental-${i}`,
          contractAddress: '0x2',
          tokenId: i.toString(),
          name: `with-land-name-${i}`,
          category: NFTCategory.PARCEL,
          createdAt: Date.now(),
          soldAt: Date.now(),
        } as NFT,
        order: null,
        rental: null,
      }))
      allNfts = [
        ...nftsWithoutRentals,
        ...nftsThatAreNotLAND,
        ...nftsWithRentals,
      ]
      rentalListings = nftsWithRentals.map(
        (nftResult, i) =>
          ({
            id: `rental-${i}`,
            nftId: buildNftId(nftResult),
            startedAt: Date.now(),
            createdAt: Date.now(),
          } as RentalListing)
      )
      shouldFetchMock.mockReturnValueOnce(true)
      fetchMock.mockResolvedValueOnce(allNfts)
      getRentalsListingsOfNFTsMock.mockResolvedValueOnce(rentalListings)
      result = await nftSource.fetch({
        rentalStatus: [RentalStatus.OPEN, RentalStatus.EXECUTED],
      })
    })

    it('should resolve to a list of NFTs enhanced with their rental', () => {
      expect(result).toEqual([
        ...nftsWithoutRentals.map(convertNFTResultToSortableResult),
        ...nftsThatAreNotLAND.map(convertNFTResultToSortableResult),
        ...nftsWithRentals
          .map((nftResult) => ({
            ...nftResult,
            rental:
              rentalListings.find(
                (listing) => nftResult.nft.id === listing.nftId
              ) ?? null,
          }))
          .map(convertNFTResultToSortableResult),
      ])
    })

    it('should have queried the rentals of all LAND nfts', async () => {
      expect(getRentalsListingsOfNFTsMock).toHaveBeenCalledWith(
        [...nftsWithoutRentals, ...nftsWithRentals].map(
          (nftResults) => nftResults.nft.id
        ),
        [RentalStatus.OPEN, RentalStatus.EXECUTED]
      )
    })
  })

  describe('and the should fetch optional function is not set', () => {
    let nfts: NFTResult[]
    let rentalListings: RentalListing[]

    beforeEach(() => {
      nfts = Array.from({ length: 2 }, (_, i) => ({
        nft: {
          id: `${NFTCategory.PARCEL}-0x2-${i.toString()}`,
          openRentalId: `rental-${i}`,
          contractAddress: '0x2',
          tokenId: i.toString(),
          name: `name-${i}`,
          category: NFTCategory.PARCEL,
          createdAt: Date.now(),
          soldAt: Date.now(),
        } as NFT,
        order: null,
        rental: null,
      }))
      rentalListings = nfts.map(
        (nftResult, i) =>
          ({
            id: `rental-${i}`,
            nftId: buildNftId(nftResult),
            startedAt: Date.now(),
            createdAt: Date.now(),
          } as RentalListing)
      )
      fetchMock.mockResolvedValueOnce(nfts)
      getRentalsListingsOfNFTsMock.mockResolvedValueOnce(rentalListings)
      options.shouldFetch = undefined
    })

    it('should resolve to a list of NFTs enhanced with their rental', () => {
      return expect(nftSource.fetch({})).resolves.toEqual(
        nfts
          .map((nftResult) => ({
            ...nftResult,
            rental:
              rentalListings.find(
                (listing) => nftResult.nft.id === listing.nftId
              ) ?? null,
          }))
          .map(convertNFTResultToSortableResult)
      )
    })
  })

  describe('and the should fetch optional function is set but rentals is not enabled', () => {
    let nfts: NFTResult[]
    let result: Sortable<NFTResult, NFTSortBy>[]

    beforeEach(async () => {
      nfts = Array.from({ length: 2 }, (_, i) => ({
        nft: {
          id: `${NFTCategory.PARCEL}-0x2-${i.toString()}`,
          openRentalId: null,
          contractAddress: '0x2',
          tokenId: i.toString(),
          name: `name-${i}`,
          category: NFTCategory.PARCEL,
          createdAt: Date.now(),
          soldAt: Date.now(),
        } as NFT,
        order: null,
        rental: null,
      }))
      fetchMock.mockResolvedValueOnce(nfts)
      shouldFetchMock.mockReturnValueOnce(true)
      options.isRentalsEnabled = false
      result = await nftSource.fetch({})
    })

    it('should resolve to a list of NFTs', () => {
      expect(result).toEqual(nfts.map(convertNFTResultToSortableResult))
    })

    it('should not enhance the NFTs with rentals', () => {
      expect(getRentalsListingsOfNFTsMock).not.toHaveBeenCalled()
    })
  })

  describe("and the should fetch optional function is set but there's no specification if rentals is enabled", () => {
    let nfts: NFTResult[]
    let result: Sortable<NFTResult, NFTSortBy>[]

    beforeEach(async () => {
      nfts = Array.from({ length: 2 }, (_, i) => ({
        nft: {
          id: `${NFTCategory.PARCEL}-0x2-${i.toString()}`,
          openRentalId: null,
          contractAddress: '0x2',
          tokenId: i.toString(),
          name: `name-${i}`,
          category: NFTCategory.PARCEL,
          createdAt: Date.now(),
          soldAt: Date.now(),
        } as NFT,
        order: null,
        rental: null,
      }))
      fetchMock.mockResolvedValueOnce(nfts)
      shouldFetchMock.mockReturnValueOnce(true)
      options.isRentalsEnabled = undefined
      result = await nftSource.fetch({})
    })

    it('should resolve to a list of NFTs', () => {
      expect(result).toEqual(nfts.map(convertNFTResultToSortableResult))
    })

    it('should not enhance the NFTs with rentals', () => {
      expect(getRentalsListingsOfNFTsMock).not.toHaveBeenCalled()
    })
  })

  describe('and fetching the nfts fails', () => {
    beforeEach(() => {
      shouldFetchMock.mockReturnValueOnce(true)
      fetchMock.mockRejectedValueOnce(new Error('An error occurred'))
    })

    it('should reject with the propagated error', () => {
      return expect(nftSource.fetch({})).rejects.toThrowError(
        'An error occurred'
      )
    })
  })

  describe('and enhancing the nfts fails', () => {
    let nfts: NFTResult[]
    beforeEach(() => {
      nfts = Array.from({ length: 2 }, (_, i) => ({
        nft: {
          id: `${NFTCategory.PARCEL}-0x2-${i.toString()}`,
          openRentalId: null,
          name: `no-rental-name-${i}`,
          contractAddress: '0x0',
          tokenId: i.toString(),
          category: NFTCategory.PARCEL,
          createdAt: Date.now(),
          soldAt: Date.now(),
        } as NFT,
        order: null,
        rental: null,
      }))
      shouldFetchMock.mockReturnValueOnce(true)
      fetchMock.mockResolvedValueOnce(nfts)
      getRentalsListingsOfNFTsMock.mockRejectedValueOnce(
        new Error('An error occurred')
      )
    })

    it('should resolve with the propagated error', () => {
      return expect(nftSource.fetch({})).rejects.toThrowError(
        'An error occurred'
      )
    })
  })

  describe('and the rentals component is not defined', () => {
    let nfts: NFTResult[]

    beforeEach(() => {
      nfts = Array.from({ length: 2 }, (_, i) => ({
        nft: {
          id: `${NFTCategory.PARCEL}-0x2-${i.toString()}`,
          openRentalId: null,
          contractAddress: '0x2',
          tokenId: i.toString(),
          name: `name-${i}`,
          category: NFTCategory.PARCEL,
          createdAt: Date.now(),
          soldAt: Date.now(),
        } as NFT,
        order: null,
        rental: null,
      }))
      shouldFetchMock.mockReturnValueOnce(true)
      fetchMock.mockResolvedValueOnce(nfts)
      options.rentals = undefined
    })

    it('should return the nfts without enhancing them', () => {
      return expect(nftSource.fetch({})).resolves.toEqual(
        nfts.map(convertNFTResultToSortableResult)
      )
    })
  })
})

describe('when counting nfts', () => {
  describe("and the should fetch optional function is set and it shouldn't fetch nfts", () => {
    beforeEach(() => {
      shouldFetchMock.mockReturnValueOnce(false)
    })

    it('should resolve to 0', () => {
      return expect(nftSource.count({})).resolves.toBe(0)
    })
  })

  describe('and the should fetch optional function is set and it should fetch nfts', () => {
    beforeEach(() => {
      countMock.mockResolvedValueOnce(10)
      shouldFetchMock.mockReturnValueOnce(true)
    })

    it('should resolve to the number of nfts', () => {
      return expect(nftSource.count({})).resolves.toBe(10)
    })
  })

  describe('and the should fetch optional function is not set', () => {
    beforeEach(() => {
      countMock.mockResolvedValueOnce(10)
      options.shouldFetch = undefined
    })

    it('should resolve to the number of nfts', () => {
      return expect(nftSource.count({})).resolves.toBe(10)
    })
  })

  describe('and fetching the nfts fails', () => {
    beforeEach(() => {
      shouldFetchMock.mockReturnValueOnce(true)
      countMock.mockRejectedValueOnce(new Error('An error occurred'))
    })

    it('should reject with the propagated error', () => {
      return expect(nftSource.count({})).rejects.toThrowError(
        'An error occurred'
      )
    })
  })
})

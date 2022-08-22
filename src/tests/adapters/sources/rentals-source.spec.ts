import { NFT, NFTFilters, NFTSortBy, RentalListing } from '@dcl/schemas'
import { IMergerComponent } from '../../../ports/merger/types'
import { createRentalsNFTSource } from '../../../adapters/sources/rentals'
import { SignaturesServerPaginatedResponse } from '../../../ports/rentals/types'
import { INFTsComponent, NFTResult } from '../../../ports/nfts/types'
import { IRentalsComponent } from '../../../ports/rentals/types'
import { convertNFTResultToSortableResult } from '../../../logic/nfts/utils'

let rentalsNFTSource: IMergerComponent.Source<NFTResult, NFTFilters, NFTSortBy>
let rentalsComponentMock: IRentalsComponent
let nftsComponentsMock: INFTsComponent
let getRentalsListingsMock: jest.Mock
let getOpenRentalsListingsOfNFTsMock: jest.Mock
let fetchMock: jest.Mock
let fetchOneMock: jest.Mock
let fetchByTokenIdsMock: jest.Mock
let countMock: jest.Mock
let rentalsResponse: SignaturesServerPaginatedResponse<RentalListing[]>
let nftResults: NFTResult[]

beforeEach(() => {
  getRentalsListingsMock = jest.fn()
  fetchByTokenIdsMock = jest.fn()
  getOpenRentalsListingsOfNFTsMock = jest.fn()
  fetchMock = jest.fn()
  fetchOneMock = jest.fn()
  countMock = jest.fn()
  rentalsComponentMock = {
    getRentalsListings: getRentalsListingsMock,
    getOpenRentalsListingsOfNFTs: getOpenRentalsListingsOfNFTsMock,
  }
  nftsComponentsMock = {
    fetch: fetchMock,
    fetchOne: fetchOneMock,
    fetchByTokenIds: fetchByTokenIdsMock,
    count: countMock,
  }
  rentalsNFTSource = createRentalsNFTSource(
    rentalsComponentMock,
    nftsComponentsMock
  )
})

describe('when fetching rented nfts', () => {
  describe("and it shouldn't fetch rented nfts", () => {
    it('should return an empty array', () => {
      return expect(
        rentalsNFTSource.fetch({ isOnSale: true })
      ).resolves.toEqual([])
    })
  })

  describe('and it should fetch rented nfts', () => {
    beforeEach(() => {
      rentalsResponse = {
        ok: true,
        data: {
          results: Array.from({ length: 5 }, (_, i) => ({
            id: i.toString(),
            nftId: `nft-id-${i}`,
            contractAddress: `contractAddress-${i}`,
            tokenId: `tokenId-${i}`,
            startedAt: Date.now(),
            createdAt: Date.now(),
          })) as RentalListing[],
          page: 1,
          pages: 1,
          limit: 5,
          total: 100,
        },
      }
      nftResults = rentalsResponse.data.results.map((rental) => ({
        nft: {
          id: rental.nftId,
          name: `nft-${rental.id}`,
          openRentalId: rental.id,
          createdAt: Date.now(),
          soldAt: Date.now(),
        } as NFT,
        order: null,
        rental: null,
      }))
      fetchByTokenIdsMock.mockResolvedValueOnce(nftResults)
      getRentalsListingsMock.mockResolvedValueOnce(rentalsResponse)
    })

    it('should return the fetched nfts', async () => {
      return expect(
        rentalsNFTSource.fetch!({ isOnRent: true })
      ).resolves.toEqual(
        nftResults
          .map((nftResult, i) => ({
            ...nftResult,
            rental: rentalsResponse.data.results[i],
          }))
          .map(convertNFTResultToSortableResult)
      )
    })
  })

  describe('and the fetching fails', () => {
    beforeEach(() => {
      getRentalsListingsMock.mockRejectedValueOnce(
        new Error('An error occurred')
      )
    })

    it('should reject propagating the error', () => {
      return expect(
        rentalsNFTSource.fetch!({ isOnRent: true })
      ).rejects.toThrowError('An error occurred')
    })
  })
})

describe('when counting rented nfts', () => {
  describe("and it shouldn't fetch rented nfts", () => {
    it('should return zero', () => {
      return expect(
        rentalsNFTSource.count({ isOnSale: true })
      ).resolves.toEqual(0)
    })
  })

  describe('and it should fetch rented nfts', () => {
    beforeEach(() => {
      rentalsResponse = {
        ok: true,
        data: {
          results: Array.from({ length: 5 }, (_, i) => ({
            id: i.toString(),
            nftId: `nft-id-${i}`,
            contractAddress: `contractAddress-${i}`,
            tokenId: `tokenId-${i}`,
            startedAt: Date.now(),
            createdAt: Date.now(),
          })) as RentalListing[],
          page: 1,
          pages: 1,
          limit: 5,
          total: 100,
        },
      }

      getRentalsListingsMock.mockResolvedValueOnce(rentalsResponse)
    })

    it('should return the number of fetched nfts', () => {
      return expect(
        rentalsNFTSource.count({ isOnRent: true })
      ).resolves.toEqual(rentalsResponse.data.total)
    })
  })

  describe('and the fetching fails', () => {
    beforeEach(() => {
      getRentalsListingsMock.mockRejectedValueOnce(
        new Error('An error occurred')
      )
    })

    it('should reject propagating the error', () => {
      return expect(
        rentalsNFTSource.count!({ isOnRent: true })
      ).rejects.toThrowError('An error occurred')
    })
  })
})

describe('when fetching and counting rented nfts', () => {
  describe("and it shouldn't fetch rented nfts", () => {
    it('should return an empty array of data and count as zero', () => {
      return expect(
        rentalsNFTSource.fetchAndCount!({ isOnSale: true })
      ).resolves.toEqual({
        data: [],
        count: 0,
      })
    })
  })

  describe('and it should fetch rented nfts', () => {
    beforeEach(() => {
      rentalsResponse = {
        ok: true,
        data: {
          results: Array.from({ length: 5 }, (_, i) => ({
            id: i.toString(),
            nftId: `nft-id-${i}`,
            contractAddress: `contractAddress-${i}`,
            tokenId: `tokenId-${i}`,
            startedAt: Date.now(),
            createdAt: Date.now(),
          })) as RentalListing[],
          page: 1,
          pages: 1,
          limit: 5,
          total: 100,
        },
      }
      nftResults = rentalsResponse.data.results.map((rental) => ({
        nft: {
          id: rental.nftId,
          name: `nft-${rental.id}`,
          openRentalId: rental.id,
          createdAt: Date.now(),
          soldAt: Date.now(),
        } as NFT,
        order: null,
        rental: null,
      }))

      fetchByTokenIdsMock.mockResolvedValueOnce(nftResults)
      getRentalsListingsMock.mockResolvedValueOnce(rentalsResponse)
    })

    it('should return the count and the fetched nfts', () => {
      return expect(
        rentalsNFTSource.fetchAndCount!({ isOnRent: true })
      ).resolves.toEqual({
        data: nftResults
          .map((nftResult, i) => ({
            ...nftResult,
            rental: rentalsResponse.data.results[i],
          }))
          .map(convertNFTResultToSortableResult),
        count: rentalsResponse.data.total,
      })
    })
  })

  describe('and the fetching fails', () => {
    beforeEach(() => {
      getRentalsListingsMock.mockRejectedValueOnce(
        new Error('An error occurred')
      )
    })

    it('should reject propagating the error', () => {
      return expect(
        rentalsNFTSource.fetchAndCount!({ isOnRent: true })
      ).rejects.toThrowError('An error occurred')
    })
  })
})

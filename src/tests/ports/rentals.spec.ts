import { URL } from 'url'
import {
  Network,
  NFTCategory,
  NFTFilters,
  NFTSortBy,
  RentalListing,
  RentalsListingsFilterBy,
  RentalsListingsFilterByCategory,
  RentalsListingSortDirection,
  RentalsListingsSortBy,
  RentalStatus,
} from '@dcl/schemas'
import { IFetchComponent } from '@well-known-components/http-server'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { Response } from 'node-fetch'
import { createRentalsComponent } from '../../ports/rentals/components'
import {
  IRentalsComponent,
  SignaturesServerPaginatedResponse,
} from '../../ports/rentals/types'

const rentalsURL = 'http://rentals.com'
const error = 'An error occurred'

let fetchComponentMock: IFetchComponent
let fetchResponse: Response
let rentalsComponent: IRentalsComponent
let rentalsSubgraph: ISubgraphComponent
let fetchMock: jest.Mock

describe('when getting rental listings', () => {
  beforeEach(() => {
    fetchMock = jest.fn()
    fetchComponentMock = {
      fetch: fetchMock,
    }
    rentalsSubgraph = {
      query: jest.fn(),
    }
    rentalsComponent = createRentalsComponent(
      { fetch: fetchComponentMock },
      rentalsURL,
      rentalsSubgraph
    )
  })

  describe('and the fetch throws an error', () => {
    beforeEach(() => {
      fetchMock.mockRejectedValueOnce(new Error(error))
    })

    it('should propagate the error', () => {
      return expect(
        rentalsComponent.getRentalsListings({})
      ).rejects.toThrowError(error)
    })
  })

  describe('and the status code returned is not ok', () => {
    beforeEach(() => {
      fetchResponse = {
        status: 500,
        ok: false,
      } as Response
      fetchMock.mockResolvedValueOnce(fetchResponse)
    })

    describe("and there's a JSON response with the error", () => {
      beforeEach(() => {
        fetchResponse.json = jest.fn().mockResolvedValueOnce({
          ok: false,
          message: error,
        })
      })

      it('should throw an error with the message returned in the JSON message', () => {
        return expect(
          rentalsComponent.getRentalsListings({})
        ).rejects.toThrowError(error)
      })
    })

    describe("and there's no JSON response with the error", () => {
      beforeEach(() => {
        fetchResponse.json = jest.fn().mockRejectedValueOnce(new Error(error))
      })

      it('should throw the JSON parsing error', () => {
        return expect(
          rentalsComponent.getRentalsListings({})
        ).rejects.toThrowError(
          `Error fetching rentals, the server responded with: ${fetchResponse.status}`
        )
      })
    })
  })

  describe('and the parsed JSON has an error message', () => {
    beforeEach(() => {
      fetchResponse = {
        status: 200,
        json: jest.fn().mockResolvedValueOnce({
          ok: false,
          message: error,
        }) as any,
      } as Response
      fetchMock.mockResolvedValueOnce(fetchResponse)
    })

    it('should throw an error with the message returned in the JSON message', () => {
      return expect(
        rentalsComponent.getRentalsListings({})
      ).rejects.toThrowError(error)
    })
  })

  describe('and the rentals are retrieved successfully', () => {
    let response: SignaturesServerPaginatedResponse<RentalListing[]>

    beforeEach(() => {
      response = {
        ok: true,
        data: {
          results: [],
          pages: 1,
          page: 1,
          limit: 50,
          total: 0,
        },
      }
      fetchResponse = {
        status: 200,
        ok: true,
        json: jest.fn().mockResolvedValueOnce(response) as any,
      } as Response
      fetchMock.mockResolvedValueOnce(fetchResponse)
    })

    it('should return the rental listings', () => {
      return expect(rentalsComponent.getRentalsListings({})).resolves.toEqual(
        response
      )
    })
  })

  describe('and the rentals are queried with filters', () => {
    let response: SignaturesServerPaginatedResponse<RentalListing[]>
    let result: SignaturesServerPaginatedResponse<RentalListing[]>
    let filter: NFTFilters
    let expectedQueryParameters: RentalsListingsFilterBy & {
      page?: number
      limit?: number
      sortBy?: RentalsListingsSortBy
      sortDirection?: RentalsListingSortDirection
    }

    beforeEach(async () => {
      response = {
        ok: true,
        data: {
          results: [],
          pages: 1,
          page: 1,
          limit: 50,
          total: 0,
        },
      }
      fetchResponse = {
        status: 200,
        ok: true,
        json: jest.fn().mockResolvedValueOnce(response) as any,
      } as Response
      fetchMock.mockResolvedValueOnce(fetchResponse)
      filter = {
        first: 10,
        skip: 2,
        sortBy: NFTSortBy.MIN_RENTAL_PRICE,
        category: NFTCategory.PARCEL,
        owner: '0x0',
        isOnRent: true,
        search: 'Some text',
        contractAddresses: ['0x01'],
        tokenId: 'aTokenId',
        itemId: 'anItemId',
        network: Network.ETHEREUM,
      }
      result = await rentalsComponent.getRentalsListings(filter)
      expectedQueryParameters = {
        limit: filter.first,
        page: filter.skip,
        sortBy: RentalsListingsSortBy.MAX_RENTAL_PRICE,
        sortDirection: RentalsListingSortDirection.ASC,
        category: (filter.category as unknown) as RentalsListingsFilterByCategory,
        lessor: filter.owner,
        text: filter.search,
        contractAddresses: filter.contractAddresses,
        tokenId: filter.tokenId,
        network: filter.network,
        status: [RentalStatus.OPEN],
      }
    })

    it('should return the rentals listings', () => {
      return expect(result).toEqual(response)
    })

    it('should have called the API with the correct query parameters', () => {
      expect(fetchMock).toHaveBeenCalled()
      const fetchedUrl = new URL(fetchMock.mock.calls[0][0])
      fetchedUrl.searchParams.forEach((value, name) => {
        expect(value).toEqual(
          expectedQueryParameters[
            name as keyof RentalsListingsFilterBy
          ]?.toString()
        )
      })
    })
  })
})

describe('when getting the open rental listings by NFT id', () => {
  let rentalIds: string[]
  let result: RentalListing[]

  beforeEach(() => {
    fetchMock = jest.fn()
    fetchComponentMock = {
      fetch: fetchMock,
    }
    rentalsComponent = createRentalsComponent(
      { fetch: fetchComponentMock },
      rentalsURL,
      rentalsSubgraph
    )
  })

  describe("and the list of rental ids doesn't exhaust the length of the signature server's URL", () => {
    let response: SignaturesServerPaginatedResponse<RentalListing[]>
    beforeEach(async () => {
      rentalIds = Array.from({ length: 2 }, (_, i) => `parcel-${i}`)
      response = {
        ok: true,
        data: {
          results: rentalIds.map((id) => ({
            id,
          })) as RentalListing[],
          page: 1,
          pages: 1,
          limit: 50,
          total: 2,
        },
      }
      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValueOnce(response),
      })

      result = await rentalsComponent.getRentalsListingsOfNFTs(rentalIds)
    })

    it('should fetch and return the rental listings once', () => {
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })

    it('should have queried all the nft ids', () => {
      const parsedUrl = new URL(fetchMock.mock.calls[0][0])
      expect(parsedUrl.searchParams.getAll('nftIds')).toEqual(rentalIds)
    })

    it('should return the rental listings', () => {
      expect(result).toEqual(response.data.results)
    })
  })

  describe("and the list of rental ids exhausts the length of the signature server's URL twice", () => {
    let responses: SignaturesServerPaginatedResponse<RentalListing[]>[]

    beforeEach(async () => {
      rentalIds = Array.from({ length: 200 }, (_, i) => `parcel-${i}`)
      responses = [
        {
          ok: true,
          data: {
            results: rentalIds.map((id) => ({
              id,
            })) as RentalListing[],
            page: 1,
            pages: 2,
            limit: 50,
            total: 500,
          },
        },
        {
          ok: true,
          data: {
            results: rentalIds.map((id) => ({
              id,
            })) as RentalListing[],
            page: 2,
            pages: 2,
            limit: 50,
            total: 500,
          },
        },
      ]

      responses.forEach((response) => {
        fetchMock.mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: jest.fn().mockResolvedValueOnce(response),
        })
      })

      result = await rentalsComponent.getRentalsListingsOfNFTs(rentalIds)
    })

    it('should fetch and return the rental listings twice', () => {
      expect(fetchMock).toHaveBeenCalledTimes(2)
    })

    it('should have queried all the nft ids', () => {
      expect(
        fetchMock.mock.calls.flatMap((call) =>
          new URL(call[0]).searchParams.getAll('nftIds')
        )
      ).toEqual(rentalIds)
    })

    it('should return the rental listings', () => {
      expect(result).toEqual(
        responses.flatMap((response) => response.data.results)
      )
    })
  })

  describe('and fetching the list of rental fails', () => {
    beforeEach(() => {
      rentalIds = Array.from({ length: 1 }, (_, i) => `parcel-${i}`)
      fetchResponse = {
        status: 500,
        json: jest.fn().mockResolvedValueOnce({
          ok: false,
          message: error,
        }) as any,
      } as Response
      fetchMock.mockResolvedValueOnce(fetchResponse)
    })

    it('should throw an error with the message returned in the JSON message', () => {
      return expect(
        rentalsComponent.getRentalsListingsOfNFTs(rentalIds)
      ).rejects.toThrowError(error)
    })
  })
})

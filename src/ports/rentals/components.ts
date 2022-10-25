import {
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
import pLimit from 'p-limit'
import { IFetchComponent } from '@well-known-components/http-server'
import {
  IRentalsComponent,
  SignaturesServerErrorResponse,
  SignaturesServerPaginatedResponse,
} from './types'
import { Response } from 'node-fetch'

const MAX_CONCURRENT_REQUEST = 5
const MAX_URL_LENGTH = 2048

export function createRentalsComponent(
  { fetch: fetchComponent }: { fetch: IFetchComponent },
  rentalsUrl: string
): IRentalsComponent {
  function buildGetRentalsParameters(
    filters: NFTFilters &
      Pick<RentalsListingsFilterBy, 'tenant' | 'status' | 'nftIds'>
  ): string {
    const parameters: RentalsListingsFilterBy & {
      page?: number
      limit?: number
      sortBy?: RentalsListingsSortBy
      sortDirection?: RentalsListingSortDirection
    } = {}
    parameters.limit = filters.first
    parameters.page = filters.skip
    parameters.text = filters.search
    parameters.category =
      filters.category === NFTCategory.PARCEL ||
      filters.category === NFTCategory.ESTATE
        ? ((filters.category as unknown) as RentalsListingsFilterByCategory)
        : undefined
    parameters.lessor = filters.owner
    parameters.tenant = filters.tenant
    // If the status is not specified, always ask for the open rentals
    if (!filters.status) {
      parameters.status = [RentalStatus.OPEN]
    } else if (Array.isArray(filters.status) && filters.status.length > 0) {
      parameters.status = filters.status
    } else {
      parameters.status = [filters.status as RentalStatus]
    }
    parameters.tokenId = filters.tokenId
    parameters.network = filters.network

    switch (filters.sortBy) {
      case NFTSortBy.NAME:
        parameters.sortBy = RentalsListingsSortBy.NAME
        parameters.sortDirection = RentalsListingSortDirection.ASC
        break
      case NFTSortBy.NEWEST:
        parameters.sortBy = RentalsListingsSortBy.LAND_CREATION_DATE
        parameters.sortDirection = RentalsListingSortDirection.DESC
        break
      case NFTSortBy.MAX_RENTAL_PRICE:
        parameters.sortBy = RentalsListingsSortBy.MAX_RENTAL_PRICE
        parameters.sortDirection = RentalsListingSortDirection.DESC
        break
      case NFTSortBy.MIN_RENTAL_PRICE:
        parameters.sortBy = RentalsListingsSortBy.MAX_RENTAL_PRICE
        parameters.sortDirection = RentalsListingSortDirection.ASC
        break
      case NFTSortBy.RENTAL_LISTING_DATE:
        parameters.sortBy = RentalsListingsSortBy.RENTAL_LISTING_DATE
        parameters.sortDirection = RentalsListingSortDirection.DESC
        break
      case NFTSortBy.RENTAL_DATE:
        parameters.sortBy = RentalsListingsSortBy.RENTAL_DATE
        parameters.sortDirection = RentalsListingSortDirection.DESC
        break
      case undefined:
      case null:
        parameters.sortBy = RentalsListingsSortBy.RENTAL_LISTING_DATE
        parameters.sortDirection = RentalsListingSortDirection.DESC
        break
      default:
        throw new Error('Invalid sort parameter for the rentals')
    }

    return Object.entries(parameters)
      .filter(([_, value]) => Boolean(value))
      .map(([key, value], index) => {
        let param: string = index === 0 ? '?' : ''
        if (Array.isArray(value)) {
          param = `${param}${value.map((val) => `${key}=${val}`).join('&')}`
        } else {
          param = `${param}${key}=${value}`
        }

        return param
      })
      .join('&')
  }

  async function processGetRentalsError(response: Response) {
    let parsedErrorResult: SignaturesServerErrorResponse<any> | undefined
    try {
      parsedErrorResult = await response.json()
    } catch (_) {
      // Ignore the JSON parse result error error.
    }

    if (parsedErrorResult) {
      throw new Error(parsedErrorResult.message)
    }

    throw new Error(
      `Error fetching rentals, the server responded with: ${response.status}`
    )
  }

  async function getRentalsListingsOfNFTs(
    nftIds: string[],
    status?: RentalStatus | RentalStatus[]
  ): Promise<RentalListing[]> {
    const baseUrl = `${rentalsUrl}/v1/rentals-listings${buildGetRentalsParameters(
      {
        status,
      }
    )}`
    const limit = pLimit(MAX_CONCURRENT_REQUEST)

    // Build URLs to get all the queried NFTs
    let urls: string[] = []
    let url = baseUrl
    for (let nftId of nftIds) {
      if (url.length < MAX_URL_LENGTH) {
        url += `&nftIds=${nftId}`
      } else {
        urls.push(url)
        url = baseUrl + `&nftIds=${nftId}`
      }
    }

    // Push the last url
    if (url !== baseUrl) {
      urls.push(url)
    }

    const results: SignaturesServerPaginatedResponse<
      RentalListing[]
    >[] = await Promise.all(
      urls.map((url) =>
        limit(async () => {
          try {
            const response = await fetchComponent.fetch(url)
            if (!response.ok) {
              await processGetRentalsError(response)
            }

            const parsedResult = await response.json()
            if (!parsedResult.ok) {
              throw new Error(parsedResult.message)
            }

            return parsedResult
          } catch (error) {
            limit.clearQueue()
            throw error
          }
        })
      )
    )

    return results.flatMap((result) => result.data.results)
  }

  async function getRentalsListings(
    filters: NFTFilters
  ): Promise<SignaturesServerPaginatedResponse<RentalListing[]>> {
    const parameters = buildGetRentalsParameters(filters)

    const response = await fetchComponent.fetch(
      `${rentalsUrl}/v1/rentals-listings${parameters}`
    )

    if (!response.ok) {
      await processGetRentalsError(response)
    }

    const parsedResult: SignaturesServerPaginatedResponse<
      RentalListing[]
    > = await response.json()

    if (!parsedResult.ok) {
      throw new Error(
        (parsedResult as SignaturesServerErrorResponse<any>).message
      )
    }

    return parsedResult
  }

  return {
    getRentalsListings,
    getRentalsListingsOfNFTs,
  }
}

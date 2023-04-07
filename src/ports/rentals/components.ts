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
import { IFetchComponent } from '@well-known-components/http-server'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { HTTPErrorResponseBody } from '../../types/server'
import {
  processRequestError,
  queryMultipleTimesWhenExceedingUrlLimit,
} from '../utils'
import {
  GetRentalAssetFilters,
  IRentalsComponent,
  RentalAsset,
  SignaturesServerPaginatedResponse,
} from './types'

const DEFAULT_FIRST = 24
const DEFAULT_OFFSET = 0

export function createRentalsComponent(
  { fetch: fetchComponent }: { fetch: IFetchComponent },
  rentalsUrl: string,
  rentalsSubgraph: ISubgraphComponent
): IRentalsComponent {
  function buildGetRentalsParameters(
    filters: NFTFilters &
      Pick<RentalsListingsFilterBy, 'tenant' | 'status' | 'nftIds'>
  ): string {
    const parameters: RentalsListingsFilterBy & {
      offset?: number
      limit?: number
      sortBy?: RentalsListingsSortBy
      sortDirection?: RentalsListingSortDirection
    } = {}

    parameters.limit = filters.first ?? DEFAULT_FIRST
    parameters.offset = filters.skip ?? DEFAULT_OFFSET
    parameters.text = filters.search
    parameters.category =
      filters.category === NFTCategory.PARCEL ||
      filters.category === NFTCategory.ESTATE
        ? (filters.category as unknown as RentalsListingsFilterByCategory)
        : undefined
    parameters.lessor = filters.owner
    parameters.tenant = filters.tenant
    parameters.minPricePerDay = filters.minPrice
    parameters.maxPricePerDay = filters.maxPrice
    parameters.adjacentToRoad = filters.adjacentToRoad
    parameters.minDistanceToPlaza = filters.minDistanceToPlaza
    parameters.maxDistanceToPlaza = filters.maxDistanceToPlaza
    parameters.minEstateSize = filters.minEstateSize
    parameters.maxEstateSize = filters.maxEstateSize
    parameters.rentalDays = filters.rentalDays

    // OPEN rentals will be queried by default.
    parameters.status = [RentalStatus.OPEN]

    if (filters.rentalStatus) {
      if (Array.isArray(filters.rentalStatus)) {
        if (filters.rentalStatus.length > 0) {
          parameters.status = filters.rentalStatus
        }
      } else {
        parameters.status = [filters.rentalStatus]
      }
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
        parameters.sortDirection = RentalsListingSortDirection.ASC
        break
      case NFTSortBy.MIN_RENTAL_PRICE:
        parameters.sortBy = RentalsListingsSortBy.MIN_RENTAL_PRICE
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

  async function getRentalsListingsOfNFTs(
    nftIds: string[],
    status?: RentalStatus | RentalStatus[]
  ): Promise<RentalListing[]> {
    const baseUrl = `${rentalsUrl}/v1/rentals-listings${buildGetRentalsParameters(
      {
        rentalStatus: status,
      }
    )}`

    return queryMultipleTimesWhenExceedingUrlLimit(
      baseUrl,
      'nftIds',
      nftIds,
      fetchComponent
    )
  }

  async function getRentalsListings(
    filters: NFTFilters
  ): Promise<SignaturesServerPaginatedResponse<RentalListing[]>> {
    const parameters = buildGetRentalsParameters(filters)

    const response = await fetchComponent.fetch(
      `${rentalsUrl}/v1/rentals-listings${parameters}`
    )

    if (!response.ok) {
      await processRequestError('fetching rentals', response)
    }

    const parsedResult: SignaturesServerPaginatedResponse<RentalListing[]> =
      await response.json()

    if (!parsedResult.ok) {
      throw new Error((parsedResult as HTTPErrorResponseBody<any>).message)
    }

    return parsedResult
  }

  async function getRentalAssets(
    filters: GetRentalAssetFilters
  ): Promise<RentalAsset[]> {
    function getSubgraphQueryOptions() {
      const queryOptions: string[] = []

      const where: string[] = []

      if (filters.contractAddresses && filters.contractAddresses.length > 0) {
        where.push(
          `contractAddress_in:[${filters.contractAddresses
            .map((contractAddress) => `"${contractAddress}"`)
            .join(',')}]`
        )
      }

      if (filters.tokenIds && filters.tokenIds.length > 0) {
        where.push(
          `tokenId_in:[${filters.tokenIds
            .map((tokenId) => `"${tokenId}"`)
            .join(',')}]`
        )
      }

      if (filters.lessors && filters.lessors.length > 0) {
        where.push(
          `lessor_in:[${filters.lessors
            .map((lessor) => `"${lessor}"`)
            .join(',')}]`
        )
      }

      if (filters.isClaimed !== undefined) {
        where.push(`isClaimed:${filters.isClaimed}`)
      }

      if (where.length > 0) {
        queryOptions.push(`where:{${where.join(',')}}`)
      }

      if (filters.first !== undefined) {
        queryOptions.push(`first:${filters.first}`)
      }

      if (filters.skip !== undefined) {
        queryOptions.push(`skip:${filters.skip}`)
      }

      if (queryOptions.length === 0) {
        return ''
      }

      return `(${queryOptions.join(',')})`
    }

    const { rentalAssets } = await rentalsSubgraph.query<{
      rentalAssets: RentalAsset[]
    }>(`
      {
        rentalAssets${getSubgraphQueryOptions()} {
          id
          contractAddress
          tokenId
          lessor
          isClaimed
        }
      }
    `)

    return rentalAssets
  }

  return {
    getRentalsListings,
    getRentalsListingsOfNFTs,
    getRentalAssets,
  }
}

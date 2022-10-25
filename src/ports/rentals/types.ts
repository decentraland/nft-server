import { NFTFilters, RentalListing, RentalStatus } from '@dcl/schemas'

export type IRentalsComponent = {
  getRentalsListings(
    filters: NFTFilters
  ): Promise<SignaturesServerPaginatedResponse<RentalListing[]>>

  getRentalsListingsOfNFTs(
    nftIds: string[],
    status?: RentalStatus[]
  ): Promise<RentalListing[]>
}

export type SignaturesServerPaginatedResponse<T> = {
  ok: boolean
  data: {
    results: T
    total: number
    page: number
    pages: number
    limit: number
  }
}

export type SignaturesServerErrorResponse<T> = {
  ok: boolean
  message: string
  data?: T
}

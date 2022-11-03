import { NFTFilters, RentalListing, RentalStatus } from '@dcl/schemas'

export type IRentalsComponent = {
  getRentalsListings(
    filters: NFTFilters
  ): Promise<SignaturesServerPaginatedResponse<RentalListing[]>>

  getRentalsListingsOfNFTs(
    nftIds: string[],
    status?: RentalStatus | RentalStatus[]
  ): Promise<RentalListing[]>

  getRentalAssets(filters: GetRentalAssetFilters): Promise<RentalAsset[]>
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

export type RentalAsset = {
  id: string
  contractAddress: string
  tokenId: string
  lessor: string
  isClaimed: boolean
}

export type GetRentalAssetFilters = {
  contractAddresses?: string[]
  tokenIds?: string[]
  lessors?: string[]
}

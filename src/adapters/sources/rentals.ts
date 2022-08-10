import {
  NFTFilters,
  NFTSortBy,
  RentalListing,
  RentalStatus,
} from '@dcl/schemas'
import { shouldFetch } from '../../logic/nfts/rentals'
import { convertNFTResultToSortableResult } from '../../logic/nfts/utils'
import {
  FetchOptions,
  IMergerComponent,
  Sortable,
} from '../../ports/merger/types'
import { INFTsComponent, NFTResult } from '../../ports/nfts/types'
import { IRentalsComponent } from '../../ports/rentals/types'

export function createRentalsNFTSource(
  rentals: IRentalsComponent,
  nfts: INFTsComponent
): IMergerComponent.Source<NFTResult, NFTFilters, NFTSortBy> {
  async function enhanceRentalListing(
    rentals: RentalListing[]
  ): Promise<Sortable<NFTResult, NFTSortBy>[]> {
    const nftResults: NFTResult[] = await Promise.all(
      rentals.map(async (rental) => {
        const nftResult = await nfts.fetchOne(
          rental.contractAddress,
          rental.tokenId
        )
        if (!nftResult) {
          throw new Error('NFT for the rental listing was not found')
        }

        return {
          ...nftResult,
          rental,
        }
      })
    )

    return nftResults.map(convertNFTResultToSortableResult)
  }

  async function fetch(
    filters: FetchOptions<NFTFilters, NFTSortBy>
  ): Promise<Sortable<NFTResult, NFTSortBy>[]> {
    if (!shouldFetch(filters)) {
      return []
    }

    const paginatedRentalListings = await rentals.getRentalsListings({
      ...filters,
      status: RentalStatus.OPEN,
    })
    return enhanceRentalListing(paginatedRentalListings.data.results)
  }

  async function count(
    filters: FetchOptions<NFTFilters, NFTSortBy>
  ): Promise<number> {
    if (!shouldFetch(filters)) {
      return 0
    }

    const results = await rentals.getRentalsListings(filters)
    return results.data.total
  }

  async function fetchWithCount(
    filters: NFTFilters
  ): Promise<{ data: Sortable<NFTResult, NFTSortBy>[]; count: number }> {
    if (!shouldFetch(filters)) {
      return {
        data: [],
        count: 0,
      }
    }

    const results = await rentals.getRentalsListings(filters)
    return {
      data: await enhanceRentalListing(results.data.results),
      count: results.data.total,
    }
  }

  return {
    fetch,
    count,
    fetchWithCount,
  }
}

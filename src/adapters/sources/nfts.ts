import { NFTFilters, NFTSortBy, RentalListing } from '@dcl/schemas'
import {
  buildNftId,
  convertNFTResultToSortableResult,
  isLAND,
} from '../../logic/nfts/utils'
import { FetchOptions, IMergerComponent } from '../../ports/merger/types'
import { INFTsComponent, NFTResult } from '../../ports/nfts/types'
import { IRentalsComponent } from '../../ports/rentals/types'

export function createNFTsSource(
  nfts: INFTsComponent,
  options?: {
    rentals?: IRentalsComponent
    shouldFetch?: (options: NFTFilters) => boolean
  }
): IMergerComponent.Source<NFTResult, NFTFilters, NFTSortBy> {
  async function enhanceNFTsWithRentalListings(
    nftResults: NFTResult[],
    rentalStatus?: NFTFilters['rentalStatus']
  ): Promise<NFTResult[]> {
    if (!options || !options.rentals) {
      return nftResults
    }

    const rentalListings = await options.rentals.getRentalsListingsOfNFTs(
      nftResults
        .filter((nftResult) => isLAND(nftResult))
        .map((nftResult) => buildNftId(nftResult)),
      rentalStatus
    )

    const rentalsByNftId: Record<string, RentalListing> = rentalListings.reduce(
      (acc, rentalListing) => {
        return {
          ...acc,
          [rentalListing.nftId]: rentalListing,
        }
      },
      {}
    )

    return nftResults.map((nftResult) => ({
      ...nftResult,
      nft: {
        ...nftResult.nft,
        openRentalId: rentalsByNftId[buildNftId(nftResult)]
          ? rentalsByNftId[buildNftId(nftResult)].id
          : null,
      },
      rental: rentalsByNftId[buildNftId(nftResult)] ?? null,
    }))
  }

  async function fetch(filters: FetchOptions<NFTFilters, NFTSortBy>) {
    if (options && options.shouldFetch && !options.shouldFetch(filters)) {
      return []
    }

    const results = await nfts.fetch(filters)

    return (
      await enhanceNFTsWithRentalListings(results, filters.rentalStatus)
    ).map(convertNFTResultToSortableResult)
  }

  async function count(filters: FetchOptions<NFTFilters, NFTSortBy>) {
    if (options && options.shouldFetch && !options.shouldFetch(filters)) {
      return 0
    }

    return nfts.count(filters)
  }

  return {
    fetch,
    count,
  }
}

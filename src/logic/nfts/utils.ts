import { NFTCategory, NFTSortBy } from '@dcl/schemas'
import { Sortable } from '../../ports/merger/types'
import { NFTResult } from '../../ports/nfts/types'

export function isLAND(nftResult: NFTResult): boolean {
  return (
    nftResult.nft.category === NFTCategory.ESTATE ||
    nftResult.nft.category === NFTCategory.PARCEL
  )
}

export function buildNftId(nftResult: NFTResult): string {
  return `${nftResult.nft.category}-${nftResult.nft.contractAddress}-${nftResult.nft.tokenId}`
}

export function convertNFTResultToSortableResult(
  nftResult: NFTResult
): Sortable<NFTResult, NFTSortBy> {
  return {
    result: nftResult,
    sort: {
      [NFTSortBy.RECENTLY_LISTED]: nftResult.order
        ? nftResult.order.createdAt
        : null,
      [NFTSortBy.NAME]: nftResult.nft.name.toLowerCase(),
      [NFTSortBy.CHEAPEST]: nftResult.order ? +nftResult.order.price : null,
      [NFTSortBy.NEWEST]: nftResult.nft.createdAt,
      [NFTSortBy.RECENTLY_SOLD]: nftResult.nft.soldAt,
      // TODO: return the min rental price and the max rental price in the signatures server
      [NFTSortBy.MIN_RENTAL_PRICE]: '0',
      [NFTSortBy.MAX_RENTAL_PRICE]: '0',
      [NFTSortBy.RENTAL_DATE]: nftResult.rental?.startedAt ?? 0,
      [NFTSortBy.RENTAL_LISTING_DATE]: nftResult.rental?.createdAt ?? 0,
    },
  }
}

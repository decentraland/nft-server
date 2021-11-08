import { NFTFilters, NFTSortBy } from '@dcl/schemas'
import { FetchOptions, IMergerComponent } from '../../ports/merger/types'
import { INFTsComponent, NFTResult } from '../../ports/nfts/types'

export function createNFTsSource(
  nfts: INFTsComponent
): IMergerComponent.Source<NFTResult, NFTFilters, NFTSortBy> {
  async function fetch(filters: FetchOptions<NFTFilters, NFTSortBy>) {
    const results = await nfts.fetch(filters)
    return results.map((result) => ({
      result,
      sort: {
        [NFTSortBy.RECENTLY_LISTED]: result.order
          ? result.order.createdAt
          : null,
        [NFTSortBy.NAME]: result.nft.name.toLowerCase(),
        [NFTSortBy.CHEAPEST]: result.order ? +result.order.price : null,
        [NFTSortBy.NEWEST]: result.nft.createdAt,
        //@ts-ignore
        [NFTSortBy.RECENTLY_SOLD]: result.nft.soldAt,
      },
    }))
  }

  async function count(filters: FetchOptions<NFTFilters, NFTSortBy>) {
    return nfts.count(filters)
  }

  return {
    fetch,
    count,
  }
}

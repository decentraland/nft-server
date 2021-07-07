import { FetchOptions, Source } from '../../ports/merger/types'
import {
  INFTComponent,
  NFTOptions,
  NFTResult,
  NFTSortBy,
} from '../../ports/nfts/types'

export function createNFTsSource(
  nfts: INFTComponent
): Source<NFTResult, NFTOptions, NFTSortBy> {
  async function fetch(options: FetchOptions<NFTOptions, NFTSortBy>) {
    const results = await nfts.fetch(options)
    return results.map((result) => ({
      result,
      sort: {
        [NFTSortBy.RECENTLY_LISTED]: result.order
          ? result.order.createdAt
          : null,
        [NFTSortBy.NAME]: result.nft.name.toLowerCase(),
        [NFTSortBy.CHEAPEST]: result.order ? +result.order.price : null,
        [NFTSortBy.NEWEST]: result.nft.createdAt,
      },
    }))
  }

  async function count(options: FetchOptions<NFTOptions, NFTSortBy>) {
    const results = await nfts.fetch(options)
    return results.length
  }

  return {
    fetch,
    count,
  }
}

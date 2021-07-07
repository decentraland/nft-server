import { FetchOptions, Source } from '../../ports/merger/types'
import {
  Bid,
  BidOptions,
  BidSortBy,
  IBidsComponent,
} from '../../ports/bids/types'

export function createBidsSource(
  bids: IBidsComponent
): Source<Bid, BidOptions, BidSortBy> {
  async function fetch(options: FetchOptions<BidOptions, BidSortBy>) {
    const results = await bids.fetch(options)
    return results.map((result) => ({
      result,
      sort: {
        [BidSortBy.RECENTLY_LISTED]: result.createdAt,
        [BidSortBy.RECENTLY_UPDATED]: result.updatedAt,
        [BidSortBy.CHEAPEST]: +result.price,
      },
    }))
  }

  async function count(options: FetchOptions<BidOptions, BidSortBy>) {
    const results = await bids.fetch(options)
    return results.length
  }

  return {
    fetch,
    count,
  }
}

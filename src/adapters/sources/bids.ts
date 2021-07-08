import { FetchOptions, Source } from '../../ports/merger/types'
import {
  Bid,
  BidFilters,
  BidSortBy,
  IBidsComponent,
} from '../../ports/bids/types'

export function createBidsSource(
  bids: IBidsComponent
): Source<Bid, BidFilters, BidSortBy> {
  async function fetch(filters: FetchOptions<BidFilters, BidSortBy>) {
    const results = await bids.fetch(filters)
    return results.map((result) => ({
      result,
      sort: {
        [BidSortBy.RECENTLY_LISTED]: result.createdAt,
        [BidSortBy.RECENTLY_UPDATED]: result.updatedAt,
        [BidSortBy.CHEAPEST]: +result.price,
      },
    }))
  }

  async function count(filters: FetchOptions<BidFilters, BidSortBy>) {
    const results = await bids.fetch(filters)
    return results.length
  }

  return {
    fetch,
    count,
  }
}

import { Bid, BidFilters, BidSortBy } from '@dcl/schemas'
import { FetchOptions, IMergerComponent } from '../../ports/merger/types'
import { IBidsComponent } from '../../ports/bids/types'

export function createBidsSource(
  bids: IBidsComponent
): IMergerComponent.Source<Bid, BidFilters, BidSortBy> {
  async function fetch(filters: FetchOptions<BidFilters, BidSortBy>) {
    const results = await bids.fetch(filters)
    return results.map((result) => ({
      result,
      sort: {
        [BidSortBy.RECENTLY_OFFERED]: result.createdAt,
        [BidSortBy.RECENTLY_UPDATED]: result.updatedAt,
        [BidSortBy.MOST_EXPENSIVE]: +result.price,
      },
    }))
  }

  async function count(filters: FetchOptions<BidFilters, BidSortBy>) {
    const total = await bids.count(filters)
    return total
  }

  return {
    fetch,
    count,
  }
}

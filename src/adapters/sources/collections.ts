import { Collection, CollectionFilters, CollectionSortBy } from '@dcl/schemas'
import { FetchOptions, IMergerComponent } from '../../ports/merger/types'
import { ICollectionsComponent } from '../../ports/collections/types'

export function createCollectionsSource(
  collections: ICollectionsComponent
): IMergerComponent.Source<Collection, CollectionFilters, CollectionSortBy> {
  async function fetch(
    filters: FetchOptions<CollectionFilters, CollectionSortBy>
  ) {
    const results = await collections.fetch(filters)
    return results.map((result) => ({
      result,
      sort: {
        [CollectionSortBy.NEWEST]: result.createdAt,
        [CollectionSortBy.RECENTLY_REVIEWED]: result.reviewedAt,
        [CollectionSortBy.NAME]: result.name,
        [CollectionSortBy.SIZE]: result.size,
        [CollectionSortBy.RECENTLY_LISTED]: result.firstListedAt,
      },
    }))
  }

  async function count(
    filters: FetchOptions<CollectionFilters, CollectionSortBy>
  ) {
    const total = await collections.count(filters)
    return total
  }

  return {
    fetch,
    count,
  }
}

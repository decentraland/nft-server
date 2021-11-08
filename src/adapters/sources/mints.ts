import { Mint, MintFilters, MintSortBy } from '@dcl/schemas'
import { FetchOptions, IMergerComponent } from '../../ports/merger/types'
import { IMintsComponent } from '../../ports/mints/types'

export function createMintsSource(
  mints: IMintsComponent
): IMergerComponent.Source<Mint, MintFilters, MintSortBy> {
  async function fetch(filters: FetchOptions<MintFilters, MintSortBy>) {
    const results = await mints.fetch(filters)
    return results.map((result) => ({
      result,
      sort: {
        [MintSortBy.RECENTLY_MINTED]: result.timestamp,
        [MintSortBy.MOST_EXPENSIVE]: result.price ? +result.price : 0,
      },
    }))
  }

  async function count(filters: FetchOptions<MintFilters, MintSortBy>) {
    const total = await mints.count(filters)
    return total
  }

  return {
    fetch,
    count,
  }
}

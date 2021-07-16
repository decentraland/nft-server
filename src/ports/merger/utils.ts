import { Sortable, SortDirection } from './types'

export function sort<Result, SortBy extends string>(
  results: Sortable<Result, SortBy>[],
  by: SortBy | null = null,
  direction: SortDirection = SortDirection.ASC
): Result[] {
  const sorted = results.sort((a, b) => {
    if (by) {
      const isAsc = direction === SortDirection.ASC
      const up = isAsc ? -1 : 1
      const down = up === 1 ? -1 : 1
      // send nulls to the bottom always
      if (a.sort[by] === null) {
        return 1
      } else if (b.sort[by] === null) {
        return -1
      } else {
        // if not null sort by direction
        return a.sort[by]! < b.sort[by]! ? up : down
      }
    }
    return 0
  })
  return sorted.map((sortable) => sortable.result)
}

import { FetchOptions, IMergerComponent } from '../../ports/merger/types'
import {
  IVolumeComponent,
  VolumeData,
  VolumeFilters,
  VolumeSortBy,
} from '../../ports/volume/types'

export function createVolumeSource(
  volumes: IVolumeComponent
): IMergerComponent.Source<VolumeData, VolumeFilters, VolumeSortBy> {
  async function fetch(filters: FetchOptions<VolumeFilters, VolumeSortBy>) {
    const results = await volumes.fetch(filters)
    return results.map((result) => ({
      result,
      sort: {
        [VolumeSortBy.DATE]: result.date,
        [VolumeSortBy.MOST_SALES]: result.dailySales,
      },
    }))
  }

  async function count(filters: FetchOptions<VolumeFilters, VolumeSortBy>) {
    const total = await volumes.count(filters)
    return total
  }

  return {
    fetch,
    count,
  }
}

import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { HttpError } from '../../logic/http/response'
import { FetchOptions } from '../merger/types'
import {
  IOwnerDataComponent,
  OwnerFragment,
  OwnersFilters,
  OwnersSortBy,
} from './types'
import { MAX_RESULTS, getOwnersQuery } from './utils'

export function createOwnersComponent(options: {
  subgraph: ISubgraphComponent
}): IOwnerDataComponent {
  const { subgraph } = options

  async function fetchAndCount(
    filters: FetchOptions<OwnersFilters, OwnersSortBy>
  ) {
    if (filters.itemId === undefined || !filters.contractAddress) {
      throw new HttpError(
        'itemId and contractAddress are neccesary params.',
        400
      )
    }

    const parsedFilters: FetchOptions<OwnersFilters, OwnersSortBy> = {
      ...filters,
      sortBy: filters.sortBy as OwnersSortBy,
    }

    const data: { nfts: OwnerFragment[] } = await subgraph.query(
      getOwnersQuery(parsedFilters, false)
    )

    let count = 0

    while (true) {
      const countData: { nfts: { id: string }[] } = await subgraph.query(
        getOwnersQuery({ ...parsedFilters, skip: count }, true)
      )
      count += countData.nfts.length
      if (countData.nfts.length < MAX_RESULTS) break
    }

    const results = data.nfts.map((owner: OwnerFragment) => ({
      issuedId: owner.issuedId,
      ownerId: owner.owner.id,
      orderStatus: owner.searchOrderStatus,
      orderExpiresAt: owner.searchOrderExpiresAt,
      tokenId: owner.tokenId,
    }))

    return { data: results, total: count }
  }

  return {
    fetchAndCount,
  }
}

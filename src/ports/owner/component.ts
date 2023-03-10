import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { HttpError } from '../../logic/http/response'
import { FetchOptions } from '../merger/types'
import {
  IOwnerDataComponent,
  OwnerFragment,
  OwnersFilters,
  OwnersSortBy,
} from './types'
import { getOwnersQuery } from './utils'

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

    const countData: { nfts: { id: string }[] } = await subgraph.query(
      getOwnersQuery(parsedFilters, true)
    )

    const results = data.nfts.map((ownerF: OwnerFragment) => ({
      issuedId: ownerF.issuedId,
      ownerId: ownerF.owner.id,
      orderStatus: ownerF.searchOrderStatus,
      orderExpiresAt: ownerF.searchOrderExpiresAt,
      tokenId: ownerF.tokenId
    }))

    return { data: results, total: countData.nfts.length }
  }

  return {
    fetchAndCount,
  }
}

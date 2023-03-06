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

  async function fetch(filters: FetchOptions<OwnersFilters, OwnersSortBy>) {
    if (filters.itemId === undefined || !filters.contractAddress) {
      throw new HttpError(
        'itemId and contractAddress are neccesary params.',
        500
      )
    }

    const sortBy = filters.sortBy ? filters.sortBy : 'issuedId'
    const orderDirection = filters.orderDirection
      ? filters.orderDirection
      : 'desc'
    const newFilters: FetchOptions<OwnersFilters, OwnersSortBy> = {
      ...filters,
      sortBy: sortBy as OwnersSortBy,
      orderDirection: orderDirection,
    }

    const results: { nfts: OwnerFragment[] } = await subgraph.query(
      getOwnersQuery(newFilters)
    )
    return results.nfts.map((ownerF: OwnerFragment) => ({
      issuedId: ownerF.issuedId,
      ownerId: ownerF.owner.id,
    }))
  }

  async function count(filters: OwnersFilters) {
    const query = getOwnersQuery(filters)
    const { orders: fragments } = await subgraph.query<{
      orders: OwnerFragment[]
    }>(query)

    return fragments.length
  }

  return {
    fetch,
    count,
  }
}

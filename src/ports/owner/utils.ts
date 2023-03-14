import { FetchOptions } from '../merger/types'
import {
  OwnersFilters,
  OwnersSortBy,
} from './types'

export const MAX_RESULTS = 1000


export const getOwnerFragment = () => `
  fragment ownerFragment on NFT {
    issuedId
    owner {
      id
    }
    searchOrderStatus
    searchOrderExpiresAt
    tokenId
  }
`

export function getOwnersQuery(
  filters: FetchOptions<OwnersFilters, OwnersSortBy>,
  isCount: boolean
) {
  const first = isCount ? 1000 : filters.first
  const skip = isCount ? undefined : filters.skip

      return `
      query OwnersData{
       nfts(
          ${first ? `first: ${first}` : ''}
          ${skip ? `skip: ${skip}` : ''}
          ${filters.sortBy ? `orderBy: ${filters.sortBy}` : ''}
          ${filters.orderDirection ? `orderDirection: ${filters.orderDirection}` : ''}
          where: {contractAddress: "${filters.contractAddress}", itemBlockchainId: "${filters.itemId}" }) {
            ${isCount ? 'id' : `...ownerFragment`}
        }
      }
      ${isCount ? '' : getOwnerFragment()}
    `
  }


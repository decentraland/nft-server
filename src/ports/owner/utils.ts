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
  }
`

export function getOwnersQuery(
  filters: FetchOptions<OwnersFilters, OwnersSortBy>,
) {
      return `
      query OwnersData{
       nfts(
          ${filters.first ? `first: ${filters.first}` : ''}\
          ${filters.skip ? `skip: ${filters.skip}` : ''}
          orderBy: ${filters.sortBy || 'issuedId'}, 
          orderDirection: ${filters.orderDirection || 'desc'},
          where: {contractAddress: "${filters.contractAddress}", itemBlockchainId: "${filters.itemId}" }) {
            ...ownerFragment
        }
      }
      ${getOwnerFragment()}
    `
  }


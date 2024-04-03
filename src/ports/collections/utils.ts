import {
  ChainId,
  Collection,
  CollectionFilters,
  CollectionSortBy,
} from '@dcl/schemas'
import { getMarketplaceContracts } from '../../logic/contracts'
import { AssetsNetworks } from '../../types'
import { SortDirection } from '../merger/types'
import { CollectionFragment } from './types'

export const COLLECTION_DEFAULT_SORT_BY = CollectionSortBy.NAME

export function fromCollectionFragment(
  fragment: CollectionFragment,
  network: AssetsNetworks,
  chainId: ChainId
): Collection {
  const collection: Collection = {
    urn: fragment.urn,
    creator: fragment.creator,
    name: fragment.name,
    contractAddress: fragment.id,
    createdAt: +fragment.createdAt * 1000,
    updatedAt: +fragment.updatedAt * 1000,
    reviewedAt: +fragment.reviewedAt * 1000,
    isOnSale: fragment.searchIsStoreMinter,
    size: fragment.itemsCount,
    network,
    chainId,
    firstListedAt: fragment.firstListedAt
      ? +fragment.firstListedAt * 1000
      : null,
  }

  return collection
}

export const getCollectionFragment = () => `
  fragment collectionFragment on Collection {
    id
    urn
    name
    creator
    searchIsStoreMinter
    itemsCount
    createdAt
    updatedAt
    reviewedAt
    firstListedAt
  }
`

export function getCollectionsQuery(
  filters: CollectionFilters,
  isCount = false
) {
  const {
    first,
    skip,
    sortBy,
    name,
    search,
    creator,
    urn,
    contractAddress,
    isOnSale,
  } = filters

  const where: string[] = []

  if (contractAddress) {
    where.push(`id: "${contractAddress}"`)
  }

  if (creator) {
    where.push(`creator: "${creator}"`)
  }

  if (urn) {
    where.push(`urn: "${urn}"`)
  }

  if (isOnSale) {
    where.push('searchIsStoreMinter: true')
  }

  if (name) {
    where.push(`name: "${name}"`)
  }

  if (search) {
    where.push(`searchText_contains: "${search.trim().toLowerCase()}"`)
  }

  // Sorting by a nullable field will return null values first.
  // We do not want them so we filter them out.
  if (sortBy === CollectionSortBy.RECENTLY_LISTED) {
    where.push('firstListedAt_not: null')
  }

  const max = 1000
  const total = isCount
    ? max
    : typeof first !== 'undefined'
    ? typeof skip !== 'undefined'
      ? skip + first
      : first
    : max

  let orderBy: string
  let orderDirection: string
  switch (sortBy) {
    case CollectionSortBy.NEWEST:
      orderBy = 'createdAt'
      orderDirection = SortDirection.DESC
      break
    case CollectionSortBy.RECENTLY_REVIEWED:
      orderBy = 'reviewedAt'
      orderDirection = SortDirection.DESC
      break
    case CollectionSortBy.NAME:
      orderBy = 'name'
      orderDirection = SortDirection.ASC
      break
    case CollectionSortBy.SIZE:
      orderBy = 'itemsCount'
      orderDirection = SortDirection.DESC
      break
    case CollectionSortBy.RECENTLY_LISTED:
      orderBy = 'firstListedAt'
      orderDirection = SortDirection.DESC
      break
    default:
      orderBy = 'name'
      orderDirection = SortDirection.ASC
  }

  return `
    query Collections {
      collections(
        first: ${total}, 
        orderBy: ${orderBy}, 
        orderDirection: ${orderDirection}, 
        where: {
          isApproved: true
          ${where.join('\n')}
        }) 
        { ${isCount ? 'id' : `...collectionFragment`} }
    }
    ${isCount ? '' : getCollectionFragment()}
  `
}

export function getIsEthereumCollection(
  contractAddress: string,
  chainId: ChainId
) {
  const contracts = getMarketplaceContracts(chainId)
  const contract = contracts.find(
    (contract) =>
      contract.address.toLocaleLowerCase() ===
      contractAddress.toLocaleLowerCase()
  )
  return !!contract
}

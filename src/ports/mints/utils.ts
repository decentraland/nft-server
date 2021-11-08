import { ChainId, Mint, MintFilters, MintSortBy, Network } from '@dcl/schemas'
import { MintFragment } from './types'

export const MINT_DEFAULT_SORT_BY = MintSortBy.RECENTLY_MINTED

export function fromMintFragment(
  fragment: MintFragment,
  network: Network,
  chainId: ChainId
): Mint {
  const mint: Mint = {
    id: fragment.id,
    creator: fragment.creator,
    beneficiary: fragment.beneficiary,
    minter: fragment.minter,
    itemId: fragment.searchItemId,
    tokenId: fragment.searchTokenId,
    issuedId: fragment.searchIssuedId,
    contractAddress: fragment.searchContractAddress,
    price: fragment.searchPrimarySalePrice,
    timestamp: +fragment.timestamp * 1000,
    network,
    chainId,
  }

  return mint
}

export const getMintFragment = () => `
  fragment mintFragment on Mint {
    id
    creator
    beneficiary
    minter
    searchItemId
    searchTokenId
    searchIssuedId
    searchContractAddress
    searchPrimarySalePrice
    timestamp
  }
`

export function getMintsQuery(filters: MintFilters, isCount = false) {
  const {
    first,
    skip,
    sortBy,
    creator,
    beneficiary,
    minter,
    contractAddress,
    itemId,
    tokenId,
    issuedId,
    isSale,
  } = filters

  const where: string[] = []

  if (contractAddress) {
    where.push(`searchContractAddress: "${contractAddress}"`)
  }

  if (tokenId) {
    where.push(`searchTokenId: "${tokenId}"`)
  }

  if (itemId) {
    where.push(`searchItemId: "${itemId}"`)
  }

  if (issuedId) {
    where.push(`searchIssuedId: "${issuedId}"`)
  }

  if (creator) {
    where.push(`creator: "${creator}"`)
  }

  if (beneficiary) {
    where.push(`beneficiary: "${beneficiary}"`)
  }

  if (minter) {
    where.push(`minter: "${minter}"`)
  }

  if (isSale || sortBy === MintSortBy.MOST_EXPENSIVE) {
    where.push('searchIsStoreMinter: true')
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
    case MintSortBy.RECENTLY_MINTED:
      orderBy = 'timestamp'
      orderDirection = 'desc'
      break
    case MintSortBy.MOST_EXPENSIVE:
      orderBy = 'searchPrimarySalePrice'
      orderDirection = 'desc'
      break
    default:
      orderBy = 'timestamp'
      orderDirection = 'desc'
  }

  return `
    query Mints {
      mints(
        first: ${total}, 
        orderBy: ${orderBy}, 
        orderDirection: ${orderDirection}, 
        where: {
          ${where.join('\n')}
        }) 
        { ${isCount ? 'id' : `...mintFragment`} }
    }
    ${isCount ? '' : getMintFragment()}
  `
}

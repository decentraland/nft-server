import nodeFetch from 'node-fetch'
import { NFTCategory, NFTFilters, NFTSortBy } from '@dcl/schemas'
import { IPgComponent } from '@well-known-components/pg-component'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { INFTsComponent, NFTResult } from './types'
import {
  getByTokenIdQuery,
  getFetchOneQuery,
  getFetchQuery,
  getFuzzySearchQueryForENS,
  getQueryVariables,
} from './utils'
import { getMarketplaceChainId } from '../../logic/chainIds'
import {
  getLatestSubgraphSchema,
  getMarketplaceSubgraphNameChain,
} from '../../subgraphUtils'

export function createNFTComponent<T extends { id: string }>(options: {
  subgraph: ISubgraphComponent
  db?: IPgComponent
  listsServer?: string
  fragmentName: string
  getFragment: () => string
  fromFragment(fragment: T, caller?: string): NFTResult
  getSortByProp(sortBy?: NFTSortBy): keyof T
  getExtraVariables?: (options: NFTFilters) => string[]
  getExtraWhere?: (options: NFTFilters) => string[]
  getShouldFetch?: (options: NFTFilters) => boolean
}): INFTsComponent {
  const {
    subgraph,
    db,
    fragmentName,
    getFragment,
    getSortByProp,
    getExtraWhere,
    getExtraVariables,
    fromFragment,
    getShouldFetch,
    listsServer,
  } = options

  function getFragmentFetcher(filters: NFTFilters & { caller?: string }) {
    return async (isCount?: boolean) => {
      const query = getFetchQuery(
        filters,
        fragmentName,
        getFragment,
        getExtraVariables,
        getExtraWhere,
        isCount,
        filters.category === NFTCategory.ENS ? await getBannedNames() : []
      )
      const variables = getQueryVariables(filters, getSortByProp)
      const { nfts: fragments } = await subgraph.query<{
        nfts: T[]
      }>(query, variables)
      return fragments
    }
  }

  async function getBannedNames() {
    try {
      const bannedNames = await nodeFetch(`${listsServer}/banned-names`, {
        method: 'POST',
      })

      const data: { data: string[] } = await bannedNames.json()
      return data.data
    } catch (error) {
      console.error('Error fetching banned names: ', error)
      // if there was an error fetching the lists server, return an empty array
      return []
    }
  }

  async function fetch(
    options: NFTFilters & { caller?: string }
  ): Promise<NFTResult[]> {
    if (getShouldFetch && !getShouldFetch(options)) {
      return []
    }
    if (
      options.tokenId &&
      options.contractAddresses &&
      options.contractAddresses.length > 0
    ) {
      const nft = await fetchOne(
        options.contractAddresses[0],
        options.tokenId,
        options.caller
      )
      return nft ? [nft] : []
    } else if (options.tokenId) {
      throw new Error(
        'You need to provide a "contractAddress" as well when filtering by "tokenId"'
      )
    }

    // In order to support fuzzy search for ENS names, we're going to first fetch the ids matching the search text in the db using trigram matching and then pass those ids down to the graphql query
    if (options.category === NFTCategory.ENS && options.search && db) {
      try {
        const client = await db.getPool().connect()
        const schemaName = await client.query<{
          entity_schema: string
        }>(
          getLatestSubgraphSchema(
            getMarketplaceSubgraphNameChain(getMarketplaceChainId())
          )
        )
        const ids = await client.query<{ id: string }>(
          getFuzzySearchQueryForENS(
            schemaName.rows[0].entity_schema,
            options.search
          )
        )
        // if there are no ids matching the search text, return empty result
        if (!ids.rows.length) {
          return []
        }
        options.ids = ids.rows.map(({ id }) => id) // adds the ids to the main `ids` filter
        options.search = undefined // cleans the search text since it's already filtered
      } catch (error) {}
    }

    const fetchFragments = getFragmentFetcher(options)
    const fragments = await fetchFragments()
    const nfts = fragments.map((fragment) =>
      fromFragment(fragment, options.caller)
    )
    return nfts
  }

  async function count(options: NFTFilters): Promise<number> {
    if (getShouldFetch && !getShouldFetch(options)) {
      return 0
    }
    const fetchFragments = getFragmentFetcher(options)
    const fragments = await fetchFragments(true)
    return fragments.length
  }

  async function fetchOne(
    contractAddress: string,
    tokenId: string,
    caller?: string
  ): Promise<NFTResult | null> {
    const query = getFetchOneQuery(fragmentName, getFragment)
    const variables = {
      contractAddress,
      tokenId,
    }
    const { nfts: fragments } = await subgraph.query<{
      nfts: T[]
    }>(query, variables)
    if (fragments.length === 0) {
      return null
    } else {
      return fromFragment(fragments[0], caller)
    }
  }

  /**
   * Fetches up to 1000 NFTs by their token IDs.
   */
  async function fetchByTokenIds(tokenIds: string[]): Promise<NFTResult[]> {
    const query = getByTokenIdQuery(fragmentName, getFragment)
    const variables = {
      tokenIds,
    }
    const { nfts } = await subgraph.query<{
      nfts: T[]
    }>(query, variables)

    return nfts.map((f) => fromFragment(f))
  }

  return {
    fetch,
    fetchOne,
    fetchByTokenIds,
    count,
  }
}

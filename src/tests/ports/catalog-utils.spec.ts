import { CatalogFilters, ChainId, Network } from '@dcl/schemas'
import { getQuerySources } from '../../ports/catalog/utils'
import { getSubgraphNameForNetwork } from '../../subgraphUtils'

const marketplaceChainId = 1
const collectionsChainId = 137

jest.mock('../../logic/chainIds', () => ({
  getCollectionsChainId: () => collectionsChainId,
  getMarketplaceChainId: () => marketplaceChainId,
}))

describe('getQuerySources', () => {
  let filters: CatalogFilters
  let sources: Record<string, string>
  describe('when filtering by network', () => {
    beforeEach(() => {
      filters = { network: Network.ETHEREUM }
      sources = getQuerySources(filters)
    })
    it('should return sources for the provided network', () => {
      expect(sources).toEqual({
        [Network.ETHEREUM]: getSubgraphNameForNetwork(
          Network.ETHEREUM,
          marketplaceChainId as ChainId
        ),
      })
    })
  })

  describe('when filtering by creator', () => {
    beforeEach(() => {
      filters = { creator: ['someCreator'] }
      sources = getQuerySources(filters)
    })
    it('should return sources for the creator provided with default networks', () => {
      expect(sources).toEqual({
        [Network.MATIC]: getSubgraphNameForNetwork(
          Network.MATIC,
          collectionsChainId as ChainId
        ),
      })
    })
  })

  describe('when no filter is provided', () => {
    beforeEach(() => {
      filters = {}
      sources = getQuerySources(filters)
    })
    it('should return sources for default networks', () => {
      expect(sources).toEqual({
        [Network.ETHEREUM]: getSubgraphNameForNetwork(
          Network.ETHEREUM,
          marketplaceChainId as ChainId
        ),
        [Network.MATIC]: getSubgraphNameForNetwork(
          Network.MATIC,
          collectionsChainId as ChainId
        ),
      })
    })
  })
})

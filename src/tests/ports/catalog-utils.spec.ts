import { ChainId, Network } from '@dcl/schemas'
import { getQuerySources } from '../../ports/catalog/utils'
import { getSubgraphNameForNetwork } from '../../subgraphUtils'

const marketplaceChainId = 1
const collectionsChainId = 137

jest.mock('../../logic/chainIds', () => ({
  getCollectionsChainId: () => collectionsChainId,
  getMarketplaceChainId: () => marketplaceChainId,
}))

describe('getQuerySources', () => {
  it('should return sources for a specific network', () => {
    const filters = { network: Network.ETHEREUM }
    const sources = getQuerySources(filters)
    expect(sources).toEqual({
      [Network.ETHEREUM]: getSubgraphNameForNetwork(
        Network.ETHEREUM,
        marketplaceChainId as ChainId
      ),
    })
  })

  it('should return sources for a specific creator with default networks', () => {
    const filters = { creator: ['someCreator'] }
    const sources = getQuerySources(filters)
    expect(sources).toEqual({
      [Network.MATIC]: getSubgraphNameForNetwork(
        Network.MATIC,
        collectionsChainId as ChainId
      ),
    })
  })

  it('should return sources for default networks when no filter is provided', () => {
    const filters = {}
    const sources = getQuerySources(filters)
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

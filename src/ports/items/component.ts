import { ChainId, ItemFilters, Network } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { IItemsComponent, ItemFragment } from './types'
import { fromItemFragment, getItemsQuery } from './utils'
import { getMarketplaceChainId } from '../../logic/chainIds'
import { getMarketplaceContracts } from '../../logic/contracts'

export function createItemsComponent(
  options: {
    subgraph: ISubgraphComponent
    network: Network
    chainId: ChainId
  }[]
): IItemsComponent {
  // const { subgraph, network, chainId } = options

  async function fetch(filters: ItemFilters) {
    let option = options.find((option) => option.network === Network.MATIC)
    if (
      getMarketplaceContracts(getMarketplaceChainId()).find(
        (marketplaceContract) =>
          filters.contractAddresses &&
          filters.contractAddresses[0] &&
          marketplaceContract.address === filters.contractAddresses[0]
      )
    ) {
      option = options.find((option) => option.network === Network.ETHEREUM)
    }

    if (!option) return []

    const { subgraph, network, chainId } = option

    if (filters.network && filters.network !== network) {
      return []
    }

    const query = getItemsQuery(filters)
    const { items: fragments } = await subgraph.query<{
      items: ItemFragment[]
    }>(query)
    const items = fragments.map((fragment) =>
      fromItemFragment(fragment, network, chainId)
    )
    return items
  }

  async function count(filters: ItemFilters) {
    let option = options.find((option) => option.network === Network.MATIC)
    if (
      getMarketplaceContracts(getMarketplaceChainId()).find(
        (marketplaceContract) =>
          filters.contractAddresses &&
          filters.contractAddresses[0] &&
          marketplaceContract.address === filters.contractAddresses[0]
      )
    ) {
      option = options.find((option) => option.network === Network.ETHEREUM)
    }

    if (!option) return 0

    const { subgraph, network } = option

    if (filters.network && filters.network !== network) {
      return 0
    }

    const query = getItemsQuery(filters, true)
    const { items: fragments } = await subgraph.query<{
      items: ItemFragment[]
    }>(query)
    return fragments.length
  }

  return {
    fetch,
    count,
  }
}

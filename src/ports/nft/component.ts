import { Network } from '@dcl/schemas'
import { createCollectionsComponent } from './sources/collections/component'
import { createMarketplaceComponent } from './sources/marketplace/component'
import {
  INFTComponent,
  NFTOptions,
  NFTComponents,
  SortBy,
  SortableNFT,
  NFT,
  DEFAULT_SORT_BY,
} from './types'
import { getOrderDirection } from './utils'

function sort(nfts: SortableNFT[], sortBy?: SortBy) {
  const sortDirection = getOrderDirection(sortBy)
  const isAsc = sortDirection === 'asc'
  return nfts.sort((a, b) => {
    const up = isAsc ? -1 : 1
    const down = up === 1 ? -1 : 1
    const apply = (by: SortBy) => {
      // send nulls to the bottom always
      return a.sort[by] === null
        ? 1
        : b.sort[by] === null
        ? -1
        : // if not null sort by orderDirection
        a.sort[by]! < b.sort[by]!
        ? up
        : down
    }
    return apply(sortBy || DEFAULT_SORT_BY)
  })
}

function removeSortData(sortable: SortableNFT): NFT {
  const { sort: _, ...nft } = sortable
  return nft
}

function filterByNetwork(network: Network) {
  return (nft: NFT) => nft.network.toLowerCase() === network.toLowerCase()
}

export function createNFTComponent(components: NFTComponents): INFTComponent {
  const marketplace = createMarketplaceComponent(components)
  const collections = createCollectionsComponent(components)

  return {
    fetch: async (options: NFTOptions) => {
      // gather results from all the sources
      const results = await Promise.all([
        marketplace.fetch(options),
        collections.fetch(options),
      ])

      // sort results
      const sorted = sort(
        results.reduce((nfts, all) => all.concat(nfts)),
        options.sortBy
      ).map(removeSortData) // remove data needed for sort purposes

      // if necessary filter by network filter
      const shouldFilterNetwork = Object.values(Network)
        .map((network) => network.toString().toLowerCase())
        .includes(options.network!)
      const filtered = shouldFilterNetwork
        ? sorted.filter(filterByNetwork(options.network!))
        : sorted

      // return the limit of results
      return filtered.slice(options.skip, options.first + options.skip)
    },
  }
}

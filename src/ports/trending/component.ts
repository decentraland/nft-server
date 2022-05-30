import seedrandom from 'seedrandom'
import { Sale, SaleFilters, SaleSortBy } from '@dcl/schemas'

import { IMergerComponent } from '../merger/types'
import { getDateXDaysAgo } from '../analyticsDayData/utils'
import { INFTsComponent, NFTResult } from '../nfts/types'
import { ITrendingsComponent, TrendingFilters } from './types'

const DEFAULT_SIZE = 20
const SALES_CUT = 0.6
const VOLUME_CUT = 0.4

export function createTrendingsComponent(
  salesComponent: IMergerComponent<Sale, SaleFilters, SaleSortBy>,
  nftsComponent: INFTsComponent
): ITrendingsComponent {
  /**
   * The fetch will return the trending NFTs based on the sales amount and volume.
   * The current logic gets the 60% with more sales and the 40% with more traded volume. Then uses seedrandom to shuffle the concatenated array in a deterministic order.
   * @param filters TrendingFilters
   * @returns NFT
   */
  async function fetch(filters: TrendingFilters) {
    // Fetch all sales from the past 24hs
    const sales = await salesComponent.fetch({
      from: getDateXDaysAgo(1).getTime(),
      sortBy: SaleSortBy.MOST_EXPENSIVE, // sort by volume
    })

    // Fetch all the nfts from those 24hs sales
    const nftResults = (
      await Promise.all(
        sales.map((sale) =>
          nftsComponent.fetch({
            tokenId: sale.tokenId,
            contractAddresses: [sale.contractAddress],
            itemId: sale.itemId || '',
          })
        )
      )
    ).reduce((a, b) => a.concat(b), []) // flatten the array of arrays

    // Get trending sales by amount of sales
    const trendingSales = sales.reduce((acc, sale) => {
      const key = `${sale.contractAddress}-${sale.itemId}`
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const trendingBySales: NFTResult[] = []
    new Map(
      [...Object.entries(trendingSales)].sort((a, b) => b[1] - a[1])
    ).forEach((_value, key) =>
      trendingBySales.push(
        nftResults.find(
          ({ nft }) =>
            key.split('-')[0] === nft.contractAddress &&
            key.split('-')[1] === nft.itemId
        )!
      )
    )

    // Get 60% of the trending sales by amount
    const slicedTrendingBySales = trendingBySales.slice(
      0,
      (filters.size || DEFAULT_SIZE) * SALES_CUT
    )

    // Get the trending ones by volume, making sure is not being repeated with the one from the trending sales.
    // It will iterate over sales which is already ordered by volume as it was used as the SortBy parameter.
    const trendingByVolume: NFTResult[] = sales
      .map((sale) => {
        const nft = nftResults.find(
          ({ nft }) =>
            nft.contractAddress === sale.contractAddress &&
            nft.itemId === sale.itemId
        )
        return !!nft &&
          !slicedTrendingBySales.find(
            (trendingBySalesNFT) => trendingBySalesNFT.nft.id === nft.nft.id
          )
          ? nft
          : undefined
      })
      .filter((nftResult): nftResult is NFTResult => !!nftResult) // filter out the undefined ones

    // Get 40% of the trending sales by volume
    const slicedTrendingByVolume = trendingByVolume.slice(
      0,
      (filters.size || DEFAULT_SIZE) * VOLUME_CUT
    )

    // Return a deterministic shuffled result using the nft.id as the seed for seedrandom
    return slicedTrendingBySales
      .concat(slicedTrendingByVolume)
      .sort(({ nft: nft1 }, { nft: nft2 }) =>
        seedrandom(nft1.id + nft2.id)() > 0.5 ? 1 : -1
      )
  }

  return {
    fetch,
  }
}

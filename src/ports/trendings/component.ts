import seedrandom from 'seedrandom'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { Item, Sale } from '@dcl/schemas'
import { getDateXDaysAgo } from '../analyticsDayData/utils'
import { IItemsComponent } from '../items/types'
import { ITrendingsComponent, TrendingFilters } from './types'
import {
  fromTrendingSaleFragment,
  getTrendingsQuery,
  TrendingSaleFragment,
} from './utils'

const DEFAULT_SIZE = 20
const MAX_RETRIES = 5
export const SALES_CUT = 0.6
export const VOLUME_CUT = 0.4

export function createTrendingsComponent(
  collectionsSubgraph: ISubgraphComponent,
  itemsComponent: IItemsComponent
): ITrendingsComponent {
  async function fetchTrendingSales(skip: number) {
    const query = getTrendingsQuery(
      { from: getDateXDaysAgo(1).getTime(), first: 1000, skip },
      false
    )
    const { sales: fragments } = await collectionsSubgraph.query<{
      sales: TrendingSaleFragment[]
    }>(query)

    const sales = fragments.map((fragment) =>
      fromTrendingSaleFragment(fragment)
    )

    return sales
  }
  /**
   * The fetch will return the trending NFTs based on the sales amount and volume.
   * The current logic gets the 60% with more sales and the 40% with more traded volume. Then uses seedrandom to shuffle the concatenated array in a deterministic order.
   * @param filters TrendingFilters
   * @returns NFT
   */
  async function fetch(filters: TrendingFilters) {
    // Fetch all sales from the past 48hs
    let sales: Pick<Sale, 'itemId' | 'contractAddress'>[] = []
    let items: Item[] = []
    let trendingSales: Record<string, number> = {}
    let retries = 0
    let skip = 0
    let remainingSales = 1000

    // iterate until we complete a whole page of items or reach max retries
    while (remainingSales === 1000 && retries < MAX_RETRIES) {
      const salesResponse = await fetchTrendingSales(skip)
      sales = [...sales, ...salesResponse]
      remainingSales = salesResponse.length
      skip += 1000
      retries++
      // Get trending sales by amount of sales
      trendingSales = sales.reduce((acc, sale) => {
        if (sale.itemId) {
          const key = `${sale.contractAddress}-${sale.itemId}`
          acc[key] = (acc[key] || 0) + 1
        }
        return acc
      }, {} as Record<string, number>)

      // Fetch all the items from those 48hs sales
      items = (
        await Promise.all(
          Object.keys(trendingSales).map((key) => {
            const [contractAddress, itemId] = key.split('-')
            return itemsComponent.fetch({
              contractAddress,
              itemId: itemId || undefined,
            })
          })
        )
      ).reduce((a, b) => a.concat(b), []) // flatten the array of arrays
    }

    const trendingBySales: Item[] = []
    new Map(
      [...Object.entries(trendingSales)].sort((a, b) => b[1] - a[1])
    ).forEach((_value, key) =>
      trendingBySales.push(
        items.find(
          (item) =>
            key.split('-')[0] === item.contractAddress &&
            key.split('-')[1] === item.itemId
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
    const trendingByVolume: Item[] = sales
      .map((sale) => {
        const itemFound = items.find(
          (item) =>
            item.contractAddress === sale.contractAddress &&
            item.itemId === sale.itemId
        )
        return !!itemFound &&
          !slicedTrendingBySales.find(
            (trendingBySalesNFT) => trendingBySalesNFT.id === itemFound.id
          )
          ? itemFound
          : undefined
      })
      .filter((item): item is Item => !!item) // filter out the undefined ones

    // Get 40% of the trending sales by volume
    const slicedTrendingByVolume = trendingByVolume.slice(
      0,
      (filters.size || DEFAULT_SIZE) * VOLUME_CUT
    )

    // Return a deterministic shuffled result using the nft.id as the seed for seedrandom
    return slicedTrendingBySales
      .concat(slicedTrendingByVolume)
      .sort((item1, item2) =>
        seedrandom(item1.id + item2.id)() > 0.5 ? 1 : -1
      )
  }

  return {
    fetch,
  }
}

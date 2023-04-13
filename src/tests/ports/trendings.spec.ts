import { Item, Network, NFTCategory, Rarity } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { getDateXDaysAgo } from '../../ports/analyticsDayData/utils'
import { IFavoritesComponent, PickStats } from '../../ports/favorites/types'
import { IItemsComponent } from '../../ports/items/types'
import {
  createTrendingsComponent,
  SALES_CUT,
  VOLUME_CUT,
} from '../../ports/trendings/component'
import {
  ITrendingsComponent,
  TrendingFilters,
} from '../../ports/trendings/types'
import {
  getTrendingsQuery,
  TrendingSaleFragment,
} from '../../ports/trendings/utils'
import { test } from '../components'

const getSalesWithBigPrice = (qty: number, isOnSale = true) =>
  Array.from({ length: qty }, (_, i) => ({
    searchItemId: '3',
    searchContractAddress: `0xbigPrice${i}${isOnSale ? 'onSale' : ''}`,
  }))

const getSalesOfSameItem = (qty: number, isOnSale = true) =>
  Array.from({ length: qty }, (_, i) => ({
    id: `sale-matic-21${i}`,
    searchItemId: '3',
    searchContractAddress: `0xsameItemSale${qty}${isOnSale ? 'onSale' : ''}`,
  }))

const getItem = (contractAddress: string, itemId: string) => ({
  id: `${contractAddress}-${itemId}`,
  name: 'mockdItem',
  thumbnail:
    'https://peer.decentraland.zone/lambdas/collections/contents/urn:decentraland:mumbai:collections-v2:0x5c8bf33e673dc712ba62c5459e59dd9a15d458ff:6/thumbnail',
  url: '/contracts/0x5c8bf33e673dc712ba62c5459e59dd9a15d458ff/items/6',
  category: NFTCategory.WEARABLE,
  contractAddress,
  itemId,
  beneficiary: '0xedae96f7739af8a7fb16e2a888c1e578e1328299',
  rarity: Rarity.EPIC,
  price: contractAddress.includes('bigPrice') ? '10000000000000' : '1000000000',
  available: 998,
  isOnSale: contractAddress.includes('onSale'),
  creator: '0xedae96f7739af8a7fb16e2a888c1e578e1328299',
  data: { wearable: {} as any },
  network: Network.MATIC,
  chainId: 137,
  createdAt: 1631824160000,
  updatedAt: 1653899245000,
  reviewedAt: 1631882258000,
  soldAt: 1653899245000,
  firstListedAt: null,
})

const getPickStats = (itemId: string): PickStats => {
  let [_, num] = <[string, number]>itemId.split('-')
  return { itemId, pickedByUser: num > 0, count: num }
}

const getItemWithPickStats = (contractAddress: string, itemId: string) => {
  const item = getItem(contractAddress, itemId)
  return {
    ...item,
    picks: getPickStats(item.id),
  }
}

const RESULTS_PAGE_SIZE = 10

test('trendings component', function ({ components }) {
  let initialComponents: {
    collectionsSubgraphComponent: ISubgraphComponent
    itemsComponent: IItemsComponent
    favoritesComponent: IFavoritesComponent
  }
  let trendingsComponent: ITrendingsComponent

  beforeEach(() => {
    const { collectionsSubgraph, items, favorites } = components
    initialComponents = {
      collectionsSubgraphComponent: collectionsSubgraph,
      itemsComponent: items,
      favoritesComponent: favorites,
    }
  })

  beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date(2020, 3, 1))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  describe('when fetching the trendings', () => {
    describe('and a size is passed as parameter', () => {
      let salesResponse: TrendingSaleFragment[]
      let filters: TrendingFilters
      let salesOfSameItems: TrendingSaleFragment[]

      let trendings: Item[]
      let trendingItemsWithMostVolume: Item[]
      let notTrendingItemsWithMostVolume: Item[]

      let mostSales: TrendingSaleFragment[]
      let trendingItemButNotInSale: TrendingSaleFragment[]
      let trendingItemsWithMostSales: Item[]
      let notTrendingItemsWithMostSales: Item[]

      let itemIds: string[]

      beforeEach(() => {
        const { items, collectionsSubgraph } = components
        filters = { size: RESULTS_PAGE_SIZE }
        // 10 items with tons of small sales
        // 10 items with really big volumes
        // result should be 40% of those big volumes sorted by their sizes and 60% of the ones with more sales
        salesOfSameItems = [
          ...getSalesOfSameItem(10),
          ...getSalesOfSameItem(20),
          ...getSalesOfSameItem(30),
          ...getSalesOfSameItem(40),
          ...getSalesOfSameItem(50),
          ...getSalesOfSameItem(60),
          ...getSalesOfSameItem(70),
          ...getSalesOfSameItem(80),
          ...getSalesOfSameItem(90),
          ...getSalesOfSameItem(100),
          ...getSalesOfSameItem(2000),
          ...getSalesOfSameItem(2100, false), // one with a ton of sales, but not in sale anymore
        ]
        salesResponse = [...getSalesWithBigPrice(10), ...salesOfSameItems]
        Array.from(
          { length: Math.ceil(salesResponse.length / 1000) },
          (_, i) => {
            jest.spyOn(collectionsSubgraph, 'query').mockResolvedValueOnce({
              sales: salesResponse.slice(i * 1000, (i + 1) * 1000),
            })
          }
        )
        jest
          .spyOn(collectionsSubgraph, 'query')
          .mockResolvedValueOnce({ sales: [] })

        jest
          .spyOn(items, 'fetch')
          .mockImplementation(({ contractAddresses, itemId }) =>
            Promise.resolve([getItem(contractAddresses![0], itemId!)])
          )

        itemIds = Array.from(
          new Set(
            salesResponse
              .filter(({ searchItemId }) => searchItemId)
              .map(
                ({ searchContractAddress, searchItemId }) =>
                  `${searchContractAddress}-${searchItemId}`
              )
          )
        )
      })

      describe('when the favorites feature is disabled', () => {
        beforeEach(async () => {
          trendingsComponent = createTrendingsComponent(initialComponents)

          trendings = await trendingsComponent.fetch(filters)
          trendingItemsWithMostVolume = getSalesWithBigPrice(10)
            .slice(-VOLUME_CUT * 10) //the big volume sales with most volume
            .map((sale) =>
              getItem(sale.searchContractAddress, sale.searchItemId)
            )

          notTrendingItemsWithMostVolume = getSalesWithBigPrice(10)
            .slice(-(1 - VOLUME_CUT) * 10) //the big volume sales with less volume
            .map((sale) =>
              getItem(sale.searchContractAddress, sale.searchItemId)
            )

          // get just one sale of each item
          mostSales = salesOfSameItems.filter(
            (value, index, self) =>
              index ===
              self.findIndex(
                (t) => t.searchContractAddress === value.searchContractAddress
              )
          )

          trendingItemButNotInSale = mostSales.filter(
            (sale) =>
              !getItem(sale.searchContractAddress, sale.searchItemId).isOnSale
          )

          trendingItemsWithMostSales = mostSales
            .filter(
              (sale) =>
                getItem(sale.searchContractAddress, sale.searchItemId).isOnSale
            ) // only the onSale items should appear in the trending
            .slice(-SALES_CUT * 10) // get the ones with most sales
            .map((sale) =>
              getItem(sale.searchContractAddress, sale.searchItemId!)
            )

          notTrendingItemsWithMostSales = mostSales
            .slice(0, (1 - SALES_CUT) * 10) // get the ones with less sales
            .map((sale) =>
              getItem(sale.searchContractAddress, sale.searchItemId!)
            )
        })

        it('should return the trending results by sales and volume shuffled', () => {
          // 40% of the big volumes items should be in the trendings array
          expect(trendings).toEqual(
            expect.arrayContaining(trendingItemsWithMostVolume)
          )

          // the rest of the big volume sales shouldn't be in the trendings array
          expect(trendings).not.toEqual(
            expect.arrayContaining(notTrendingItemsWithMostVolume)
          )

          // the trendings but not in sale, should not be part of the results
          expect(trendings).not.toEqual(
            expect.arrayContaining(trendingItemButNotInSale)
          )

          // 60% of the big amount of sales items should be in the trendings array
          expect(trendings).toEqual(
            expect.arrayContaining(trendingItemsWithMostSales)
          )
          // the rest of the big amount of sales items shouldn't be in the trendings array
          expect(trendings).not.toEqual(
            expect.arrayContaining(notTrendingItemsWithMostSales)
          )
        })

        it('should fetch the data from the subgraph', () => {
          // assert the retry calls, it should ask for all pages
          const { collectionsSubgraph } = components

          expect(collectionsSubgraph.query).toHaveBeenCalledTimes(
            Math.ceil(salesResponse.length / 1000)
          )

          Array.from(
            { length: Math.ceil(salesResponse.length / 1000) }, // the mock is returning 10000 results
            (_, i) => {
              expect(collectionsSubgraph.query).toHaveBeenCalledWith(
                getTrendingsQuery({
                  from: getDateXDaysAgo(1).getTime(),
                  first: 1000,
                  skip: 1000 * i, // 1000 is the max number of results per page
                })
              )
            }
          )
        })
      })

      describe('when the favorites feature is enabled', () => {
        beforeEach(async () => {
          const { favorites } = components

          trendingsComponent = createTrendingsComponent(initialComponents, {
            isFavoritesEnabled: true,
          })

          jest
            .spyOn(favorites, 'getPicksStatsOfItems')
            .mockImplementation((itemIds: string[]) =>
              Promise.resolve(itemIds.map(getPickStats))
            )
        })

        describe('and there is no filter of "pickedBy"', () => {
          beforeEach(async () => {
            trendings = await trendingsComponent.fetch(filters)
            trendingItemsWithMostVolume = getSalesWithBigPrice(10)
              .slice(-VOLUME_CUT * 10) //the big volume sales with most volume
              .map((sale) =>
                getItemWithPickStats(
                  sale.searchContractAddress,
                  sale.searchItemId
                )
              )

            notTrendingItemsWithMostVolume = getSalesWithBigPrice(10)
              .slice(-(1 - VOLUME_CUT) * 10) //the big volume sales with less volume
              .map((sale) =>
                getItemWithPickStats(
                  sale.searchContractAddress,
                  sale.searchItemId
                )
              )

            // get just one sale of each item
            mostSales = salesOfSameItems.filter(
              (value, index, self) =>
                index ===
                self.findIndex(
                  (t) => t.searchContractAddress === value.searchContractAddress
                )
            )

            trendingItemButNotInSale = mostSales.filter(
              (sale) =>
                !getItem(sale.searchContractAddress, sale.searchItemId).isOnSale
            )

            trendingItemsWithMostSales = mostSales
              .filter(
                (sale) =>
                  getItem(sale.searchContractAddress, sale.searchItemId)
                    .isOnSale
              ) // only the onSale items should appear in the trending
              .slice(-SALES_CUT * 10) // get the ones with most sales
              .map((sale) =>
                getItemWithPickStats(
                  sale.searchContractAddress,
                  sale.searchItemId!
                )
              )

            notTrendingItemsWithMostSales = mostSales
              .slice(0, (1 - SALES_CUT) * 10) // get the ones with less sales
              .map((sale) =>
                getItemWithPickStats(
                  sale.searchContractAddress,
                  sale.searchItemId!
                )
              )
          })

          it('should return the trending results by sales and volume shuffled', () => {
            // 40% of the big volumes items should be in the trendings array
            expect(trendings).toEqual(
              expect.arrayContaining(trendingItemsWithMostVolume)
            )

            // the rest of the big volume sales shouldn't be in the trendings array
            expect(trendings).not.toEqual(
              expect.arrayContaining(notTrendingItemsWithMostVolume)
            )

            // the trendings but not in sale, should not be part of the results
            expect(trendings).not.toEqual(
              expect.arrayContaining(trendingItemButNotInSale)
            )

            // 60% of the big amount of sales items should be in the trendings array
            expect(trendings).toEqual(
              expect.arrayContaining(trendingItemsWithMostSales)
            )
            // the rest of the big amount of sales items shouldn't be in the trendings array
            expect(trendings).not.toEqual(
              expect.arrayContaining(notTrendingItemsWithMostSales)
            )
          })

          it('should fetch the data from the subgraph', () => {
            // assert the retry calls, it should ask for all pages
            const { collectionsSubgraph } = components

            expect(collectionsSubgraph.query).toHaveBeenCalledTimes(
              Math.ceil(salesResponse.length / 1000)
            )

            Array.from(
              { length: Math.ceil(salesResponse.length / 1000) }, // the mock is returning 10000 results
              (_, i) => {
                expect(collectionsSubgraph.query).toHaveBeenCalledWith(
                  getTrendingsQuery({
                    from: getDateXDaysAgo(1).getTime(),
                    first: 1000,
                    skip: 1000 * i, // 1000 is the max number of results per page
                  })
                )
              }
            )
          })

          it('should fetch the data from the favorites component', async () => {
            const { favorites } = components
            expect(favorites.getPicksStatsOfItems).toHaveBeenCalledWith(
              itemIds,
              undefined
            )
          })

          it('should enhance the trending items with their picks stats', () => {
            expect(trendings.map(({ picks }) => picks)).toEqual(
              trendings.map(({ id }) => getPickStats(id))
            )
          })
        })

        describe('and there is a filter of "pickedBy"', () => {
          let pickedBy: string

          beforeEach(async () => {
            pickedBy = '0x123'
            filters = { ...filters, pickedBy }
            trendings = await trendingsComponent.fetch(filters)
          })

          it('should fetch the data from the favorites component', async () => {
            const { favorites } = components
            expect(favorites.getPicksStatsOfItems).toHaveBeenCalledWith(
              itemIds,
              pickedBy
            )
          })
        })
      })
    })
  })
})

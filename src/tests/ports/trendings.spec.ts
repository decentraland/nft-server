import { Network, NFTCategory, Rarity, Sale, SaleType } from '@dcl/schemas'
import {
  createTrendingsComponent,
  SALES_CUT,
  VOLUME_CUT,
} from '../../ports/trendings/component'
import {
  ITrendingsComponent,
  TrendingFilters,
} from '../../ports/trendings/types'
import { test } from '../components'

const getSalesWithBigPrice = (qty: number) =>
  Array.from({ length: qty }, (_, i) => ({
    id: `sale-matic-11${i}`,
    type: SaleType.MINT,
    buyer: '0x747c6f502272129bf1ba872a1903045b837ee86c',
    seller: '0x8cff6832174091dae86f0244e3fd92d4ced2fe07',
    itemId: '3',
    tokenId:
      '315936875005671560093754083051011296956685286201647333762932932700',
    contractAddress: `0xbigPrice${i}`,
    price: `${i}000000000000000000000`,
    timestamp: 1653911010000,
    txHash:
      '0x62ab5ed2368919967d48e1649a76d78a7c1e7b52a9c5e282d3ce7866c5110425',
    network: Network.MATIC,
    chainId: 137,
  }))

const getSalesOfSameItem = (qty: number) =>
  Array.from({ length: qty }, (_, i) => ({
    id: `sale-matic-21${i}`,
    type: SaleType.MINT,
    buyer: '0x747c6f502272129bf1ba872a1903045b837ee86c',
    seller: '0x8cff6832174091dae86f0244e3fd92d4ced2fe07',
    itemId: '3',
    tokenId:
      '315936875005671560093754083051011296956685286201647333762932932700',
    contractAddress: `0xsameItemSale${qty}`,
    price: '10000000000000',
    timestamp: 1653911010000,
    txHash:
      '0x62ab5ed2368919967d48e1649a76d78a7c1e7b52a9c5e282d3ce7866c5110425',
    network: Network.MATIC,
    chainId: 137,
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
  price: '1000000000',
  available: 998,
  isOnSale: true,
  creator: '0xedae96f7739af8a7fb16e2a888c1e578e1328299',
  data: { wearable: {} as any },
  network: Network.MATIC,
  chainId: 137,
  createdAt: 1631824160000,
  updatedAt: 1653899245000,
  reviewedAt: 1631882258000,
  soldAt: 1653899245000,
})

test('trendings component', function ({ components }) {
  let trendingsComponent: ITrendingsComponent

  beforeEach(() => {
    const { sales, items } = components
    trendingsComponent = createTrendingsComponent(sales, items)
  })

  describe('when fetching the trendings', () => {
    describe('and a size is passed as parameter', () => {
      let salesResponse: Sale[]
      let filters: TrendingFilters
      let salesOfSameItems: Sale[]
      beforeEach(() => {
        const { sales, items } = components
        filters = { size: 10 }
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
        ]
        salesResponse = [...getSalesWithBigPrice(10), ...salesOfSameItems]

        jest.spyOn(sales, 'fetch').mockResolvedValueOnce(salesResponse)
        jest
          .spyOn(items, 'fetch')
          .mockImplementation(({ contractAddress, itemId }) =>
            Promise.resolve([getItem(contractAddress!, itemId!)])
          )
      })

      it('should fetch the data and return the trending results by sales and volume shuffled', async () => {
        const trendings = await trendingsComponent.fetch(filters)
        const trendingItemsWithMostVolume = getSalesWithBigPrice(10)
          .slice(0, VOLUME_CUT * 10) //the big volume sales with most volume
          .map((sale) => getItem(sale.contractAddress, sale.itemId))

        const notTrendingItemsWithMostVolume = getSalesWithBigPrice(10)
          .slice(-(1 - VOLUME_CUT) * 10) //the big volume sales with less volume
          .map((sale) => getItem(sale.contractAddress, sale.itemId))

        // 40% of the big volumes items should be in the trendings array
        expect(trendings).toEqual(
          expect.arrayContaining(trendingItemsWithMostVolume)
        )
        // the rest of the big volume sales shouldn't be in the trendings array
        expect(trendings).not.toEqual(
          expect.arrayContaining(notTrendingItemsWithMostVolume)
        )

        // get just one sale of each item
        const mostSales = salesOfSameItems.filter(
          (value, index, self) =>
            index ===
            self.findIndex((t) => t.contractAddress === value.contractAddress)
        )

        const trendingItemsWithMostSales = mostSales
          .slice(-SALES_CUT * 10) // get the ones with most sales
          .map((sale) => getItem(sale.contractAddress, sale.itemId!))

        const notTrendingItemsWithMostSales = mostSales
          .slice(0, (1 - SALES_CUT) * 10) // get the ones with less sales
          .map((sale) => getItem(sale.contractAddress, sale.itemId!))

        // 60% of the big amount of sales items should be in the trendings array
        expect(trendings).toEqual(
          expect.arrayContaining(trendingItemsWithMostSales)
        )
        // the rest of the big amount of sales items shouldn't be in the trendings array
        expect(trendings).not.toEqual(
          expect.arrayContaining(notTrendingItemsWithMostSales)
        )
      })
    })
  })
})

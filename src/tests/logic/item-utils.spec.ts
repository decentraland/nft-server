import { Item, ItemSortBy } from '@dcl/schemas'
import { convertItemToSortableResult } from '../../logic/items/utils'

let item: Item
let sort: Partial<Record<ItemSortBy, string | number | null>>

const createdAt = Date.now()
const reviewedAt = Date.now()
const soldAt = Date.now()
const firstListedAt = Date.now()

describe('when converting item results to sortable results', () => {
  beforeEach(() => {
    item = {
      id: '0x0-1',
      name: `no-rental-name-1`,
      contractAddress: '0x0',
      itemId: '1',
      createdAt,
      reviewedAt,
      soldAt,
      firstListedAt,
    } as Item
    sort = {
      [ItemSortBy.NEWEST]: item.createdAt,
      [ItemSortBy.RECENTLY_REVIEWED]: item.reviewedAt,
      [ItemSortBy.RECENTLY_SOLD]: item.soldAt,
      [ItemSortBy.NAME]: item.name,
      [ItemSortBy.RECENTLY_LISTED]: item.firstListedAt,
    }
  })

  describe('and the item is sold out', () => {
    beforeEach(() => {
      item = {
        ...item,
        available: 0,
      }
      sort = {
        ...sort,
        [ItemSortBy.CHEAPEST]: null,
      }
    })

    it('should return a sortable result with cheapest sort in null', () => {
      expect(convertItemToSortableResult(item)).toEqual({
        result: item,
        sort,
      })
    })
  })

  describe('and the item is still available', () => {
    beforeEach(() => {
      item = {
        ...item,
        available: 10,
        price: '50000000000000000',
      }
      sort = {
        ...sort,
        [ItemSortBy.CHEAPEST]: +item.price,
      }
    })

    it('should return a sortable result with cheapest sort set as the price of the item', () => {
      expect(convertItemToSortableResult(item)).toEqual({
        result: item,
        sort,
      })
    })
  })
})

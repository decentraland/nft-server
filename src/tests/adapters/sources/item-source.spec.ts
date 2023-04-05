import { Item, ItemSortBy } from '@dcl/schemas'
import { createItemsSource } from '../../../adapters/sources/items'
import { IMergerComponent, Sortable } from '../../../ports/merger/types'
import { IItemsComponent, ItemOptions } from '../../../ports/items/types'
import { IFavoritesComponent, PickStats } from '../../../ports/favorites/types'
import { convertItemToSortableResult } from '../../../logic/items/utils'

let itemsComponentMock: IItemsComponent
let favoritesComponentMock: IFavoritesComponent
let components: {
  itemsComponent: IItemsComponent
  favoritesComponent: IFavoritesComponent
}
let itemSource: IMergerComponent.Source<Item, ItemOptions, ItemSortBy>
let options: {
  isFavoritesEnabled?: boolean
}
let fetchMock: jest.Mock
let countMock: jest.Mock
let getPicksStatsOfItemsMock: jest.Mock

beforeEach(() => {
  fetchMock = jest.fn()
  countMock = jest.fn()
  getPicksStatsOfItemsMock = jest.fn()

  itemsComponentMock = {
    fetch: fetchMock,
    count: countMock,
  }

  favoritesComponentMock = {
    getPicksStatsOfItems: getPicksStatsOfItemsMock,
  }

  components = {
    itemsComponent: itemsComponentMock,
    favoritesComponent: favoritesComponentMock,
  }

  itemSource = createItemsSource(components, options)
})

describe('when fetching items', () => {
  let items: Item[]
  let result: Sortable<Item, ItemSortBy>[]

  describe('and fetching the items fails', () => {
    beforeEach(() => {
      fetchMock.mockRejectedValueOnce(new Error('An error occurred'))
    })

    it('should reject with the propagated error', () => {
      return expect(itemSource.fetch({})).rejects.toThrowError(
        'An error occurred'
      )
    })
  })

  describe('and the favorites feature is disabled', () => {
    beforeEach(async () => {
      options = {
        isFavoritesEnabled: false,
      }
      itemSource = createItemsSource(components, options)

      items = Array.from(
        { length: 2 },
        (_, i) =>
          ({
            id: `0x0-${i.toString()}`,
            name: `item-name-${i}`,
            contractAddress: '0x0',
            itemId: i.toString(),
          } as Item)
      )
      fetchMock.mockResolvedValueOnce(items)
      result = await itemSource.fetch({})
    })

    it('should resolve to a list of items without enhancing them with their picks stats', () => {
      expect(result).toEqual(items.map(convertItemToSortableResult))
    })

    it('should not have queried the picks stats', () => {
      expect(getPicksStatsOfItemsMock).not.toHaveBeenCalled()
    })
  })

  describe('and the favorites feature is enabled', () => {
    let picksStats: PickStats[]
    let pickedBy: string

    beforeEach(async () => {
      options = {
        isFavoritesEnabled: true,
      }
      itemSource = createItemsSource(components, options)

      items = Array.from(
        { length: 2 },
        (_, i) =>
          ({
            id: `0x0-${i.toString()}`,
            name: `item-name-${i}`,
            contractAddress: '0x0',
            itemId: i.toString(),
          } as Item)
      )
      picksStats = items.map(
        (item, i) =>
          ({
            itemId: item.id,
            pickedByUser: i > 0,
            count: i,
          } as PickStats)
      )
      fetchMock.mockResolvedValueOnce(items)
    })

    describe('and there is no filter of "pickedBy"', () => {
      beforeEach(async () => {
        getPicksStatsOfItemsMock.mockResolvedValueOnce(picksStats)
        result = await itemSource.fetch({})
      })

      it('should resolve to a list of items enhanced with their picks stats', () => {
        expect(result).toEqual(
          items
            .map((item) => ({
              ...item,
              picks: picksStats.find(
                (pickStats) => pickStats.itemId === item.id
              ),
            }))
            .map(convertItemToSortableResult)
        )
      })

      it('should have queried the picks stats of all items without taking in account the logged user', async () => {
        expect(getPicksStatsOfItemsMock).toHaveBeenCalledWith(
          items.map((item) => item.id),
          pickedBy
        )
      })
    })

    describe('and there is a filter of "pickedBy"', () => {
      beforeEach(async () => {
        pickedBy = '0x0000000000000000'
        getPicksStatsOfItemsMock.mockResolvedValueOnce(picksStats)
        result = await itemSource.fetch({ pickedBy })
      })

      it('should resolve to a list of items enhanced with their picks stats', () => {
        expect(result).toEqual(
          items
            .map((item) => ({
              ...item,
              picks: picksStats.find(
                (pickStats) => pickStats.itemId === item.id
              ),
            }))
            .map(convertItemToSortableResult)
        )
      })

      it('should have queried the picks stats of all items taking in account the logged user', async () => {
        expect(getPicksStatsOfItemsMock).toHaveBeenCalledWith(
          items.map((item) => item.id),
          pickedBy
        )
      })
    })

    describe('and enhancing the items fails', () => {
      beforeEach(() => {
        getPicksStatsOfItemsMock.mockRejectedValueOnce(
          new Error('An error occurred')
        )
      })

      it('should resolve with the propagated error', () => {
        return expect(itemSource.fetch({})).rejects.toThrowError(
          'An error occurred'
        )
      })
    })
  })
})

describe('when counting items', () => {
  describe('and the favorites feature is disabled', () => {
    beforeEach(() => {
      itemSource = createItemsSource(components, { isFavoritesEnabled: false })
      countMock.mockResolvedValueOnce(15)
    })

    it('should resolve to the number of items', () => {
      return expect(itemSource.count({})).resolves.toBe(15)
    })
  })

  describe('and the favorites feature is enabled', () => {
    beforeEach(() => {
      itemSource = createItemsSource(components, { isFavoritesEnabled: true })
      countMock.mockResolvedValueOnce(10)
    })

    it('should resolve to the number of items', () => {
      return expect(itemSource.count({})).resolves.toBe(10)
    })
  })

  describe('and fetching the count of items fails', () => {
    beforeEach(() => {
      countMock.mockRejectedValueOnce(new Error('An error occurred'))
    })

    it('should reject with the propagated error', () => {
      return expect(itemSource.count({})).rejects.toThrowError(
        'An error occurred'
      )
    })
  })
})

import { URL } from 'url'
import { IFetchComponent } from '@well-known-components/http-server'
import { Response } from 'node-fetch'
import { createFavoritesComponent } from '../../ports/favorites/components'
import {
  IFavoritesComponent,
  FavoritesServerResponse,
  PickStats,
} from '../../ports/favorites/types'

const favoritesURL = 'http://favorites.com'
const error = 'An error occurred'

let fetchComponentMock: IFetchComponent
let fetchResponse: Response
let favoritesComponent: IFavoritesComponent
let fetchMock: jest.Mock

describe('when getting the picks stats of some items', () => {
  let itemIds: string[]
  let result: PickStats[]

  beforeEach(() => {
    fetchMock = jest.fn()
    fetchComponentMock = {
      fetch: fetchMock,
    }
    favoritesComponent = createFavoritesComponent(
      { fetch: fetchComponentMock },
      favoritesURL
    )
  })

  describe("and the list of item ids doesn't exhaust the length of the signature server's URL", () => {
    let response: FavoritesServerResponse<PickStats[]>

    beforeEach(async () => {
      itemIds = Array.from({ length: 2 }, (_, i) => `0x0-${i}`)
      response = {
        ok: true,
        data: itemIds.map(
          (itemId, i) =>
            ({ itemId, count: i, pickedByUser: i > 0 } as PickStats)
        ),
      }
      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValueOnce(response),
      })

      result = await favoritesComponent.getPicksStatsOfItems(itemIds)
    })

    it('should fetch and return the picks stats once', () => {
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })

    it('should have queried all the item ids', () => {
      const parsedUrl = new URL(fetchMock.mock.calls[0][0])
      expect(parsedUrl.searchParams.getAll('itemId')).toEqual(itemIds)
    })

    it('should return the picks stats', () => {
      expect(result).toEqual(response.data)
    })
  })

  describe("and the list of item ids exhausts the length of the signature server's URL twice", () => {
    let responses: FavoritesServerResponse<PickStats[]>[]

    beforeEach(async () => {
      itemIds = Array.from({ length: 200 }, (_, i) => `0x0000-${i}`)
      responses = [
        {
          ok: true,
          data: itemIds.map(
            (itemId, i) =>
              ({ itemId, count: i, pickedByUser: i > 0 } as PickStats)
          ),
        },
        {
          ok: true,
          data: itemIds.map(
            (itemId, i) =>
              ({ itemId, count: i, pickedByUser: i > 0 } as PickStats)
          ),
        },
      ]

      responses.forEach((response) => {
        fetchMock.mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: jest.fn().mockResolvedValueOnce(response),
        })
      })

      result = await favoritesComponent.getPicksStatsOfItems(itemIds)
    })

    it('should fetch and return the picks stats twice', () => {
      expect(fetchMock).toHaveBeenCalledTimes(2)
    })

    it('should have queried all the item ids', () => {
      expect(
        fetchMock.mock.calls.flatMap((call) =>
          new URL(call[0]).searchParams.getAll('itemId')
        )
      ).toEqual(itemIds)
    })

    it('should return the picks stats', () => {
      expect(result).toEqual(responses.flatMap((response) => response.data))
    })
  })

  describe('and fetching the list of picks stats fails', () => {
    beforeEach(() => {
      itemIds = Array.from({ length: 1 }, (_, i) => `0x0-${i}`)
      fetchResponse = {
        status: 500,
        json: jest.fn().mockResolvedValueOnce({
          ok: false,
          message: error,
        }) as any,
      } as Response
      fetchMock.mockResolvedValueOnce(fetchResponse)
    })

    it('should throw an error with the message returned in the JSON message', () => {
      return expect(
        favoritesComponent.getPicksStatsOfItems(itemIds)
      ).rejects.toThrowError(error)
    })
  })
})

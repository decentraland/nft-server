import { Response } from 'node-fetch'
import { URL } from 'url'
import { IFetchComponent } from '@well-known-components/http-server'
import {
  isPaginated,
  processRequestError,
  queryMultipleTimesWhenExceedingUrlLimit,
} from '../../ports/utils'
import { HTTPSuccessResponseBody, PaginatedResponse } from '../../types/server'

describe('when using the processRequestError util', () => {
  const error = 'An error occurred'
  const action = 'testing util'

  let response: Response

  beforeEach(() => {
    response = {
      status: 500,
      ok: false,
    } as Response
  })

  describe('and fails the parsing of the response error', () => {
    beforeEach(() => {
      response.json = jest.fn().mockRejectedValueOnce(new Error(error))
    })

    it('should throw the JSON parsing error', () => {
      expect(processRequestError(action, response)).rejects.toThrowError(
        `Error ${action}, the server responded with: ${response.status}`
      )
    })
  })

  describe('and it is possible to parse the response error', () => {
    beforeEach(() => {
      response.json = jest.fn().mockResolvedValueOnce({
        ok: false,
        message: error,
      })
    })

    it('should throw the JSON parsing error', () => {
      expect(processRequestError(action, response)).rejects.toThrowError(error)
    })
  })
})

describe('when using the isPaginated util', () => {
  let data: any | PaginatedResponse<any>

  describe('and the data is paginated', () => {
    beforeEach(() => {
      data = { results: [] }
    })

    it('should return true', () => {
      expect(isPaginated(data)).toBe(true)
    })
  })

  describe('and the data is not paginated', () => {
    beforeEach(() => {
      data = []
    })

    it('should return false', () => {
      expect(isPaginated(data)).toBe(false)
    })
  })
})

describe('when using the queryMultipleTimesWhenExceedingUrlLimit util', () => {
  const error = 'An error occurred'
  const queryParameterName = 'queryParameterName'
  const previousQueryParameterName = 'previousQueryParameter'
  const previousQueryParameterValue = 'true'

  let baseUrl = 'http://base-url.com'

  let fetchComponentMock: IFetchComponent
  let fetchResponse: Response
  let fetchMock: jest.Mock

  let params: string[]
  let result: any[]

  beforeEach(() => {
    fetchMock = jest.fn()
    fetchComponentMock = {
      fetch: fetchMock,
    }
  })

  describe("and the list of params doesn't exhaust the length of URL", () => {
    let response: HTTPSuccessResponseBody<PaginatedResponse<any>>

    beforeEach(() => {
      params = ['1', '2']
      response = {
        ok: true,
        data: {
          results: params.map((id) => ({
            id,
          })) as any[],
          page: 1,
          pages: 1,
          limit: 50,
          total: 2,
        },
      }
      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValueOnce(response),
      })
    })

    describe('and the base url does not contain previous query parameters', () => {
      beforeEach(async () => {
        result = await queryMultipleTimesWhenExceedingUrlLimit(
          baseUrl,
          queryParameterName,
          params,
          fetchComponentMock
        )
      })

      it('should fetch the service only once', () => {
        expect(fetchMock).toHaveBeenCalledTimes(1)
      })

      it('should have queried all the parameters', () => {
        const parsedUrl = new URL(fetchMock.mock.calls[0][0])
        expect(parsedUrl.searchParams.getAll(queryParameterName)).toEqual(
          params
        )
      })

      it('should return the results', () => {
        expect(result).toEqual(response.data.results)
      })
    })

    describe('and the base url contains previous query parameters', () => {
      beforeEach(async () => {
        await queryMultipleTimesWhenExceedingUrlLimit(
          baseUrl +
            `?${previousQueryParameterName}=${previousQueryParameterValue}`,
          queryParameterName,
          params,
          fetchComponentMock
        )
      })

      it('should fetch the service only once', () => {
        expect(fetchMock).toHaveBeenCalledTimes(1)
      })

      it('should have queried all the parameters including the previous one', () => {
        const parsedUrl = new URL(fetchMock.mock.calls[0][0])

        expect(parsedUrl.searchParams.get(previousQueryParameterName)).toEqual(
          previousQueryParameterValue
        )
        expect(parsedUrl.searchParams.getAll(queryParameterName)).toEqual(
          params
        )
      })

      it('should return the results', () => {
        expect(result).toEqual(response.data.results)
      })
    })
  })

  describe("and the list of params exhausts the length of the signature server's URL three times", () => {
    let responses: HTTPSuccessResponseBody<PaginatedResponse<any>>[]

    beforeEach(() => {
      params = Array.from({ length: 200 }, (_, i) => `${i}`)
      responses = Array.from({ length: 3 }, (_, i) => ({
        ok: true,
        data: {
          results: params.map((id) => ({
            id,
          })) as any[],
          page: i,
          pages: 3,
          limit: 50,
          total: 200,
        },
      }))

      responses.forEach((response) => {
        fetchMock.mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: jest.fn().mockResolvedValueOnce(response),
        })
      })
    })

    describe('and the base url does not contain previous query parameters', () => {
      beforeEach(async () => {
        result = await queryMultipleTimesWhenExceedingUrlLimit(
          baseUrl,
          queryParameterName,
          params,
          fetchComponentMock
        )
      })

      it('should fetch the service three times', () => {
        expect(fetchMock).toHaveBeenCalledTimes(responses.length)
      })

      it('should have queried all the params', () => {
        expect(
          fetchMock.mock.calls.flatMap((call) =>
            new URL(call[0]).searchParams.getAll(queryParameterName)
          )
        ).toEqual(params)
      })

      it('should return the results', () => {
        expect(result).toEqual(
          responses.flatMap((response) => response.data.results)
        )
      })
    })

    describe('and the base url contains previous query parameters', () => {
      beforeEach(async () => {
        result = await queryMultipleTimesWhenExceedingUrlLimit(
          baseUrl +
            `?${previousQueryParameterName}=${previousQueryParameterValue}`,
          queryParameterName,
          params,
          fetchComponentMock
        )
      })

      it('should fetch the service three times', () => {
        expect(fetchMock).toHaveBeenCalledTimes(responses.length)
      })

      it('should have queried all the params including the previous one', () => {
        expect(
          fetchMock.mock.calls.flatMap((call) =>
            new URL(call[0]).searchParams.get(previousQueryParameterName)
          )
        ).toEqual(
          Array.from(
            { length: responses.length },
            () => previousQueryParameterValue
          )
        )
        expect(
          fetchMock.mock.calls.flatMap((call) =>
            new URL(call[0]).searchParams.getAll(queryParameterName)
          )
        ).toEqual(params)
      })

      it('should return the results', () => {
        expect(result).toEqual(
          responses.flatMap((response) => response.data.results)
        )
      })
    })
  })

  describe('and fetching the service fails', () => {
    beforeEach(() => {
      params = ['1']
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
        queryMultipleTimesWhenExceedingUrlLimit(
          baseUrl,
          queryParameterName,
          params,
          fetchComponentMock
        )
      ).rejects.toThrowError(error)
    })
  })
})

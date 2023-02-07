import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { createStatsComponent } from '../../ports/stats/component'
import {
  EstateStat,
  FetchEstateSizesQueryFragment,
  IStatsComponent,
  StatsResource,
  StatsResourceParams,
} from '../../ports/stats/types'
import { consolidateSizes } from '../../ports/stats/utils'

const error = 'An error occurred'

let statsComponent: IStatsComponent
let marketplaceSubgraph: ISubgraphComponent
let marketplaceSubgraphQueryMock: jest.Mock
let params: StatsResourceParams

describe('when getting stats', () => {
  beforeEach(() => {
    params = {
      resource: StatsResource.ESTATE,
      stat: EstateStat.SIZE,
    }
    marketplaceSubgraphQueryMock = jest.fn()
    marketplaceSubgraph = {
      query: marketplaceSubgraphQueryMock,
    }
    statsComponent = createStatsComponent({
      subgraph: marketplaceSubgraph,
    })
  })

  describe('and getting estate stats', () => {
    describe('and getting the estate sizes spectrum', () => {})
  })

  describe('and the subgraph fetch throws an error', () => {
    beforeEach(() => {
      marketplaceSubgraphQueryMock.mockRejectedValueOnce(new Error(error))
    })

    it('should propagate the error', () => {
      return expect(statsComponent.fetch(params)).rejects.toThrowError(error)
    })
  })

  describe('and the params are not valid', () => {
    it('should propagate the error', () => {
      return expect(
        statsComponent.fetch({
          ...params,
          resource: 'anInvalidResource' as StatsResource,
        })
      ).resolves.toEqual([])
    })
  })

  describe('and the request is successful', () => {
    let fragments: FetchEstateSizesQueryFragment[]

    beforeEach(() => {
      fragments = Array.from({ length: 10 }, (_, i) => ({
        id: `estate-${i.toString()}-tokenId-${i.toString()}`,
        searchEstateSize: i,
      }))

      marketplaceSubgraphQueryMock.mockResolvedValueOnce({
        nfts: fragments,
      })
    })

    it('should return the fragments processed', () => {
      return expect(statsComponent.fetch(params)).resolves.toEqual(
        consolidateSizes(fragments)
      )
    })
  })

  describe('and fetching from the subgraph fails', () => {
    beforeEach(() => {
      marketplaceSubgraphQueryMock.mockRejectedValueOnce(
        new Error('An error occurred')
      )
    })

    it('should throw an error with the message returned in the JSON message', () => {
      return expect(statsComponent.fetch(params)).rejects.toThrowError(error)
    })
  })
})

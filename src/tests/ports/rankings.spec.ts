import { Network } from '@dcl/schemas'
import { test } from '../../../src/tests/components'
import { AnalyticsTimeframe } from '../../ports/analyticsDayData/types'
import { getTimestampFromTimeframe } from '../../ports/analyticsDayData/utils'
import { createRankingsComponent } from '../../ports/rankings/component'
import {
  IItemsDayDataComponent,
  ItemsDayDataFragment,
  RankingsFilters,
  RankingsSortBy,
} from '../../ports/rankings/types'
import { getUniqueItemsFromItemsDayData } from '../../logic/rankings'
import {
  getItemsDayDataQuery,
  getItemsDayDataTotalQuery,
} from '../../ports/rankings/utils'

test('rankings component', function ({ components }) {
  let rankingsComponent: IItemsDayDataComponent

  beforeEach(() => {
    const { collectionsSubgraph } = components
    rankingsComponent = createRankingsComponent({
      subgraph: collectionsSubgraph,
      network: Network.MATIC,
    })
  })

  describe('when fetching the rankings by timeframe', () => {
    describe('and it is asked by day or week', () => {
      describe('and sorted by volume', () => {
        let graphResponse: { rankings: ItemsDayDataFragment[] }
        let timeframe: AnalyticsTimeframe
        let filters: RankingsFilters

        beforeEach(() => {
          const { collectionsSubgraph } = components
          timeframe = AnalyticsTimeframe.WEEK
          filters = {
            from: getTimestampFromTimeframe(timeframe),
            sortBy: RankingsSortBy.MOST_VOLUME,
          }
          graphResponse = {
            rankings: [
              {
                id: '19142-0xa4a345afb8fa378cdabc68e83e1a578c810f0abb-3',
                sales: 1,
                volume: '1000000000000000000000',
              },
              {
                id: '19142-0x1c8592d12157f1a63c8b207588488bfd7c3eac33-0',
                sales: 3,
                volume: '330000000000000000000',
              },
              {
                id: '19143-0x922e304450169d2ed66f33290fb19e58a327e763-0',
                sales: 1,
                volume: '100000000000000000000',
              },
              {
                id: '19145-0x52c98c80a5aad12056596d3b2dd4139c327bc501-1',
                sales: 1,
                volume: '12000000000000000000',
              },
              {
                id: '19142-0x5c8bf33e673dc712ba62c5459e59dd9a15d458ff-6',
                sales: 2,
                volume: '4000000000000000000',
              },
              {
                id: '19142-0x5c8bf33e673dc712ba62c5459e59dd9a15d458ff-4',
                sales: 1,
                volume: '1000000000000000000',
              },
            ],
          }

          jest
            .spyOn(collectionsSubgraph, 'query')
            .mockResolvedValueOnce(graphResponse)
        })

        it('should fetch the data and return the accumulated result sorted by volume', async () => {
          const { collectionsSubgraph } = components
          expect(await rankingsComponent.fetch(filters)).toEqual(
            Object.values(
              getUniqueItemsFromItemsDayData(graphResponse.rankings)
            )
          )
          expect(collectionsSubgraph.query).toHaveBeenCalledWith(
            getItemsDayDataQuery(filters)
          )
        })
      })
      describe('and sorted by sales', () => {
        let graphResponse: { rankings: ItemsDayDataFragment[] }
        let timeframe: AnalyticsTimeframe
        let filters: RankingsFilters

        beforeEach(() => {
          const { collectionsSubgraph } = components
          timeframe = AnalyticsTimeframe.WEEK
          filters = {
            from: getTimestampFromTimeframe(timeframe),
            sortBy: RankingsSortBy.MOST_SALES,
          }
          graphResponse = {
            rankings: [
              {
                id: '19142-0x1c8592d12157f1a63c8b207588488bfd7c3eac33-0',
                sales: 3,
                volume: '330000000000000000000',
              },
              {
                id: '19142-0x5c8bf33e673dc712ba62c5459e59dd9a15d458ff-6',
                sales: 2,
                volume: '4000000000000000000',
              },
              {
                id: '19145-0x52c98c80a5aad12056596d3b2dd4139c327bc501-1',
                sales: 1,
                volume: '12000000000000000000',
              },
              {
                id: '19143-0x922e304450169d2ed66f33290fb19e58a327e763-0',
                sales: 1,
                volume: '100000000000000000000',
              },
              {
                id: '19142-0xa4a345afb8fa378cdabc68e83e1a578c810f0abb-3',
                sales: 1,
                volume: '1000000000000000000000',
              },
              {
                id: '19142-0x5c8bf33e673dc712ba62c5459e59dd9a15d458ff-4',
                sales: 1,
                volume: '1000000000000000000',
              },
            ],
          }

          jest
            .spyOn(collectionsSubgraph, 'query')
            .mockResolvedValueOnce(graphResponse)
        })

        it('should fetch the data and return the accumulated result sorted by volume', async () => {
          const { collectionsSubgraph } = components
          expect(await rankingsComponent.fetch(filters)).toEqual(
            Object.values(
              getUniqueItemsFromItemsDayData(graphResponse.rankings)
            )
          )
          expect(collectionsSubgraph.query).toHaveBeenCalledWith(
            getItemsDayDataQuery(filters)
          )
        })
      })
    })
    describe('and it is asked by all time', () => {
      describe('and sorted by volume', () => {
        let graphResponse: { rankings: ItemsDayDataFragment[] }
        let timeframe: AnalyticsTimeframe
        let filters: RankingsFilters

        beforeEach(() => {
          const { collectionsSubgraph } = components
          timeframe = AnalyticsTimeframe.ALL
          filters = {
            from: getTimestampFromTimeframe(timeframe),
            sortBy: RankingsSortBy.MOST_VOLUME,
          }
          graphResponse = {
            rankings: [
              {
                id: '0xbcf5784c4cfa38ba49253527e80c9e9510e01c67-0',
                sales: 19,
                volume: '6403000000000000000000',
              },
              {
                id: '0xbcf5784c4cfa38ba49253527e80c9e9510e01c67-2',
                sales: 3,
                volume: '2100000000000000000000',
              },
              {
                id: '0x5077925ec18bf821f1518816f51f26f174401ca0-0',
                sales: 5,
                volume: '1400000000000000000000',
              },
              {
                id: '0xa4a345afb8fa378cdabc68e83e1a578c810f0abb-2',
                sales: 1,
                volume: '1111000000000000000000',
              },
              {
                id: '0x08a78e959cc8bbafd0beb9db97d011e182403cd8-0',
                sales: 1,
                volume: '1111000000000000000000',
              },
              {
                id: '0xa4a345afb8fa378cdabc68e83e1a578c810f0abb-3',
                sales: 1,
                volume: '1000000000000000000000',
              },
              {
                id: '0x155983dcea2406cb6bda20a35e3109d240a6bc7d-0',
                sales: 1,
                volume: '1000000000000000000000',
              },
              {
                id: '0x1c8592d12157f1a63c8b207588488bfd7c3eac33-0',
                sales: 7,
                volume: '661000000000000000000',
              },
            ],
          }

          jest
            .spyOn(collectionsSubgraph, 'query')
            .mockResolvedValueOnce(graphResponse)
        })

        it('should fetch the data and return the accumulated result sorted by volume', async () => {
          const { collectionsSubgraph } = components
          expect(await rankingsComponent.fetch(filters)).toEqual(
            Object.values(graphResponse.rankings)
          )

          expect(collectionsSubgraph.query).toHaveBeenCalledWith(
            getItemsDayDataTotalQuery(filters)
          )
        })
      })

      describe('and sorted by sales', () => {
        let graphResponse: { rankings: ItemsDayDataFragment[] }
        let timeframe: AnalyticsTimeframe
        let filters: RankingsFilters

        beforeEach(() => {
          const { collectionsSubgraph } = components
          timeframe = AnalyticsTimeframe.ALL
          filters = {
            from: getTimestampFromTimeframe(timeframe),
            sortBy: RankingsSortBy.MOST_SALES,
          }
          graphResponse = {
            rankings: [
              {
                id: '0xbcf5784c4cfa38ba49253527e80c9e9510e01c67-0',
                sales: 19,
                volume: '6403000000000000000000',
              },
              {
                id: '0x8dcf3bdd3031686d21c40c25136e68ed118bf44f-0',
                sales: 17,
                volume: '251000000000000000000',
              },
              {
                id: '0x5d7ac6c9bafe375869c5ba088cbdc7c3b59a2912-0',
                sales: 12,
                volume: '216919980000000001000',
              },
              {
                id: '0x52c98c80a5aad12056596d3b2dd4139c327bc501-0',
                sales: 10,
                volume: '100000000000000000000',
              },
              {
                id: '0x1c8592d12157f1a63c8b207588488bfd7c3eac33-0',
                sales: 7,
                volume: '661000000000000000000',
              },
              {
                id: '0xe0da654f4e02bbb98012343f1a625e8bd04fbf22-0',
                sales: 5,
                volume: '500000000000000000000',
              },
              {
                id: '0x5077925ec18bf821f1518816f51f26f174401ca0-0',
                sales: 5,
                volume: '1400000000000000000000',
              },
              {
                id: '0x52c98c80a5aad12056596d3b2dd4139c327bc501-1',
                sales: 4,
                volume: '48000000000000000000',
              },
              {
                id: '0x3fc9ff1187ac9e817f948a21ac869f37f5f813bd-0',
                sales: 4,
                volume: '400000000000000000000',
              },
              {
                id: '0xe0da654f4e02bbb98012343f1a625e8bd04fbf22-1',
                sales: 3,
                volume: '300000000000000000000',
              },
              {
                id: '0xbcf5784c4cfa38ba49253527e80c9e9510e01c67-2',
                sales: 3,
                volume: '2100000000000000000000',
              },
              {
                id: '0x5c8bf33e673dc712ba62c5459e59dd9a15d458ff-3',
                sales: 3,
                volume: '3000000000000000000',
              },
              {
                id: '0x17dde27cd02ed16d2fe91d50ce1968460395ba80-0',
                sales: 3,
                volume: '300000000000000000000',
              },
              {
                id: '0xbcf5784c4cfa38ba49253527e80c9e9510e01c67-1',
                sales: 2,
                volume: '501000000000000000000',
              },
            ],
          }

          jest
            .spyOn(collectionsSubgraph, 'query')
            .mockResolvedValueOnce(graphResponse)
        })

        it('should fetch the data and return the accumulated result sorted by volume', async () => {
          const { collectionsSubgraph } = components
          expect(await rankingsComponent.fetch(filters)).toEqual(
            Object.values(graphResponse.rankings)
          )

          expect(collectionsSubgraph.query).toHaveBeenCalledWith(
            getItemsDayDataTotalQuery(filters)
          )
        })
      })
    })
  })
})

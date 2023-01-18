import { AnalyticsDayDataFilters, Network } from '@dcl/schemas'
import { test } from '../../../src/tests/components'
import { createAnalyticsDayDataComponent } from '../../ports/analyticsDayData/component'
import {
  AnalyticsDayDataFragment,
  IAnalyticsDayDataComponent,
} from '../../ports/analyticsDayData/types'
import {
  getAnalyticsDayDataQuery,
  getAnalyticsTotalDataQuery,
  mapAnalyticsFragment,
} from '../../ports/analyticsDayData/utils'

test('analyticsDayData component', function ({ components }) {
  let analyticsDayData: IAnalyticsDayDataComponent

  beforeEach(() => {
    const { collectionsSubgraph } = components
    analyticsDayData = createAnalyticsDayDataComponent({
      network: Network.MATIC,
      subgraph: collectionsSubgraph,
      getAnalyticsDayDataQuery,
      getAnalyticsTotalDataQuery,
      mapAnalyticsFragment,
    })
  })

  describe('when fetching', () => {
    describe('and the "from" filter is 0', () => {
      let filters: AnalyticsDayDataFilters
      let graphResponse: AnalyticsDayDataFragment[]

      beforeEach(() => {
        const { collectionsSubgraph } = components
        graphResponse = [
          {
            id: '123',
            date: 123,
            creatorsEarnings: '2203087999500000000000',
            daoEarnings: '20530000000000000000',
            sales: 103,
            volume: '16268919980000000001000',
          },
        ]
        filters = {
          network: Network.MATIC,
          from: 0,
        }
        jest
          .spyOn(collectionsSubgraph, 'query')
          .mockResolvedValueOnce({ analytics: graphResponse })
      })

      it('should fetch the Total data en return it', async () => {
        const { collectionsSubgraph } = components
        expect(await analyticsDayData.fetch(filters)).toEqual(graphResponse)
        expect(collectionsSubgraph.query).toHaveBeenCalledWith(
          getAnalyticsTotalDataQuery()
        )
      })
    })

    describe('and the "from" filter is not 0', () => {
      let filters: AnalyticsDayDataFilters
      let graphResponse: AnalyticsDayDataFragment[]

      beforeEach(() => {
        const { collectionsSubgraph } = components
        graphResponse = [
          {
            id: '123',
            date: 123,
            creatorsEarnings: '2203087999500000000000',
            daoEarnings: '20530000000000000000',
            sales: 103,
            volume: '16268919980000000001000',
          },
        ]
        filters = {
          network: Network.MATIC,
          from: Date.now(),
        }
        jest
          .spyOn(collectionsSubgraph, 'query')
          .mockResolvedValueOnce({ analytics: graphResponse })
      })

      it('should fetch the Day data and return it', async () => {
        const { collectionsSubgraph } = components
        expect(await analyticsDayData.fetch(filters)).toEqual(graphResponse)
        expect(collectionsSubgraph.query).toHaveBeenCalledWith(
          getAnalyticsDayDataQuery(filters)
        )
      })
    })
  })
})

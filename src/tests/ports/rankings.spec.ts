import { test } from '../../../src/tests/components'
import { getAccumulatedAnalyticsData } from '../../logic/rankings'
import {
  AnalyticsDataFragment,
  AnalyticsTimeframe,
} from '../../ports/analyticsDayData/types'
import { getTimestampFromTimeframe } from '../../ports/analyticsDayData/utils'
import { createRankingsComponent } from '../../ports/rankings/component'
import { IRankingsComponent } from '../../ports/rankings/types'

test('rankings component', function ({ components }) {
  let rankingsComponent: IRankingsComponent

  beforeEach(() => {
    const { analyticsData } = components
    rankingsComponent = createRankingsComponent(analyticsData)
  })

  beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date(2020, 3, 1))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  describe('when fetching the rankings by timeframe', () => {
    describe('and one valid timeframe is passed', () => {
      let graphResponse: AnalyticsDataFragment[]
      let timeframe: AnalyticsTimeframe

      beforeEach(() => {
        const { analyticsData } = components
        timeframe = AnalyticsTimeframe.WEEK
        graphResponse = [
          {
            id: '123',
            date: 123,
            creatorsEarnings: '2203087999500000000000',
            daoEarnings: '20530000000000000000',
            sales: 103,
            volume: '16268919980000000001000',
          },
          {
            id: '123',
            date: 123,
            creatorsEarnings: '2703087999500000000000',
            daoEarnings: '12530000000000000000',
            sales: 200,
            volume: '56268919980000000001000',
          },
        ]

        jest.spyOn(analyticsData, 'fetch').mockResolvedValueOnce(graphResponse)
      })

      it('should fetch the data and return the accumulated result', async () => {
        const { analyticsData } = components
        expect(await rankingsComponent.fetch(timeframe)).toEqual(
          getAccumulatedAnalyticsData(graphResponse)
        )
        expect(analyticsData.fetch).toHaveBeenCalledWith({
          from: getTimestampFromTimeframe(timeframe),
        })
      })
    })
  })
})

import { test } from '../components'
import { getAccumulatedAnalyticsData } from '../../logic/volume'
import { AnalyticsTimeframe } from '../../ports/analyticsDayData/types'
import { getTimestampFromTimeframe } from '../../ports/analyticsDayData/utils'
import { IVolumeComponent } from '../../ports/volume/types'
import { createVolumeComponent } from '../../ports/volume/component'
import { AnalyticsDayData } from '@dcl/schemas'

test('volume component', function ({ components }) {
  let volumeComponent: IVolumeComponent

  beforeEach(() => {
    const { analyticsData } = components
    volumeComponent = createVolumeComponent(analyticsData)
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
      let analyticsDataFetchResponse: AnalyticsDayData[]
      let timeframe: AnalyticsTimeframe

      beforeEach(() => {
        const { analyticsData } = components
        timeframe = AnalyticsTimeframe.WEEK
        analyticsDataFetchResponse = [
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

        jest
          .spyOn(analyticsData, 'fetch')
          .mockResolvedValueOnce(analyticsDataFetchResponse)
      })

      it('should fetch the data and return the accumulated result', async () => {
        const { analyticsData } = components
        expect(await volumeComponent.fetch(timeframe)).toEqual(
          getAccumulatedAnalyticsData(analyticsDataFetchResponse)
        )
        expect(analyticsData.fetch).toHaveBeenCalledWith({
          from: getTimestampFromTimeframe(timeframe),
        })
      })
    })
  })
})

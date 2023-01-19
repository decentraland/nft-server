import { AnalyticsDayData } from '@dcl/schemas'
import BN from 'bn.js'
import { getAccumulatedAnalyticsData } from '../../logic/volume'

describe('getAccumulatedAnalyticsData', () => {
  let days: AnalyticsDayData[]
  beforeEach(() => {
    days = [
      {
        id: '123',
        date: 123,
        sales: 10,
        volume: '4000000000000000000',
        creatorsEarnings: '2000000000000000000',
        daoEarnings: '3000000000000000000',
      },
      {
        id: '123',
        date: 123,
        sales: 5,
        volume: '3000000000000000000',
        creatorsEarnings: '1000000000000000000',
        daoEarnings: '4000000000000000000',
      },
    ]
  })
  describe('when providing fragments with volume data', () => {
    it('should return the accumulated data by adding them', () => {
      expect(getAccumulatedAnalyticsData(days)).toStrictEqual({
        sales: days[0].sales + days[1].sales,
        volume: new BN(days[0].volume).add(new BN(days[1].volume)).toString(),
        creatorsEarnings: new BN(days[0].creatorsEarnings)
          .add(new BN(days[1].creatorsEarnings))
          .toString(),
        daoEarnings: new BN(days[0].daoEarnings)
          .add(new BN(days[1].daoEarnings))
          .toString(),
      })
    })
  })
})

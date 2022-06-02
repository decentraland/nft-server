import BN from 'bn.js'
import { getAccumulatedAnalyticsData } from '../../../src/logic/volume'
import { AnalyticsDataFragment } from '../../ports/analyticsDayData/types'

describe('getAccumulatedAnalyticsData', () => {
  let fragments: AnalyticsDataFragment[]
  beforeEach(() => {
    fragments = [
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
      expect(getAccumulatedAnalyticsData(fragments)).toStrictEqual({
        sales: fragments[0].sales + fragments[1].sales,
        volume: new BN(fragments[0].volume)
          .add(new BN(fragments[1].volume))
          .toString(),
        creatorsEarnings: new BN(fragments[0].creatorsEarnings)
          .add(new BN(fragments[1].creatorsEarnings))
          .toString(),
        daoEarnings: new BN(fragments[0].daoEarnings)
          .add(new BN(fragments[1].daoEarnings))
          .toString(),
      })
    })
  })
})

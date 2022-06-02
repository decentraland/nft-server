import BN from 'bn.js'
import { AnalyticsDayData } from '@dcl/schemas'
import { AnalyticsDataFragment } from '../ports/analyticsDayData/types'

export function getAccumulatedAnalyticsData(
  fragments: AnalyticsDataFragment[]
) {
  return fragments.reduce((acc, dayData) => {
    if (!Object.values(acc).length) {
      return {
        sales: dayData.sales,
        volume: dayData.volume,
        creatorsEarnings: dayData.creatorsEarnings,
        daoEarnings: dayData.daoEarnings,
      }
    }
    return {
      sales: acc.sales + dayData.sales,
      volume: new BN(acc.volume).add(new BN(dayData.volume)).toString(),
      creatorsEarnings: new BN(acc.creatorsEarnings)
        .add(new BN(dayData.creatorsEarnings))
        .toString(),
      daoEarnings: new BN(acc.daoEarnings)
        .add(new BN(dayData.daoEarnings))
        .toString(),
    }
  }, {} as Pick<AnalyticsDayData, 'sales' | 'volume' | 'creatorsEarnings' | 'daoEarnings'>)
}

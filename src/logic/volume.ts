import BN from 'bn.js'
import { AnalyticsDayData } from '@dcl/schemas'

export function getAccumulatedAnalyticsData(days: AnalyticsDayData[]) {
  const base: Pick<
    AnalyticsDayData,
    'sales' | 'rentals' | 'volume' | 'creatorsEarnings' | 'daoEarnings'
  > = {
    sales: 0,
    rentals: 0,
    volume: '0',
    creatorsEarnings: '0',
    daoEarnings: '0',
  }

  return days.reduce(
    (acc, day) => ({
      sales: acc.sales + day.sales,
      rentals: acc.rentals + day.rentals,
      volume: new BN(acc.volume).add(new BN(day.volume)).toString(),
      creatorsEarnings: new BN(acc.creatorsEarnings)
        .add(new BN(day.creatorsEarnings))
        .toString(),
      daoEarnings: new BN(acc.daoEarnings)
        .add(new BN(day.daoEarnings))
        .toString(),
    }),
    base
  )
}

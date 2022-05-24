import { AnalyticsDayDataFilters } from '@dcl/schemas'

export const getAnalyticsDayDataFragment = () => `
  fragment analyticsDayDataFragment on AnalyticsDayData {
    id
    date
    sales
    volume
    creatorsEarnings
    daoEarnings
  }
`

export function getAnalyticsDayDataQuery(filters: AnalyticsDayDataFilters) {
  const { from } = filters

  const where: string[] = []

  if (from) {
    where.push(`date_gt: ${Math.round(from / 1000)}`)
  }

  return `
    query AnalyticsDayData {
      analyticsDayDatas(where: { ${where.join('\n')} }) {
        ...analyticsDayDataFragment
      }
    }
    ${getAnalyticsDayDataFragment()}
  `
}

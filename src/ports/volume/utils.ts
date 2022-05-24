import { VolumeFilters } from './types'

export const getVolumeFragment = () => `
  fragment volumeFragment on VolumeDayData {
    id
    date
    dailySales
    dailyVolumeMANA
    dailyCreatorsEarnings
    dailyDAOEarnings
  }
`

export function getVolumeQuery(filters: VolumeFilters) {
  const { from } = filters

  const where: string[] = []

  if (from) {
    where.push(`date_gt: ${Math.round(from / 1000)}`)
  }

  return `
    query Volume {
      volumeDayDatas(where: { ${where.join('\n')} }) {
        ...volumeFragment
      }
    }
    ${getVolumeFragment()}
  `
}

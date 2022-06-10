import { Item } from '@dcl/schemas'
import { TrendingFilters } from './types'

export type TrendingSaleFragment = {
  searchItemId: string
  searchContractAddress: string
}

export function fromTrendingSaleFragment(fragment: TrendingSaleFragment) {
  return {
    itemId: fragment.searchItemId,
    contractAddress: fragment.searchContractAddress,
  }
}

export const getTrendingSaleFragment = () => `
  fragment saleFragment on Sale {
    searchItemId
    searchContractAddress
  }
`

export function getTrendingsQuery(filters: TrendingFilters, isCount = false) {
  const { from, skip, first } = filters

  const where: string[] = []

  if (from) {
    where.push(`timestamp_gt: "${Math.round(from / 1000)}"`)
  }

  return `
      query Sales {
        sales(
          first: ${first}, 
          ${skip ? `skip: ${skip}` : ''}
          orderBy: timestamp, 
          orderDirection: desc, 
          where: {
            ${where.join('\n')}
          }) 
          { ${isCount ? 'id' : `...saleFragment`} }
      }
      ${isCount ? '' : getTrendingSaleFragment()}
    `
}

export function findItemByItemId(items: Item[], id: string) {
  const [contractAddress, itemId] = id.split('-')
  return items.find(
    (item) => contractAddress === item.contractAddress && itemId === item.itemId
  )
}

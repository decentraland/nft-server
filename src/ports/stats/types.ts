export enum EstateStat {
  SIZE = 'size',
}

export type ResourceStats = EstateStat

export enum StatsCategory {
  ESTATE = 'estate',
}

export type StatsResourceParams = {
  stat: ResourceStats
  category: StatsCategory
  isOnSale?: boolean
}

export type Stats = Record<number, number>

export interface IStatsComponent {
  fetch(params: StatsResourceParams): Promise<Stats>
}

export type FetchEstateSizeOpts = {
  first: number
  skip: number
}

export type FetchEstateSizesQueryFragment = {
  searchEstateSize: number
  id: string
}

export type FetchEstateSizesQueryFragment2 = {
  data: {
    nfts: {
      searchEstateSize: number
    }[]
  }
}

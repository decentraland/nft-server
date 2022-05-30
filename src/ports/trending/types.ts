import { NFTResult } from '../nfts/types'

export type TrendingFilters = {
  size?: number
}

export interface ITrendingsComponent {
  fetch({ size }: TrendingFilters): Promise<NFTResult[]>
}

import { Item } from '@dcl/schemas'

export type TrendingFilters = {
  size?: number
  from?: number
  skip?: number
  first?: number
}

export interface ITrendingsComponent {
  fetch({ size }: TrendingFilters): Promise<Item[]>
}

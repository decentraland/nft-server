import { Item } from '@dcl/schemas'

export type TrendingFilters = {
  size?: number
  from?: number
  skip?: number
  first?: number
  pickedBy?: string
}

export interface ITrendingsComponent {
  fetch({ size }: TrendingFilters): Promise<Item[]>
}

import { Item } from '@dcl/schemas'

export type TrendingFilters = {
  size?: number
}

export interface ITrendingsComponent {
  fetch({ size }: TrendingFilters): Promise<Item[]>
}

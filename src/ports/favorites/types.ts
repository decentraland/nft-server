export type IFavoritesComponent = {
  getPicksStatsOfItems(
    itemIds: string[],
    userAddress?: string
  ): Promise<PickStats[]>
}

export type PickStats = {
  itemId: string
  count: number
  pickedByUser?: boolean
}

export type FavoritesServerErrorResponse<T> = {
  ok: boolean
  message: string
  data?: T
}

export type FavoritesServerResponse<T> = {
  ok: boolean
  data: T
}

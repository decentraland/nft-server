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

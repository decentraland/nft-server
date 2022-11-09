import { NFTCategory, NFTFilters, NFTSortBy } from '@dcl/schemas'

export const PROHIBITED_FILTERS: (keyof NFTFilters)[] = [
  'itemRarities',
  'isWearableHead',
  'isWearableAccessory',
  'isWearableSmart',
  'wearableCategory',
  'wearableGenders',
  'emoteCategory',
  'emoteGenders',
  'itemId',
  'isOnSale',
]

export const PROHIBITED_SORTING: NFTSortBy[] = [
  NFTSortBy.RECENTLY_LISTED,
  NFTSortBy.RECENTLY_SOLD,
  NFTSortBy.CHEAPEST,
]

export function shouldFetch(filters: NFTFilters): boolean {
  const setFilters = Object.entries(filters)
    .filter(
      ([_, value]) =>
        (Array.isArray(value) && (value as Array<any>).length > 0) ||
        (!Array.isArray(value) && value !== undefined)
    )
    .map(([key]) => key)
  const categoriesIsSetAndIsNotLAND =
    filters.category &&
    filters.category !== NFTCategory.ESTATE &&
    filters.category !== NFTCategory.PARCEL
  const categoriesIsNotSetAndIsNotLand = !filters.category && !filters.isLand
  const prohibitedFilterIsSet = PROHIBITED_FILTERS.some(
    (prohibitedFilter) =>
      setFilters.includes(prohibitedFilter) &&
      Boolean(filters[prohibitedFilter])
  )
  const prohibitedSortingIsSet =
    filters.sortBy && PROHIBITED_SORTING.includes(filters.sortBy)

  return (
    !(
      prohibitedSortingIsSet ||
      prohibitedFilterIsSet ||
      categoriesIsSetAndIsNotLAND ||
      categoriesIsNotSetAndIsNotLand
    ) && Boolean(filters.isOnRent)
  )
}

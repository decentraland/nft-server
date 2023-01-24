import { Contract, NFTCategory, NFTFilters, NFTSortBy } from '@dcl/schemas'

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

/**
 * From a list of contracts return the addresses of the land and estate contracts.
 * Will throw an error if the addresses are not found.
 */
export function getLandAndEstateContractAddresses(
  contracts: Contract[]
): { land: string; estate: string } {
  let land: string | undefined
  let estate: string | undefined

  for (const contract of contracts) {
    if (contract.name === 'LAND') {
      land = contract.address.toLowerCase()
    } else if (contract.name === 'Estates') {
      estate = contract.address.toLowerCase()
    }
  }

  if (!land || !estate) {
    throw new Error('LAND and Estates contracts are required')
  }

  return {
    land,
    estate,
  }
}

/**
 * Util function that determines if the rentals nft component should be used.
 */
export function rentalNFTComponentShouldFetch(filters: NFTFilters): boolean {
  return (
    // The lookup for assets on rent is done by another component.
    !filters.isOnRent &&
    // Only Lands and Estates can be locked in the rentals contract.
    (!!filters.isLand ||
      (!!filters.category &&
        (filters.category === NFTCategory.ESTATE ||
          filters.category === NFTCategory.PARCEL))) &&
    // The rentals subgraph is queried mainly by lessor, se this param is required.
    !!filters.owner
  )
}

import { Item, ItemSortBy } from '@dcl/schemas'
import { Sortable } from '../../ports/merger/types'
import { isAddress } from '../../logic/address'

// Custom error classes for validation errors
export class InvalidContractAddressError extends Error {
  constructor(address: string) {
    super(`Invalid contract address: ${address}`)
    this.name = 'InvalidContractAddressError'
  }
}

export class InvalidItemIdError extends Error {
  constructor() {
    super('Invalid itemId, must be a valid BigInt')
    this.name = 'InvalidItemIdError'
  }
}

export function convertItemToSortableResult(
  result: Item
): Sortable<Item, ItemSortBy> {
  return {
    result,
    sort: {
      [ItemSortBy.NEWEST]: result.createdAt,
      [ItemSortBy.RECENTLY_REVIEWED]: result.reviewedAt,
      [ItemSortBy.RECENTLY_SOLD]: result.soldAt,
      [ItemSortBy.NAME]: result.name,
      [ItemSortBy.CHEAPEST]: result.available > 0 ? +result.price : null,
      [ItemSortBy.RECENTLY_LISTED]: result.firstListedAt,
    },
  }
}

/**
 * Validates the contract addresses and itemId parameters for item-related queries
 * @param contractAddresses Array of contract addresses to validate
 * @param itemId The itemId to validate if any
 * @throws InvalidContractAddressError or InvalidItemIdError if validation fails
 */
export function validateItemsParams(
  contractAddresses: string[],
  itemId?: string | null
): void {
  // Validate contract addresses if any
  if (contractAddresses.length > 0) {
    for (const address of contractAddresses) {
      if (!isAddress(address)) {
        throw new InvalidContractAddressError(address)
      }
    }
  }

  // Validate itemId if any
  if (itemId) {
    try {
      BigInt(itemId)
    } catch (error) {
      throw new InvalidItemIdError()
    }
  }
}

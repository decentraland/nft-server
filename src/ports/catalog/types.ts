// import { ListingStatus } from '@dcl/schemas'

import { Item } from '@dcl/schemas'

export type CatalogItem = Item

export type CatalogFilters = any

export interface ICatalogComponent {
  fetch(filters: CatalogFilters): Promise<CatalogItem[]>
  // count(filters: CatalogFilters): Promise<number>
}

// export type OrderFragment = {
//   id: string
//   marketplaceAddress: string
//   nftAddress: string
//   owner: string
//   buyer: string | null
//   price: string
//   status: ListingStatus
//   expiresAt: string
//   createdAt: string
//   updatedAt: string
//   nft: {
//     tokenId: string
//   }
// }

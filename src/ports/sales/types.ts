import { Sale, SaleFilters, SaleType } from '@dcl/schemas'

export interface ISalesComponent {
  fetch(filters: SaleFilters): Promise<Sale[]>
  count(filters: SaleFilters): Promise<number>
}

export type SaleFragment = {
  id: string
  type: SaleType
  buyer: string
  seller: string
  price: string
  timestamp: string
  txHash: string
  searchItemId: string
  searchTokenId: string
  searchContractAddress: string
}

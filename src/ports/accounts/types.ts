import { Account, AccountFilters } from '@dcl/schemas'

export interface IAccountsComponent {
  fetch(filters: AccountFilters): Promise<Account[]>
  count(filters: AccountFilters): Promise<number>
}

export type AccountFragment = {
  id: string
  address: string
  sales: number
  purchases: number
  spent: string
  earned: string
  royalties: string
}

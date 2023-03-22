import { Order, OrderFilters, OrderSortBy } from '@dcl/schemas'
import { FetchOptions, IMergerComponent } from '../../ports/merger/types'
import { IOrdersComponent } from '../../ports/orders/types'

export function createOrdersSource(
  orders: IOrdersComponent
): IMergerComponent.Source<Order, OrderFilters, OrderSortBy> {
  async function fetch(filters: FetchOptions<OrderFilters, OrderSortBy>) {
    const results = await orders.fetch(filters)
    return results.map((result) => ({
      result,
      sort: {
        [OrderSortBy.RECENTLY_LISTED]: result.createdAt,
        [OrderSortBy.RECENTLY_UPDATED]: result.updatedAt,
        [OrderSortBy.CHEAPEST]: +result.price,
        [OrderSortBy.ISSUED_ID_ASC]: result.tokenId,
        [OrderSortBy.ISSUED_ID_DESC]: result.tokenId,
        [OrderSortBy.OLDEST]: result.createdAt,
      },
    }))
  }

  async function count(filters: FetchOptions<OrderFilters, OrderSortBy>) {
    const total = await orders.count(filters)
    return total
  }

  return {
    fetch,
    count,
  }
}

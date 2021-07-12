import { FetchOptions, IMergerComponent } from '../../ports/merger/types'
import {
  IOrdersComponent,
  Order,
  OrderFilters,
  OrderSortBy,
} from '../../ports/orders/types'

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

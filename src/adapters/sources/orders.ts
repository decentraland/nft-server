import { FetchOptions, Source } from '../../ports/merger/types'
import {
  IOrdersComponent,
  Order,
  OrderOptions,
  OrderSortBy,
} from '../../ports/orders/types'

export function createOrdersSource(
  orders: IOrdersComponent
): Source<Order, OrderOptions, OrderSortBy> {
  async function fetch(options: FetchOptions<OrderOptions, OrderSortBy>) {
    const results = await orders.fetch(options)
    return results.map((result) => ({
      result,
      sort: {
        [OrderSortBy.RECENTLY_LISTED]: result.createdAt,
        [OrderSortBy.RECENTLY_UPDATED]: result.updatedAt,
        [OrderSortBy.CHEAPEST]: +result.price,
      },
    }))
  }

  async function count(options: FetchOptions<OrderOptions, OrderSortBy>) {
    const results = await orders.fetch(options)
    return results.length
  }

  return {
    fetch,
    count,
  }
}

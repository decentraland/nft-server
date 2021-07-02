import { createMergerComponent } from '../../ports/merger/component'
import { Order, OrderOptions, OrderSortBy } from '../../ports/orders/types'
import { AppComponents } from '../../types'
import { createOrdersSource } from '../sources/orders'

export function createOrderMerger(components: AppComponents) {
  const { marketplaceOrders, collectionsOrders } = components
  const marketplaceOrdersSource = createOrdersSource(marketplaceOrders)
  const collectionsOrdersSource = createOrdersSource(collectionsOrders)
  const merger = createMergerComponent<Order, OrderOptions, OrderSortBy>({
    sources: [marketplaceOrdersSource, collectionsOrdersSource],
    sortBy: OrderSortBy,
    maxCount: 1000,
  })
}

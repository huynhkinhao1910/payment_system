import type { RouteObject } from 'react-router-dom'
import TransactionDetailPage from '@/modules/merchant/TransactionDetailPage'
import TransactionListPage from './TransactionListPage'
import { transactions } from './data'

export const transactionRoutes: RouteObject[] = [
  { path: 'transactions', element: <TransactionListPage /> },
  // The eye opens the same Transaction Detail comp the payout report uses, so it
  // reuses that page with this list's rows rather than a copy of it.
  {
    path: 'transactions/:transactionNo',
    element: (
      <TransactionDetailPage
        rows={transactions}
        backTo="/transactions"
        breadcrumb="/Transactions/ Transaction List/ Transaction Detail"
      />
    ),
  },
]

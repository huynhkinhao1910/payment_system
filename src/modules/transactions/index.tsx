import type { RouteObject } from 'react-router-dom'
import TransactionDetailPage from '@/modules/merchant/TransactionDetailPage'
import TransactionListPage from './TransactionListPage'
import PaylinkListPage from './PaylinkListPage'
import CreatePaylinkPage from './CreatePaylinkPage'
import RefundRequestPage from './RefundRequestPage'
import { transactions, refundRequests } from './data'

// ponytail: Paylink view/edit and refund detail comps aren't designed yet — the
// lists' actions link here so open-in-new-tab still works, replace when built.
const paylinkTodo = <p className="text-[13px] text-neutral-500">Paylink page — not built yet.</p>

export const transactionRoutes: RouteObject[] = [
  { path: 'transactions', element: <TransactionListPage /> },
  { path: 'paylinks', element: <PaylinkListPage /> },
  { path: 'paylinks/new', element: <CreatePaylinkPage /> },
  { path: 'paylinks/:transactionNo', element: paylinkTodo },
  { path: 'paylinks/:transactionNo/edit', element: paylinkTodo },
  { path: 'refund-requests', element: <RefundRequestPage /> },
  {
    path: 'refund-requests/:transactionNo',
    element: (
      <TransactionDetailPage
        rows={refundRequests}
        backTo="/refund-requests"
        breadcrumb="/Transactions/ Refund/ View Detail"
        title="REQUEST REFUND DETAIL"
      />
    ),
  },
  // The eye opens the same Transaction Detail comp the payout report uses, so it
  // reuses that page with this list's rows rather than a copy of it.
  {
    path: 'transactions/:transactionNo',
    element: (
      <TransactionDetailPage
        rows={transactions}
        backTo="/transactions"
        breadcrumb="/Dashboard/ Transaction/ Transaction Detail"
      />
    ),
  },
]

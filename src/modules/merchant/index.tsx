import type { RouteObject } from 'react-router-dom'
import MerchantListPage from './MerchantListPage'
import MerchantFormPage from './MerchantFormPage'
import MerchantPayoutReportPage from './MerchantPayoutReportPage'
import TransactionDetailPage from './TransactionDetailPage'

export const merchantRoutes: RouteObject[] = [
  { path: 'merchants', element: <MerchantListPage /> },
  { path: 'merchants/new', element: <MerchantFormPage /> },
  { path: 'merchants/:code', element: <MerchantFormPage readOnly /> },
  { path: 'merchants/:code/edit', element: <MerchantFormPage /> },
  // A sibling of the merchant list in the nav, so a sibling in the URL too. Nested
  // under /merchants it would match the list's NavLink and light both entries up.
  { path: 'merchant-payout-report', element: <MerchantPayoutReportPage /> },
  { path: 'merchant-payout-report/:transactionNo', element: <TransactionDetailPage /> },
]

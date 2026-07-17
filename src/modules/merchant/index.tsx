import type { RouteObject } from 'react-router-dom'
import MerchantListPage from './MerchantListPage'
import MerchantFormPage from './MerchantFormPage'

export const merchantRoutes: RouteObject[] = [
  { path: 'merchants', element: <MerchantListPage /> },
  { path: 'merchants/new', element: <MerchantFormPage /> },
  { path: 'merchants/:code/edit', element: <MerchantFormPage /> },
]

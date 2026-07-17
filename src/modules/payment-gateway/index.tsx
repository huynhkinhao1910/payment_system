import type { RouteObject } from 'react-router-dom'
import GatewayListPage from './GatewayListPage'
import GatewayDetailPage from './GatewayDetailPage'

export const paymentGatewayRoutes: RouteObject[] = [
  { path: 'payment-gateways', element: <GatewayListPage /> },
  { path: 'payment-gateways/:code', element: <GatewayDetailPage /> },
]

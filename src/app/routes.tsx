import type { RouteObject } from 'react-router-dom'
import Layout from '@/shared/layout/Layout'
import { dashboardRoutes } from '@/modules/dashboard'
import { merchantRoutes } from '@/modules/merchant'
import { paymentGatewayRoutes } from '@/modules/payment-gateway'

// ponytail: Transactions, System Log and Tools are designed but not built.
// They get a placeholder until each becomes its own module.
function Placeholder({ name }: { name: string }) {
  return <p className="text-[13px] text-neutral-500">{name} — not built yet.</p>
}

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      ...dashboardRoutes,
      ...merchantRoutes,
      ...paymentGatewayRoutes,
      { path: 'transactions', element: <Placeholder name="Transactions" /> },
      { path: 'system-log', element: <Placeholder name="System Log" /> },
      { path: 'tools', element: <Placeholder name="Tools" /> },
    ],
  },
]

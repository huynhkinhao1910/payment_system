import type { RouteObject } from 'react-router-dom'
import Layout from '@/shared/layout/Layout'
import { dashboardRoutes } from '@/modules/dashboard'
import { merchantRoutes } from '@/modules/merchant'

// ponytail: Payment Gateway, Transactions, System Log and Tools are designed
// but not built. They get a placeholder until each becomes its own module.
function Placeholder({ name }: { name: string }) {
  return <p className="text-[13px] text-neutral-500">{name} — not built yet.</p>
}

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      ...dashboardRoutes,
      ...merchantRoutes,
      { path: 'payment-gateway', element: <Placeholder name="Payment Gateway" /> },
      { path: 'transactions', element: <Placeholder name="Transactions" /> },
      { path: 'system-log', element: <Placeholder name="System Log" /> },
      { path: 'tools', element: <Placeholder name="Tools" /> },
    ],
  },
]

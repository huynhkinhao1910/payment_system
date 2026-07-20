import type { RouteObject } from 'react-router-dom'
import Layout from '@/shared/layout/Layout'
import NotFound from '@/shared/layout/NotFound'
import NoPermission from '@/shared/layout/NoPermission'
import { dashboardRoutes } from '@/modules/dashboard'
import { merchantRoutes } from '@/modules/merchant'
import { paymentGatewayRoutes } from '@/modules/payment-gateway'
import { transactionRoutes } from '@/modules/transactions'

// ponytail: System Log and Tools are designed but not built.
// They get a placeholder until each becomes its own module.
function Placeholder({ name }: { name: string }) {
  return <p className="text-[13px] text-neutral-500">{name} — not built yet.</p>
}

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    // Any uncaught render/loader error lands on the 404 page instead of a blank screen.
    errorElement: <NotFound />,
    children: [
      ...dashboardRoutes,
      ...merchantRoutes,
      ...paymentGatewayRoutes,
      ...transactionRoutes,
      { path: 'system-log', element: <Placeholder name="System Log" /> },
      { path: 'tools', element: <Placeholder name="Tools" /> },
      { path: 'no-permission', element: <NoPermission /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]

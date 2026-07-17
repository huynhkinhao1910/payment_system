import iconDashboard from '@/assets/icon-dashboard.svg'
import iconMerchant from '@/assets/icon-merchant.svg'
import iconPayment from '@/assets/icon-payment.svg'
import iconLog from '@/assets/icon-log.svg'
import iconTool from '@/assets/icon-tool.svg'

export type NavItem = {
  label: string
  icon: string
  to?: string
  children?: { to: string; label: string }[]
}

// Sidebar order and icons come from the Figma comp (node 3:5). A module that
// adds a page registers it here and in src/app/routes.tsx.
//
// ponytail: only Merchant has children so far. The rest keep their chevron from
// the comp but have no sub-pages designed yet. "Master Merchant Payout Report"
// is in the comp's sidebar too — it lands here once that page is built.
export const NAV: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: iconDashboard },
  {
    label: 'Merchant',
    icon: iconMerchant,
    children: [
      { to: '/merchants', label: 'Merchant List' },
      { to: '/merchant-payout-report', label: 'Merchant Payout Report' },
    ],
  },
  {
    label: 'Payment Gateway',
    icon: iconPayment,
    children: [{ to: '/payment-gateways', label: 'Payment Gateway List' }],
  },
  // ponytail: the comp also lists Payee List, Refund Request and Transaction
  // Change Status here — none are designed yet, so only the list is registered.
  {
    label: 'Transactions',
    icon: iconPayment,
    children: [{ to: '/transactions', label: 'Transaction List' }],
  },
  { label: 'System Log', icon: iconLog, children: [] },
  { label: 'Tools', icon: iconTool, children: [] },
]

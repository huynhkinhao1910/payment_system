// ponytail: static mock data matching the Figma comps. Swap for API calls when the backend exists.

export const statCards = [
  { label: 'Today Transactions', value: '20', tone: 'purple' },
  { label: 'Today Transactions Volume', value: 'MYR 0.00', tone: 'green' },
  { label: 'Last 7 days Transactions', value: '2', tone: 'blue' },
  { label: 'Last 7 days Transactions Volume', value: 'MYR 1,011.60', tone: 'orange' },
] as const

// ponytail: the comp's x-axis reads Sun, Mon, Tue, Thu, Fri, Sat — Wed is
// missing (node 8:182). A week has seven days, so Wed is included here.
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const transactionsByValue = DAYS.map((day, i) => ({
  day,
  current: [33, 27, 18, 43, 60, 86, 50][i],
  last: [96, 80, 96, 88, 68, 28, 85][i],
}))

export const transactionsByNumber = DAYS.map((day, i) => ({
  day,
  current: [41, 22, 63, 35, 78, 54, 47][i],
  last: [58, 74, 30, 66, 45, 90, 39][i],
}))

export type TopMerchant = { code: string; name: string; value: number }

// From Figma node 12:444, which is a flattened raster ("image 3") rather than
// real layers — values and copy read off the picture, spacing approximated.
// The "Today" panels are empty in the comp.
export const topMerchants = {
  transactionsToday: [] as TopMerchant[],
  volumeToday: [] as TopMerchant[],
  transactions7d: [{ code: 'A00001', name: 'ABC Test Merchant', value: 2 }],
  volume7d: [{ code: 'A00001', name: 'ABC Test Merchant', value: 1011.6 }],
  transactions30d: [
    { code: 'B00001', name: 'BBB Test Merchant', value: 5 },
    { code: 'A00001', name: 'ABC Test Merchant', value: 5 },
  ],
  volume30d: [
    { code: 'A00001', name: 'ABC Test Merchant', value: 1025.52 },
    { code: 'B00001', name: 'BBB Test Merchant', value: 158.55 },
  ],
}

export const transactions = Array.from({ length: 12 }, (_, i) => ({
  transactionNo: `10275${(1000 + i).toString()}`,
  createdOn: `16/07/2026 14:${(10 + i).toString().padStart(2, '0')}`,
  merchantOrderNo: `ORD-2026-${(4500 + i).toString()}`,
  merchantTrxNo: `TRX${(880000 + i * 7).toString()}`,
  merchantCode: 'M0001',
  merchantName: 'ABC Test Merchant',
  amount: (10 + i * 3.45).toFixed(2),
  currency: 'MYR',
  status: i % 4 === 0 ? 'Pending' : 'Success',
  gateway: 'RAZERPAY',
  method: i % 2 === 0 ? 'FPX' : 'Card',
  gatewayType: 'RPP-GATEWAY',
}))

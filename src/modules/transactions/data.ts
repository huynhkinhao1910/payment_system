// ponytail: static mock data matching the Figma comp. Swap for API calls when the backend exists.
import type { Payout } from '@/modules/merchant/data'

// The eye opens the same Transaction Detail comp the payout report uses, so a
// row carries Payout's fields plus the columns this list adds.
export type Transaction = Payout & {
  createdOn: string
  pgConfirmNo: string
  customerCashNo: string
  gatewayType: string
}

export const TRANSACTION_STATUSES = ['All', 'Pending', 'Approved', 'Failed']

// The comp alternates two shapes of row: a plain FASSPAY charge and one carrying
// a gateway sub-type. Only every fifth row shows a PG confirm number.
export const transactions: Transaction[] = Array.from({ length: 24 }, (_, i) => {
  const card = i % 2 === 0
  return {
    transactionNo: `F20260717000000${(1 + i).toString().padStart(2, '0')}`,
    createdOn: `17/07/2026 1${i % 9}:44:32`,
    merchantTransNo: `C2607${17 + (i % 2)}SX1S1917`,
    merchantOrderNo: `T60719000000${(4 + i).toString().padStart(2, '0')}`,
    merchantCode: 'A00001',
    merchantName: 'ABC Test Merchant',
    transactionAmount: card ? '16.24' : '4.64',
    currencyCode: 'MYR',
    pgConfirmNo: i % 5 === 0 ? `3694832${480 + i}` : '',
    customerCashNo: '',
    customerEmail: 'tsc@gmail.com',
    customerPhone: '+60123456788',
    customerName: 'customer test',
    gatewayCode: 'FMSPAY',
    gatewayType: card ? '-' : 'FASSPAYCARD',
    status: 'Pending',
    gatewayCodeSub: card ? '' : 'FASSPAYCARD',
    grossPayout: card ? '16.24' : '4.64',
    netPayout: card ? '16.24' : '4.58',
    merchantRate: card ? '-' : '1.3',
    merchantFee: card ? '' : '0.06',
    transactionDate: `17/07/2026 1${i % 9}:44:32`,
    customerConfirmMess: '-',
    customerAddress: '-',
    customerIpAddress: '10.116.21.169',
    gatewayStatus: '',
    gatewayConfirmMessage: '',
    remark: '-',
  }
})

// Paylink List (Transactions/ Paylink List). A flat row — no shared Transaction
// Detail comp behind it yet, so it doesn't extend Payout.
export type Paylink = {
  transactionNo: string
  createdOn: string
  merchantCode: string
  customerName: string
  customerEmail: string
  transactionAmount: string
  currencyCode: string
  status: string
}

export const PAYLINK_STATUSES = ['All', 'Pending', 'Approved', 'Failed']

export const paylinks: Paylink[] = Array.from({ length: 24 }, (_, i) => ({
  transactionNo: `Y202606B0000000${(1 + i).toString().padStart(2, '0')}`,
  createdOn: `08/06/2026 10:${(30 - (i % 4)).toString().padStart(2, '0')}:07`,
  merchantCode: 'SI0001',
  customerName: 'SINNO Test Merchant',
  customerEmail: 'nguyenductong860432@gmail.com',
  transactionAmount: '110.00',
  currencyCode: 'MYR',
  status: 'Pending',
}))

// Request Refund (Transactions/ Request Refund). The eye opens the same
// read-only Transaction Detail comp, so a row is a Payout plus the refund list's
// own columns. Approved On/By stay blank until a refund is acted on.
export type RefundRequest = Payout & {
  createdOn: string
  approvedOn: string
  createdBy: string
  approvedBy: string
}

export const REFUND_STATUSES = ['All', 'Pending', 'Approved', 'Error']

export const refundRequests: RefundRequest[] = Array.from({ length: 24 }, (_, i) => {
  const status = ['Approved', 'Pending', 'Approved', 'Pending', 'Error', 'Pending'][i % 6]
  const approved = status === 'Approved'
  return {
    transactionNo: `Y202606B0000000${(1 + i).toString().padStart(2, '0')}`,
    merchantCode: 'SI0001',
    merchantName: 'SINNO Test Merchant',
    merchantTransNo: `C2606${17 + (i % 2)}SX1S1917`,
    merchantOrderNo: `T60608000000${(4 + i).toString().padStart(2, '0')}`,
    transactionAmount: '110.00',
    currencyCode: 'MYR',
    createdOn: `08/06/2026 10:${(30 - (i % 4)).toString().padStart(2, '0')}:07`,
    approvedOn: approved ? '09/06/2026 10:38:07' : '-',
    createdBy: 'Hao Huynh',
    approvedBy: approved ? 'Suriey Nguyen' : '-',
    status,
    transactionDate: `08/06/2026 10:${(30 - (i % 4)).toString().padStart(2, '0')}:07`,
    customerName: 'MSGYENO',
    customerEmail: 'nkecl@gmail.com',
    customerPhone: '+60123456788',
    customerAddress: '-',
    customerIpAddress: '10.116.21.169',
    customerConfirmMess: '-',
    gatewayCode: 'FMSPAY',
    gatewayCodeSub: '',
    gatewayStatus: '',
    gatewayConfirmMessage: '',
    grossPayout: '110.00',
    netPayout: '110.00',
    merchantRate: '-',
    merchantFee: '',
    remark: '-',
  }
})

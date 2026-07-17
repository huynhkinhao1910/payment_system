// ponytail: static mock data matching the Figma comps. Swap for API calls when the backend exists.

export type Merchant = {
  merchantCode: string
  merchantName: string
  companyRegNo: string
  createdOn: string
  address: string
  countryName: string
  contactPerson: string
  contactPhone: string
  status: string
}

export const merchants: Merchant[] = Array.from({ length: 10 }, (_, i) => ({
  merchantCode: `SO${(1 + i).toString().padStart(4, '0')}`,
  merchantName: 'Souqa Payment Testing',
  companyRegNo: `2026071600${(1 + i).toString().padStart(2, '0')}`,
  createdOn: `16/07/2026 11:49:${(28 + i).toString().padStart(2, '0')}`,
  address: '168, Jalan, Bukit Bintang, 55100 Kuala Lumpur',
  countryName: 'Malaysia',
  contactPerson: 'Tanya',
  contactPhone: `6011452800${i}`,
  status: 'Approved',
}))

export type Payout = {
  transactionNo: string
  merchantCode: string
  merchantName: string
  merchantTransNo: string
  merchantOrderNo: string
  gatewayCode: string
  gatewayCodeSub: string
  grossPayout: string
  netPayout: string
  merchantRate: string
  merchantFee: string
  transactionDate: string
  status: string
  // The Transaction Detail comp (a payout row opened via the eye) shows these
  // on top of the report's columns. Same record, so they live on the same type.
  customerName: string
  transactionAmount: string
  currencyCode: string
  customerConfirmMess: string
  customerAddress: string
  customerEmail: string
  customerPhone: string
  customerIpAddress: string
  gatewayStatus: string
  gatewayConfirmMessage: string
  remark: string
}

// The comp alternates two shapes of row: a card payout that carries a gateway
// sub-code but no rate, and a bank payout that carries a rate and fee.
export const payouts: Payout[] = Array.from({ length: 10 }, (_, i) => {
  const card = i % 2 === 0
  return {
    transactionNo: `F20260716000000${(1 + i).toString().padStart(2, '0')}`,
    merchantCode: '800001',
    merchantName: 'Souqa Payment Testing',
    merchantTransNo: `C2607${16 + (i % 2)}SX1S1917`,
    merchantOrderNo: `T60719000000${(4 + i).toString().padStart(2, '0')}`,
    gatewayCode: card ? 'FASSPAY' : 'FMSPAY',
    gatewayCodeSub: card ? 'FASSPAYCARD' : '',
    grossPayout: card ? '4.64' : '3.72',
    netPayout: card ? '4.64' : '3.66',
    merchantRate: card ? '-' : '1.3',
    merchantFee: card ? '' : '0.04',
    transactionDate: `${16 - (i % 2)}/07/2026 1${i % 9}:56:32`,
    status: card ? 'Pending' : 'Approved',
    customerName: 'MZ/MIMO',
    transactionAmount: card ? '11.8' : '3.72',
    currencyCode: 'MYR',
    customerConfirmMess: '-',
    customerAddress: '-',
    customerEmail: 'abc@gmail.com',
    customerPhone: '60127321123',
    customerIpAddress: '10.116.21.169',
    gatewayStatus: '',
    gatewayConfirmMessage: '',
    remark: '-',
  }
})

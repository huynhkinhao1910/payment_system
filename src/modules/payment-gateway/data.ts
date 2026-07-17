// ponytail: static mock data matching the Figma comp. Swap for API calls when the backend exists.

export type Gateway = {
  gatewayCode: string
  gatewayName: string
  creditCardRate: string
  maxCreditCardFee: string
  debitCardRate: string
  maxDebitCardFee: string
  ewalletRate: string
  maxEwalletFee: string
  onlineBankingRate: string
  maxOnlineBankingFee: string
  status: string
  currencyCode: string
  createdOn: string
  updatedOn: string
  // The detail comp shows these two on top of the list's columns. Same record,
  // so they live on the same type.
  parentMerchantCode: string
  merchantTransactionNo: string
}

// The comp alternates two shapes of gateway: SouqPay charges nothing, FassPay
// carries a card rate and an ewallet/banking fee. Codes are suffixed so each
// row has a unique key and the sort has something to order.
export const gateways: Gateway[] = Array.from({ length: 20 }, (_, i) => {
  const souq = i % 2 === 0
  const n = (1 + i).toString().padStart(2, '0')
  return {
    gatewayCode: `${souq ? 'SOUQPAY' : 'FASSPAY'}${n}`,
    gatewayName: souq ? 'SouqPay' : 'FassPay',
    creditCardRate: souq ? '0' : '0.6',
    maxCreditCardFee: '0',
    debitCardRate: souq ? '0' : '0.6',
    maxDebitCardFee: '0',
    ewalletRate: '0',
    maxEwalletFee: souq ? '0' : '0.4',
    onlineBankingRate: '0',
    maxOnlineBankingFee: souq ? '0' : '0.4',
    status: 'Active',
    currencyCode: 'MYR',
    createdOn: `${16 - (i % 2)}/07/2026 18:${16 + i}:32`,
    updatedOn: `${16 - (i % 2)}/07/2026 18:${16 + i}:32`,
    parentMerchantCode: '-',
    merchantTransactionNo: `CJ897602${(3980 + i).toString()}`,
  }
})

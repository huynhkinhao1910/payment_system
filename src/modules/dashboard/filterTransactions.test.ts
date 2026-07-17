import { expect, test } from 'vitest'
import { ALL, emptyFilters, filterTransactions, optionsFor, toIsoDate, type Transaction } from './filterTransactions'

const row = (over: Partial<Transaction> = {}): Transaction => ({
  transactionNo: '102751000',
  createdOn: '16/07/2026 14:10',
  merchantOrderNo: 'ORD-2026-4500',
  merchantTrxNo: 'TRX880000',
  merchantCode: 'M0001',
  merchantName: 'ABC Test Merchant',
  currency: 'MYR',
  status: 'Success',
  gateway: 'RAZERPAY',
  ...over,
})

test('empty filters keep every row', () => {
  const rows = [row(), row({ transactionNo: '102751001' })]
  expect(filterTransactions(rows, emptyFilters())).toHaveLength(2)
})

test('search matches transaction no, trx no and merchant name, case-insensitively', () => {
  const rows = [row({ transactionNo: '111' }), row({ transactionNo: '222', merchantName: 'Souqa Testing' })]
  expect(filterTransactions(rows, { ...emptyFilters(), search: '222' })).toHaveLength(1)
  expect(filterTransactions(rows, { ...emptyFilters(), search: 'souqa' })[0].transactionNo).toBe('222')
  expect(filterTransactions(rows, { ...emptyFilters(), search: 'TRX880000' })).toHaveLength(2)
})

test('search that matches nothing yields no rows', () => {
  expect(filterTransactions([row()], { ...emptyFilters(), search: 'nope' })).toHaveLength(0)
})

test('dropdowns narrow by exact value and All keeps everything', () => {
  const rows = [row({ status: 'Success' }), row({ transactionNo: '2', status: 'Pending' })]
  expect(filterTransactions(rows, { ...emptyFilters(), status: 'Pending' })).toHaveLength(1)
  expect(filterTransactions(rows, { ...emptyFilters(), status: ALL })).toHaveLength(2)
})

test('date range is inclusive on both ends', () => {
  const rows = [
    row({ transactionNo: 'a', createdOn: '15/07/2026 09:00' }),
    row({ transactionNo: 'b', createdOn: '16/07/2026 14:10' }),
    row({ transactionNo: 'c', createdOn: '17/07/2026 23:59' }),
  ]
  const within = filterTransactions(rows, { ...emptyFilters(), from: '2026-07-15', to: '2026-07-16' })
  expect(within.map((r) => r.transactionNo)).toEqual(['a', 'b'])
})

test('converts dd/mm/yyyy to an ISO date', () => {
  expect(toIsoDate('16/07/2026 14:10')).toBe('2026-07-16')
})

test('filters combine', () => {
  const rows = [
    row({ transactionNo: 'a', status: 'Pending', currency: 'MYR' }),
    row({ transactionNo: 'b', status: 'Pending', currency: 'SGD' }),
  ]
  const out = filterTransactions(rows, { ...emptyFilters(), status: 'Pending', currency: 'SGD' })
  expect(out.map((r) => r.transactionNo)).toEqual(['b'])
})

test('options list All first, then sorted distinct values', () => {
  const rows = [row({ status: 'Success' }), row({ status: 'Pending' }), row({ status: 'Success' })]
  expect(optionsFor(rows, 'status')).toEqual([ALL, 'Pending', 'Success'])
})

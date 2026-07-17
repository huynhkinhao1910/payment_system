import { expect, test } from 'vitest'
import type { Merchant } from './data'
import { sortMerchants } from './sortMerchants'

const rows = (...codes: string[]) => codes.map((merchantCode) => ({ merchantCode }) as Merchant)
const codes = (list: Merchant[]) => list.map((m) => m.merchantCode)

test('sorts ascending by merchant code', () => {
  expect(codes(sortMerchants(rows('SO0003', 'SO0001', 'SO0002'), 'asc'))).toEqual(['SO0001', 'SO0002', 'SO0003'])
})

test('sorts descending by merchant code', () => {
  expect(codes(sortMerchants(rows('SO0001', 'SO0003', 'SO0002'), 'desc'))).toEqual(['SO0003', 'SO0002', 'SO0001'])
})

test('orders numerically, not lexically', () => {
  expect(codes(sortMerchants(rows('SO10', 'SO9', 'SO100'), 'asc'))).toEqual(['SO9', 'SO10', 'SO100'])
})

test('does not mutate the input', () => {
  const input = rows('SO0002', 'SO0001')
  sortMerchants(input, 'asc')
  expect(codes(input)).toEqual(['SO0002', 'SO0001'])
})

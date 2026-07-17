import { expect, test } from 'vitest'
import { barPercent, formatValue } from './TopMerchantsPanel'

const rows = (...values: number[]) => values.map((value, i) => ({ code: `M${i}`, name: 'x', value }))

test('the largest row fills the bar and others scale against it', () => {
  const data = rows(1025.52, 158.55)
  expect(barPercent(1025.52, data)).toBe(100)
  expect(barPercent(158.55, data)).toBeCloseTo(15.46, 1)
})

test('equal values give equal bars', () => {
  const data = rows(5, 5)
  expect(barPercent(5, data)).toBe(100)
})

test('all-zero rows do not divide by zero', () => {
  expect(barPercent(0, rows(0, 0))).toBe(0)
})

test('formats counts plainly and volume as MYR with two decimals', () => {
  expect(formatValue(2, 'count')).toBe('2')
  expect(formatValue(1011.6, 'currency')).toBe('MYR 1,011.60')
  expect(formatValue(158.55, 'currency')).toBe('MYR 158.55')
})

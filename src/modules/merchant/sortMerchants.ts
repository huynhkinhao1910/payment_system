import type { Merchant } from './data'

export type SortDir = 'asc' | 'desc'

// Numeric collation so SO0009 sorts before SO0010 — a plain string compare
// puts "SO0010" first once the codes reach two digits.
export function sortMerchants(rows: Merchant[], dir: SortDir): Merchant[] {
  return [...rows].sort((a, b) => {
    const cmp = a.merchantCode.localeCompare(b.merchantCode, undefined, { numeric: true, sensitivity: 'base' })
    return dir === 'asc' ? cmp : -cmp
  })
}

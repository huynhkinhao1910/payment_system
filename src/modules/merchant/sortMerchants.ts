import type { Merchant } from './data'

export type SortDir = 'asc' | 'desc'

// null → asc → desc → null: the third click drops the sort and hands the rows
// back in the order they arrived, which no asc/desc pair can express.
export const nextSortDir = (dir: SortDir | null): SortDir | null =>
  dir === null ? 'asc' : dir === 'asc' ? 'desc' : null

// Numeric collation so SO0009 sorts before SO0010 — a plain string compare
// puts "SO0010" first once the codes reach two digits.
export function sortRows<T>(rows: T[], pick: (row: T) => string, dir: SortDir): T[] {
  return [...rows].sort((a, b) => {
    const cmp = pick(a).localeCompare(pick(b), undefined, { numeric: true, sensitivity: 'base' })
    return dir === 'asc' ? cmp : -cmp
  })
}

export const sortMerchants = (rows: Merchant[], dir: SortDir) => sortRows(rows, (m) => m.merchantCode, dir)

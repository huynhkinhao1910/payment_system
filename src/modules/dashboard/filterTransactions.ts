export type Transaction = {
  transactionNo: string
  createdOn: string
  merchantOrderNo: string
  merchantTrxNo: string
  merchantCode: string
  merchantName: string
  currency: string
  status: string
  gateway: string
}

export type Filters = {
  search: string
  from: string
  to: string
  currency: string
  gateway: string
  status: string
}

export const ALL = 'All'

export const emptyFilters = (): Filters => ({ search: '', from: '', to: '', currency: ALL, gateway: ALL, status: ALL })

// Fields the free-text box looks at, per the comp's placeholder
// ("Enter Transaction No, Merchant Trans No,...").
const SEARCH_FIELDS = ['transactionNo', 'merchantTrxNo', 'merchantOrderNo', 'merchantCode', 'merchantName'] as const

// "16/07/2026 14:10" -> "2026-07-16", so dates compare as plain strings
// against what <input type="date"> hands back.
export function toIsoDate(createdOn: string): string {
  const [day, month, year] = createdOn.split(' ')[0].split('/')
  return `${year}-${month}-${day}`
}

export function filterTransactions<T extends Transaction>(rows: T[], filters: Filters): T[] {
  const needle = filters.search.trim().toLowerCase()
  return rows.filter((row) => {
    if (needle && !SEARCH_FIELDS.some((f) => row[f].toLowerCase().includes(needle))) return false
    if (filters.currency !== ALL && row.currency !== filters.currency) return false
    if (filters.gateway !== ALL && row.gateway !== filters.gateway) return false
    if (filters.status !== ALL && row.status !== filters.status) return false
    const date = toIsoDate(row.createdOn)
    if (filters.from && date < filters.from) return false
    if (filters.to && date > filters.to) return false
    return true
  })
}

export const optionsFor = <T extends Transaction>(rows: T[], key: 'currency' | 'gateway' | 'status') => [
  ALL,
  ...[...new Set(rows.map((r) => r[key]))].sort(),
]

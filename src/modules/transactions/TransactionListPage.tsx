import { useState } from 'react'
import FilterBar, { type Field } from '@/shared/ui/FilterBar'
import Pagination from '@/shared/ui/Pagination'
import { filterRows } from '@/shared/ui/filterRows'
import StatCard from '@/modules/dashboard/components/StatCard'
import { nextSortDir, sortRows, type SortDir } from '@/modules/merchant/sortMerchants'
import TransactionListTable from './components/TransactionListTable'
import { transactions, TRANSACTION_STATUSES } from './data'

const FIELDS: Field[] = [
  { label: 'Transaction No', key: 'transactionNo' },
  { label: 'Merchant TransNo', key: 'merchantTransNo' },
  { label: 'Merchant OrderNo', key: 'merchantOrderNo' },
  { label: 'Merchant Code', key: 'merchantCode' },
  { label: 'Currency Code', key: 'currencyCode' },
  { label: 'Customer Email', key: 'customerEmail' },
  { label: 'Customer Phone', key: 'customerPhone' },
  { label: 'Customer Name', key: 'customerName' },
  { label: 'Transaction Status', key: 'status', options: TRANSACTION_STATUSES },
]

// Totals are the comp's figures, not derived from the rows — the comp counts the
// whole result set, of which `transactions` is one mock page.
const STATS = [
  { label: 'Total Count', value: '184', tone: 'purple' },
  { label: 'Total Amount', value: 'MYR 0.00', tone: 'green' },
  { label: 'Total Count', value: '0', tone: 'blue' },
  { label: 'Total Amount', value: 'MYR 0.00', tone: 'orange' },
] as const

export default function TransactionListPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [sortDir, setSortDir] = useState<SortDir | null>(null)
  const [filters, setFilters] = useState<Record<string, string>>({})
  const filtered = filterRows(transactions, filters, FIELDS)
  const pages = Math.max(1, Math.ceil(filtered.length / perPage))
  // Sorting the whole set before paging keeps page 1 on the true first rows;
  // untouched, the rows stay in the order they arrived.
  const sorted = sortDir ? sortRows(filtered, (t) => t.transactionNo, sortDir) : filtered
  const visible = sorted.slice((page - 1) * perPage, page * perPage)

  const toggleSort = () => {
    setSortDir(nextSortDir)
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-[22px]">
      <div>
        <h1 className="text-[14px] font-medium text-[#353535]">TRANSACTION LIST</h1>
        <p className="mt-[15px] text-[11px] text-[#575757]">/Transactions/ Transaction List</p>
      </div>

      <FilterBar
        fields={FIELDS}
        onSubmit={(v) => {
          setFilters(v)
          setPage(1)
        }}
      />

      <div className="grid gap-[22px] sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s, i) => (
          <StatCard key={i} label={s.label} value={s.value} tone={s.tone} />
        ))}
      </div>

      <div className="rounded-[4px] bg-white p-[28px] shadow-card">
        <div className="flex flex-wrap items-center justify-end gap-[12px]">
          <label className="flex items-center gap-[8px] text-[12px] text-[#6c6c6c]">
            Show
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value))
                setPage(1)
              }}
              className="h-[26px] rounded-[3px] border border-[#c8c8c8] px-[6px]"
            >
              {[10, 25, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            rows/entries
          </label>
        </div>

        <div className="mt-[20px]">
          <TransactionListTable rows={visible} sortDir={sortDir} onToggleSort={toggleSort} />
        </div>

        <div className="mt-[20px]">
          <Pagination page={page} pages={pages} onChange={setPage} />
        </div>
      </div>
    </div>
  )
}

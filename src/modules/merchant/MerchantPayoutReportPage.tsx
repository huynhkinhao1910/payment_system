import { useState } from 'react'
import Pagination from '@/shared/ui/Pagination'
import FilterBar, { type Field } from '@/shared/ui/FilterBar'
import { filterRows } from '@/shared/ui/filterRows'
import PayoutTable from './components/PayoutTable'
import { payouts } from './data'
import { nextSortDir, sortRows, type SortDir } from './sortMerchants'

// ponytail: payout rows carry no Company RegNo, so filtering is by the two fields
// they actually hold — add the third when the data does.
const FIELDS: Field[] = [
  { label: 'Merchant Code', key: 'merchantCode' },
  { label: 'Merchant Name', key: 'merchantName' },
]

export default function MerchantPayoutReportPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [sortDir, setSortDir] = useState<SortDir | null>(null)
  const [filters, setFilters] = useState<Record<string, string>>({})
  const filtered = filterRows(payouts, filters, FIELDS)
  const pages = Math.max(1, Math.ceil(filtered.length / perPage))
  // Sorting the whole set before paging keeps page 1 on the true first rows;
  // untouched, the rows stay in the order they arrived.
  const sorted = sortDir ? sortRows(filtered, (p) => p.transactionNo, sortDir) : filtered
  const visible = sorted.slice((page - 1) * perPage, page * perPage)

  const toggleSort = () => {
    setSortDir(nextSortDir)
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-[22px]">
      <div>
        <h1 className="text-[14px] font-medium text-[#353535]">MERCHANT PAYOUT REPORT</h1>
        <p className="mt-[15px] text-[11px] text-[#575757]">/Merchant/ Merchant Payout Report</p>
      </div>

      <FilterBar
        fields={FIELDS}
        onSubmit={(v) => {
          setFilters(v)
          setPage(1)
        }}
      />

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
          <PayoutTable rows={visible} sortDir={sortDir} onToggleSort={toggleSort} />
        </div>

        <div className="mt-[20px]">
          <Pagination page={page} pages={pages} onChange={setPage} />
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import FilterBar, { type Field } from '@/shared/ui/FilterBar'
import Pagination from '@/shared/ui/Pagination'
import { filterRows } from '@/shared/ui/filterRows'
import { nextSortDir, sortRows, type SortDir } from '@/modules/merchant/sortMerchants'
import RefundRequestTable from './components/RefundRequestTable'
import { refundRequests, REFUND_STATUSES } from './data'

const FIELDS: Field[] = [
  { label: 'Transaction No', key: 'transactionNo' },
  { label: 'Merchant Code', key: 'merchantCode' },
  { label: 'Transaction Status', key: 'status', options: REFUND_STATUSES },
]

export default function RefundRequestPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [sortDir, setSortDir] = useState<SortDir | null>(null)
  const [filters, setFilters] = useState<Record<string, string>>({})
  const filtered = filterRows(refundRequests, filters, FIELDS)
  const pages = Math.max(1, Math.ceil(filtered.length / perPage))
  const sorted = sortDir ? sortRows(filtered, (r) => r.transactionNo, sortDir) : filtered
  const visible = sorted.slice((page - 1) * perPage, page * perPage)

  const toggleSort = () => {
    setSortDir(nextSortDir)
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-[22px]">
      <div>
        <h1 className="text-[14px] font-medium text-[#353535]">REQUEST REFUND</h1>
        <p className="mt-[15px] text-[11px] text-[#575757]">/Transactions/ Request Refund</p>
      </div>

      <FilterBar
        fields={FIELDS}
        onSubmit={(v) => {
          setFilters(v)
          setPage(1)
        }}
      />

      <div>
        <Link
          to="/paylinks/new"
          className="inline-flex h-[30px] items-center rounded-[3px] bg-[#f1b44c] px-[16px] text-[13px] font-medium text-white"
        >
          Create Paylink
        </Link>
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
          <RefundRequestTable rows={visible} sortDir={sortDir} onToggleSort={toggleSort} />
        </div>

        <div className="mt-[20px]">
          <Pagination page={page} pages={pages} onChange={setPage} />
        </div>
      </div>
    </div>
  )
}

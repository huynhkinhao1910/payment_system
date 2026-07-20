import { useState } from 'react'
import FilterBar, { type Field } from '@/shared/ui/FilterBar'
import Pagination from '@/shared/ui/Pagination'
import { filterRows } from '@/shared/ui/filterRows'
import { nextSortDir, sortRows, type SortDir } from '@/modules/merchant/sortMerchants'
import GatewayTable from './components/GatewayTable'
import { gateways } from './data'

const FIELDS: Field[] = [
  { label: 'Payment Gateway Name', key: 'gatewayName' },
  { label: 'Payment Gateway Code', key: 'gatewayCode' },
]

export default function GatewayListPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [sortDir, setSortDir] = useState<SortDir | null>(null)
  const [filters, setFilters] = useState<Record<string, string>>({})
  const filtered = filterRows(gateways, filters, FIELDS)
  const pages = Math.max(1, Math.ceil(filtered.length / perPage))
  // Sorting the whole set before paging keeps page 1 on the true first rows;
  // untouched, the rows stay in the order they arrived.
  const sorted = sortDir ? sortRows(filtered, (g) => g.gatewayCode, sortDir) : filtered
  const visible = sorted.slice((page - 1) * perPage, page * perPage)

  const toggleSort = () => {
    setSortDir(nextSortDir)
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-[22px]">
      <div>
        <h1 className="text-[14px] font-medium text-[#353535]">PAYMENT GATEWAY LIST</h1>
        <p className="mt-[15px] text-[11px] text-[#575757]">/Payment Gateway/ Payment Gateway List</p>
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
          <GatewayTable rows={visible} sortDir={sortDir} onToggleSort={toggleSort} />
        </div>

        <div className="mt-[20px]">
          <Pagination page={page} pages={pages} onChange={setPage} />
        </div>
      </div>
    </div>
  )
}

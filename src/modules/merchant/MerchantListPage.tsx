import { useState } from 'react'
import { Link } from 'react-router-dom'
import Pagination from '@/shared/ui/Pagination'
import MerchantFilter from './components/MerchantFilter'
import MerchantTable from './components/MerchantTable'
import { merchants } from './data'
import { sortMerchants, type SortDir } from './sortMerchants'

export default function MerchantListPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const pages = Math.max(1, Math.ceil(merchants.length / perPage))
  // Sort the whole set before paging, so page 1 holds the true first rows.
  const visible = sortMerchants(merchants, sortDir).slice((page - 1) * perPage, page * perPage)

  const toggleSort = () => {
    setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-[22px]">
      <div>
        <h1 className="text-[14px] font-medium text-[#353535]">MERCHANT LIST</h1>
        <p className="mt-[15px] text-[11px] text-[#575757]">/Merchant/ Merchant List</p>
      </div>

      <MerchantFilter />

      <div className="rounded-[4px] bg-white p-[28px] shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-[12px]">
          <Link
            to="/merchants/new"
            className="flex h-[30px] items-center justify-center rounded-[3px] bg-[#f1b44c] px-[10px] text-[13px] font-medium text-white"
          >
            Add Merchant
          </Link>
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
          <MerchantTable rows={visible} sortDir={sortDir} onToggleSort={toggleSort} />
        </div>

        <div className="mt-[20px]">
          <Pagination page={page} pages={pages} onChange={setPage} />
        </div>
      </div>
    </div>
  )
}

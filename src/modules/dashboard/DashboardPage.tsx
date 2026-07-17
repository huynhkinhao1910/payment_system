import { useState } from 'react'
import Pagination from '@/shared/ui/Pagination'
import StatCard from './components/StatCard'
import TransactionChart from './components/TransactionChart'
import TransactionTable from './components/TransactionTable'
import TransactionFilter from './components/TransactionFilter'
import TopMerchantsPanel from './components/TopMerchantsPanel'
import { statCards, topMerchants, transactions, transactionsByValue, transactionsByNumber } from './data'
import { emptyFilters, filterTransactions, type Filters } from './filterTransactions'

// Panel order matches the comp: transactions down the left, volume down the right.
const TOP_MERCHANT_PANELS = [
  { title: 'Top Merchants Transaction Today', rows: topMerchants.transactionsToday, kind: 'count' },
  { title: 'Top Merchants Trans Volume Today', rows: topMerchants.volumeToday, kind: 'currency' },
  { title: 'Top Merchants Transactions Last 7 days', rows: topMerchants.transactions7d, kind: 'count' },
  { title: 'Top Merchants Trans Volume Last 7 days', rows: topMerchants.volume7d, kind: 'currency' },
  { title: 'Top Merchants Transactions Last 30 days', rows: topMerchants.transactions30d, kind: 'count' },
  { title: 'Top Merchants Trans Volume Last 30 days', rows: topMerchants.volume30d, kind: 'currency' },
] as const

export default function DashboardPage() {
  const [filters, setFilters] = useState<Filters>(emptyFilters)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const rows = filterTransactions(transactions, filters)
  const pages = Math.max(1, Math.ceil(rows.length / perPage))
  const visible = rows.slice((page - 1) * perPage, page * perPage)

  // A new filter set has its own page 1 — staying on page 3 of the old result
  // set lands on an empty table.
  const applyFilters = (f: Filters) => {
    setFilters(f)
    setPage(1)
  }

  return (
    // Column counts key off the container, not the viewport — collapsing the sidebar
    // to its rail hands these grids ~190px more and should be allowed to add a column.
    <div className="@container flex flex-col gap-[24px]">
      <div>
        <h1 className="text-[14px] font-bold tracking-wide text-black">DASHBOARD</h1>
        <p className="mt-[15px] text-[11px] text-neutral-500">/Dashboard</p>
      </div>

      <div className="grid grid-cols-2 gap-[22px] @min-[1090px]:grid-cols-4">
        {statCards.map((c) => (
          <StatCard key={c.label} {...c} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-[22px] @min-[920px]:grid-cols-2">
        <TransactionChart
          title="Transaction by Value"
          subtitle="Current vs Last week on value of transactions"
          yLabel="Transaction by Value"
          data={transactionsByValue}
        />
        <TransactionChart
          title="Transaction by Number"
          subtitle="Current vs Last week on number of transactions"
          yLabel="Transaction by Number"
          data={transactionsByNumber}
        />
      </div>

      <div className="grid grid-cols-1 gap-[22px] @min-[800px]:grid-cols-2">
        {TOP_MERCHANT_PANELS.map((panel) => (
          <TopMerchantsPanel key={panel.title} title={panel.title} rows={panel.rows} kind={panel.kind} />
        ))}
      </div>

      <div className="rounded-[4px] bg-white p-[24px] shadow-card">
        <TransactionFilter onApply={applyFilters} />
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
          <TransactionTable rows={visible} />
        </div>

        <div className="mt-[20px]">
          <Pagination page={page} pages={pages} onChange={setPage} />
        </div>
      </div>
    </div>
  )
}

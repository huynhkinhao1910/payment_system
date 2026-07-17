import { Link } from 'react-router-dom'
import iconEye from '@/assets/icon-eye.svg'
import DataTable, { type Column } from '@/shared/ui/DataTable'
import type { SortDir } from '@/modules/merchant/sortMerchants'
import type { Transaction } from '../data'

const COLUMNS: Column[] = [
  { label: ['Transaction No'], sortable: true },
  { label: ['Created On'] },
  { label: ['Merchant Trans No', 'Merchant Order No'] },
  { label: ['Merchant Code', 'Merchant Name'] },
  { label: ['Transaction Amount'] },
  { label: ['Currency Code'] },
  { label: ['PG ConfirmNo', 'Customer CashNo'] },
  { label: ['Customer Email', 'Customer Phone', 'Customer Name'] },
  { label: ['Payment Gateway'] },
  { label: ['Payment Gateway Type'] },
  { label: ['Status'] },
  { label: ['Action'] },
]

const ACTION = 'flex size-[26px] items-center justify-center rounded-full transition-colors'

// Colour carries the same meaning as the text, so the text stays — it's the only
// thing a screen reader or a colour-blind reader gets.
const STATUS_TINT: Record<string, string> = {
  Pending: 'bg-[#ffeede] text-[#f1b44c]',
  Approved: 'bg-[#e0f5e8] text-[#34c38f]',
  Failed: 'bg-[#ffe3e3] text-[#ff5353]',
}

export default function TransactionListTable({
  rows,
  sortDir,
  onToggleSort,
}: {
  rows: Transaction[]
  sortDir: SortDir | null
  onToggleSort: () => void
}) {
  return (
    <DataTable
      columns={COLUMNS}
      rows={rows}
      rowKey={(t) => t.transactionNo}
      minWidth="min-w-[1400px]"
      sortDir={sortDir}
      onToggleSort={onToggleSort}
      cells={(t) => [
        t.transactionNo,
        t.createdOn,
        [t.merchantTransNo, t.merchantOrderNo],
        [t.merchantCode, t.merchantName],
        t.transactionAmount,
        t.currencyCode,
        [t.pgConfirmNo, t.customerCashNo],
        [t.customerEmail, t.customerPhone, t.customerName],
        t.gatewayCode,
        t.gatewayType,
        // oxlint-disable-next-line jsx-key -- DataTable renders a cell as its <td>'s only child, not as an array item
        <span className={`rounded-[3px] px-[8px] py-[3px] text-[11px] ${STATUS_TINT[t.status] ?? ''}`}>{t.status}</span>,
      ]}
      action={(t) => (
        <Link
          to={`/transactions/${t.transactionNo}`}
          aria-label={`View ${t.transactionNo}`}
          className={`${ACTION} hover:bg-[#e3f0ff]`}
        >
          <img src={iconEye} alt="" className="size-[16px]" />
        </Link>
      )}
    />
  )
}

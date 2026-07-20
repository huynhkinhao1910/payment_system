import { Link } from 'react-router-dom'
import iconEye from '@/assets/icon-eye.svg'
import DataTable, { type Column } from '@/shared/ui/DataTable'
import StatusBadge from '@/shared/ui/StatusBadge'
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
        <StatusBadge
          variant={
            t.status === 'Pending' ? 'pending' : t.status === 'Approved' ? 'success' : t.status === 'Failed' ? 'danger' : 'neutral'
          }
        >
          {t.status}
        </StatusBadge>,
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

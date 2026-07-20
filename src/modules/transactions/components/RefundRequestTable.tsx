import { Link } from 'react-router-dom'
import iconEye from '@/assets/icon-eye.svg'
import DataTable, { type Column } from '@/shared/ui/DataTable'
import StatusBadge from '@/shared/ui/StatusBadge'
import type { SortDir } from '@/modules/merchant/sortMerchants'
import type { RefundRequest } from '../data'

const COLUMNS: Column[] = [
  { label: ['Transaction No'], sortable: true },
  { label: ['Merchant Code'] },
  { label: ['Transaction Amount'] },
  { label: ['Currency Code'] },
  { label: ['Created On'] },
  { label: ['Approved On'] },
  { label: ['Created By'] },
  { label: ['Approved By'] },
  { label: ['Status'] },
  { label: ['Action'] },
]

const ACTION = 'flex size-[26px] items-center justify-center rounded-full transition-colors'

const VARIANT = { Approved: 'success', Pending: 'pending', Error: 'danger' } as const

export default function RefundRequestTable({
  rows,
  sortDir,
  onToggleSort,
}: {
  rows: RefundRequest[]
  sortDir: SortDir | null
  onToggleSort: () => void
}) {
  return (
    <DataTable
      columns={COLUMNS}
      rows={rows}
      rowKey={(r) => r.transactionNo}
      minWidth="min-w-[1200px]"
      sortDir={sortDir}
      onToggleSort={onToggleSort}
      cells={(r) => [
        r.transactionNo,
        r.merchantCode,
        r.transactionAmount,
        r.currencyCode,
        r.createdOn,
        r.approvedOn,
        r.createdBy,
        r.approvedBy,
        // oxlint-disable-next-line jsx-key -- DataTable renders a cell as its <td>'s only child, not as an array item
        <StatusBadge variant={VARIANT[r.status as keyof typeof VARIANT] ?? 'neutral'}>{r.status}</StatusBadge>,
      ]}
      action={(r) => (
        <Link to={`/refund-requests/${r.transactionNo}`} aria-label={`View ${r.transactionNo}`} className={`${ACTION} hover:bg-[#e3f0ff]`}>
          <img src={iconEye} alt="" className="size-[16px]" />
        </Link>
      )}
    />
  )
}

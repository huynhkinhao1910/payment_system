import { Link } from 'react-router-dom'
import iconEye from '@/assets/icon-eye.svg'
import iconEdit from '@/assets/icon-edit.svg'
import DataTable, { type Column } from '@/shared/ui/DataTable'
import StatusBadge from '@/shared/ui/StatusBadge'
import type { SortDir } from '@/modules/merchant/sortMerchants'
import type { Paylink } from '../data'

const COLUMNS: Column[] = [
  { label: ['Transaction No'], sortable: true },
  { label: ['Created On'] },
  { label: ['Merchant Code'] },
  { label: ['Customer Name'] },
  { label: ['Customer Email'] },
  { label: ['Transaction Amount'] },
  { label: ['Currency Code'] },
  { label: ['Status'] },
  { label: ['Action'] },
]

const ACTION = 'flex size-[26px] items-center justify-center rounded-full transition-colors'

export default function PaylinkTable({
  rows,
  sortDir,
  onToggleSort,
}: {
  rows: Paylink[]
  sortDir: SortDir | null
  onToggleSort: () => void
}) {
  return (
    <DataTable
      columns={COLUMNS}
      rows={rows}
      rowKey={(p) => p.transactionNo}
      minWidth="min-w-[1100px]"
      sortDir={sortDir}
      onToggleSort={onToggleSort}
      cells={(p) => [
        p.transactionNo,
        p.createdOn,
        p.merchantCode,
        p.customerName,
        p.customerEmail,
        p.transactionAmount,
        p.currencyCode,
        // oxlint-disable-next-line jsx-key -- DataTable renders a cell as its <td>'s only child, not as an array item
        <StatusBadge
          variant={
            p.status === 'Pending' ? 'pending' : p.status === 'Approved' ? 'success' : p.status === 'Failed' ? 'danger' : 'neutral'
          }
        >
          {p.status}
        </StatusBadge>,
      ]}
      action={(p) => (
        <>
          <Link to={`/paylinks/${p.transactionNo}`} aria-label={`View ${p.transactionNo}`} className={`${ACTION} hover:bg-[#e3f0ff]`}>
            <img src={iconEye} alt="" className="size-[16px]" />
          </Link>
          <Link
            to={`/paylinks/${p.transactionNo}/edit`}
            aria-label={`Edit ${p.transactionNo}`}
            className={`${ACTION} hover:bg-[#e0f5e8]`}
          >
            <img src={iconEdit} alt="" className="size-[16px]" />
          </Link>
          {/* ponytail: no email backend; this is the comp's button, wire to the API when it exists. */}
          <button
            type="button"
            aria-label={`Send email to ${p.customerName}`}
            className="h-[26px] rounded-[3px] bg-[#3191ff] px-[10px] text-[11px] font-medium text-white"
          >
            Send Email
          </button>
        </>
      )}
    />
  )
}

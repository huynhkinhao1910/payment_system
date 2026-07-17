import { Link } from 'react-router-dom'
import iconEye from '@/assets/icon-eye.svg'
import DataTable, { type Column } from '@/shared/ui/DataTable'
import type { Payout } from '../data'
import type { SortDir } from '../sortMerchants'

const COLUMNS: Column[] = [
  { label: ['Transaction No'], sortable: true },
  { label: ['Merchant Code', 'Merchant Name'] },
  { label: ['Merchant TransNo', 'Merchant OrderNo'] },
  { label: ['Payment Gateway Code', 'Payment Gateway Code Sub'] },
  { label: ['GrossPayout'] },
  { label: ['NetPayout'] },
  { label: ['Merchant Rate', 'Merchant Fee'] },
  { label: ['Transaction Date'] },
  { label: ['Status'] },
  { label: ['Action'] },
]

const ACTION = 'flex size-[26px] items-center justify-center rounded-full transition-colors'

export default function PayoutTable({
  rows,
  sortDir,
  onToggleSort,
}: {
  rows: Payout[]
  sortDir: SortDir | null
  onToggleSort: () => void
}) {
  return (
    <DataTable
      columns={COLUMNS}
      rows={rows}
      rowKey={(p) => p.transactionNo}
      sortDir={sortDir}
      onToggleSort={onToggleSort}
      cells={(p) => [
        p.transactionNo,
        [p.merchantCode, p.merchantName],
        [p.merchantTransNo, p.merchantOrderNo],
        [p.gatewayCode, p.gatewayCodeSub],
        p.grossPayout,
        p.netPayout,
        [p.merchantRate, p.merchantFee],
        p.transactionDate,
        p.status,
      ]}
      action={(p) => (
        <Link
          to={`/merchant-payout-report/${p.transactionNo}`}
          aria-label={`View ${p.transactionNo}`}
          className={`${ACTION} hover:bg-[#e3f0ff]`}
        >
          <img src={iconEye} alt="" className="size-[16px]" />
        </Link>
      )}
    />
  )
}

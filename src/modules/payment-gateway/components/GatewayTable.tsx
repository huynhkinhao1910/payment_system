import { Link } from 'react-router-dom'
import iconEye from '@/assets/icon-eye.svg'
import DataTable, { type Column } from '@/shared/ui/DataTable'
import type { SortDir } from '@/modules/merchant/sortMerchants'
import type { Gateway } from '../data'

const COLUMNS: Column[] = [
  { label: ['Payment Gateway Code'], sortable: true },
  { label: ['Payment Gateway Name'] },
  { label: ['Credit Card Rate', 'Max Credit Card Fee'] },
  { label: ['Debit Card Rate', 'Max Debit Card Fee'] },
  { label: ['Ewallet Rate', 'Max Ewallet Fee'] },
  { label: ['Online Banking Rate', 'Max Online Banking Fee'] },
  { label: ['Status'] },
  { label: ['Currency Code'] },
  { label: ['Created On', 'Updated On'] },
  { label: ['Action'] },
]

const ACTION = 'flex size-[26px] items-center justify-center rounded-full transition-colors'

export default function GatewayTable({
  rows,
  sortDir,
  onToggleSort,
}: {
  rows: Gateway[]
  sortDir: SortDir | null
  onToggleSort: () => void
}) {
  return (
    <DataTable
      columns={COLUMNS}
      rows={rows}
      rowKey={(g) => g.gatewayCode}
      sortDir={sortDir}
      onToggleSort={onToggleSort}
      cells={(g) => [
        g.gatewayCode,
        g.gatewayName,
        [g.creditCardRate, g.maxCreditCardFee],
        [g.debitCardRate, g.maxDebitCardFee],
        [g.ewalletRate, g.maxEwalletFee],
        [g.onlineBankingRate, g.maxOnlineBankingFee],
        g.status,
        g.currencyCode,
        [g.createdOn, g.updatedOn],
      ]}
      action={(g) => (
        <Link
          to={`/payment-gateways/${g.gatewayCode}`}
          aria-label={`View ${g.gatewayCode}`}
          className={`${ACTION} hover:bg-[#e3f0ff]`}
        >
          <img src={iconEye} alt="" className="size-[16px]" />
        </Link>
      )}
    />
  )
}

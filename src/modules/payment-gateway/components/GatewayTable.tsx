import { Link } from 'react-router-dom'
import iconSort from '@/assets/icon-sort.svg'
import iconEye from '@/assets/icon-eye.svg'
import type { SortDir } from '@/modules/merchant/sortMerchants'
import type { Gateway } from '../data'

const COLUMNS = [
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
] as const

const BORDER = 'border-r border-b border-[#c8c8c8] first:border-l'
const HEAD = `${BORDER} h-[52px] border-t bg-white p-[10px] text-left align-middle text-[13px] font-medium text-black`
const CELL = `${BORDER} h-[52px] p-[10px] align-middle text-[12px] whitespace-nowrap text-[#6c6c6c]`

const ACTION = 'flex size-[26px] items-center justify-center rounded-full transition-colors'

function Lines({ lines }: { lines: readonly string[] }) {
  return (
    <span className="flex flex-col gap-[2px]">
      {lines.filter(Boolean).map((line) => (
        <span key={line}>{line}</span>
      ))}
    </span>
  )
}

function Row({ g, zebra }: { g: Gateway; zebra: boolean }) {
  const cells: string[][] = [
    [g.gatewayCode],
    [g.gatewayName],
    [g.creditCardRate, g.maxCreditCardFee],
    [g.debitCardRate, g.maxDebitCardFee],
    [g.ewalletRate, g.maxEwalletFee],
    [g.onlineBankingRate, g.maxOnlineBankingFee],
    [g.status],
    [g.currencyCode],
    [g.createdOn, g.updatedOn],
  ]
  return (
    <tr className={zebra ? 'bg-[#eff2f7]' : 'bg-white'}>
      {cells.map((lines, i) => (
        <td key={COLUMNS[i].label[0]} className={CELL}>
          <Lines lines={lines} />
        </td>
      ))}
      <td className={CELL}>
        <div className="flex justify-center">
          <Link
            to={`/payment-gateways/${g.gatewayCode}`}
            aria-label={`View ${g.gatewayCode}`}
            className={`${ACTION} hover:bg-[#e3f0ff]`}
          >
            <img src={iconEye} alt="" className="size-[16px]" />
          </Link>
        </div>
      </td>
    </tr>
  )
}

export default function GatewayTable({
  rows,
  sortDir,
  onToggleSort,
}: {
  rows: Gateway[]
  sortDir: SortDir
  onToggleSort: () => void
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1100px] border-separate border-spacing-0">
        <thead>
          <tr>
            {COLUMNS.map((c, i) => {
              const sortable = 'sortable' in c && c.sortable
              const cls = `${HEAD} ${i === 0 ? 'rounded-tl-[3px]' : ''} ${
                i === COLUMNS.length - 1 ? 'rounded-tr-[3px]' : ''
              }`

              if (!sortable) {
                return (
                  <th key={c.label[0]} scope="col" className={cls}>
                    <Lines lines={c.label} />
                  </th>
                )
              }
              return (
                <th
                  key={c.label[0]}
                  scope="col"
                  aria-sort={sortDir === 'asc' ? 'ascending' : 'descending'}
                  className={`${cls} p-0`}
                >
                  <button
                    type="button"
                    onClick={onToggleSort}
                    title={`Sort by ${c.label[0]} (${sortDir === 'asc' ? 'ascending' : 'descending'})`}
                    className="flex w-full cursor-pointer items-center justify-between gap-[8px] p-[10px] text-left"
                  >
                    <Lines lines={c.label} />
                    <img src={iconSort} alt="" className={`size-[18px] shrink-0 ${sortDir === 'desc' ? 'rotate-180' : ''}`} />
                  </button>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((g, i) => (
            <Row key={g.gatewayCode} g={g} zebra={i % 2 === 0} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

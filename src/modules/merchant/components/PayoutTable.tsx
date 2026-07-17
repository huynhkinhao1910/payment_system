import { Link } from 'react-router-dom'
import iconSort from '@/assets/icon-sort.svg'
import iconEye from '@/assets/icon-eye.svg'
import type { Payout } from '../data'
import type { SortDir } from '../sortMerchants'

const COLUMNS = [
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

function Row({ p, zebra }: { p: Payout; zebra: boolean }) {
  const cells: string[][] = [
    [p.transactionNo],
    [p.merchantCode, p.merchantName],
    [p.merchantTransNo, p.merchantOrderNo],
    [p.gatewayCode, p.gatewayCodeSub],
    [p.grossPayout],
    [p.netPayout],
    [p.merchantRate, p.merchantFee],
    [p.transactionDate],
    [p.status],
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
            to={`/merchant-payout-report/${p.transactionNo}`}
            aria-label={`View ${p.transactionNo}`}
            className={`${ACTION} hover:bg-[#e3f0ff]`}
          >
            <img src={iconEye} alt="" className="size-[16px]" />
          </Link>
        </div>
      </td>
    </tr>
  )
}

export default function PayoutTable({
  rows,
  sortDir,
  onToggleSort,
}: {
  rows: Payout[]
  sortDir: SortDir
  onToggleSort: () => void
}) {
  return (
    // A real <table> sizes each column to its content, so the columns track the
    // data instead of the comp's fixed px. min-w keeps it legible before it scrolls.
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
          {rows.map((p, i) => (
            <Row key={p.transactionNo} p={p} zebra={i % 2 === 0} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

import { Link } from 'react-router-dom'
import SortIcon from '@/shared/ui/SortIcon'
import iconEye from '@/assets/icon-eye.svg'
import iconEdit from '@/assets/icon-edit.svg'
import iconPassword from '@/assets/icon-password.svg'
import type { Merchant } from '../data'
import type { SortDir } from '../sortMerchants'

const COLUMNS = [
  { label: 'Merchant Code', w: 'w-[151px]', sortable: true },
  { label: 'Merchant Name', w: 'w-[157px]' },
  { label: 'Company Reg No', w: 'w-[138px]' },
  { label: 'Created On', w: 'w-[143px]' },
  { label: 'Address', w: 'w-[354px]' },
  { label: 'Country Name', w: 'w-[138px]' },
  { label: 'Contact Person', w: 'w-[148px]' },
  { label: 'Contact Phone', w: 'w-[131px]' },
  { label: 'Status', w: 'w-[92px]' },
  { label: 'Action', w: 'w-[100px]' },
] as const

const CELL = 'flex h-[41px] shrink-0 items-center border-r border-b border-[#c8c8c8] p-[10px] text-[12px] text-[#6c6c6c]'

// ponytail: the icons are <img> SVGs, so the glyph itself can't be recoloured
// without inlining them. A tinted disc behind each one carries the hover state.
const ACTION = 'flex size-[26px] items-center justify-center rounded-full transition-colors'

function Row({ m, zebra }: { m: Merchant; zebra: boolean }) {
  const bg = zebra ? 'bg-[#eff2f7]' : 'bg-white'
  const cells = [
    m.merchantCode,
    m.merchantName,
    m.companyRegNo,
    m.createdOn,
    m.address,
    m.countryName,
    m.contactPerson,
    m.contactPhone,
    m.status,
  ]
  return (
    <div className="flex items-center">
      {cells.map((value, i) => (
        <div key={COLUMNS[i].label} className={`${CELL} ${bg} ${COLUMNS[i].w} ${i === 0 ? 'border-l' : ''} truncate`}>
          <span className="truncate">{value}</span>
        </div>
      ))}
      <div className={`${CELL} ${bg} w-[100px] justify-center gap-[6px]`}>
        <Link to={`/merchants/${m.merchantCode}`} aria-label={`View ${m.merchantCode}`} className={`${ACTION} hover:bg-[#e3f0ff]`}>
          <img src={iconEye} alt="" className="size-[16px]" />
        </Link>
        <Link to={`/merchants/${m.merchantCode}/edit`} aria-label={`Edit ${m.merchantCode}`} className={`${ACTION} hover:bg-[#e0f5e8]`}>
          <img src={iconEdit} alt="" className="size-[16px]" />
        </Link>
        <button type="button" aria-label={`Reset password for ${m.merchantCode}`} className={`${ACTION} hover:bg-[#ffeede]`}>
          <img src={iconPassword} alt="" className="size-[15px]" />
        </button>
      </div>
    </div>
  )
}

export default function MerchantTable({
  rows,
  sortDir,
  onToggleSort,
}: {
  rows: Merchant[]
  sortDir: SortDir | null
  onToggleSort: () => void
}) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        <div className="flex items-center">
          {COLUMNS.map((c, i) => {
            const sortable = 'sortable' in c && c.sortable
            const cls = `flex h-[46px] shrink-0 items-center justify-between border-t border-r border-b border-[#c8c8c8] bg-white p-[10px] text-[13px] font-medium text-black ${c.w} ${
              i === 0 ? 'rounded-tl-[3px] border-l' : ''
            } ${i === COLUMNS.length - 1 ? 'rounded-tr-[3px]' : ''}`

            if (!sortable) {
              return (
                <div key={c.label} className={cls}>
                  {c.label}
                </div>
              )
            }
            return (
              <button
                key={c.label}
                type="button"
                onClick={onToggleSort}
                // ponytail: the table is divs, not <table>, so aria-sort has nothing to
                // attach to. The label carries the state until it becomes a real table.
                aria-label={
                  sortDir
                    ? `Merchant Code, sorted ${sortDir === 'asc' ? 'ascending' : 'descending'}. Click to reverse.`
                    : 'Merchant Code, not sorted. Click to sort ascending.'
                }
                title={sortDir ? `Sort by ${c.label} (${sortDir === 'asc' ? 'ascending' : 'descending'})` : `Sort by ${c.label}`}
                className={`${cls} cursor-pointer text-left`}
              >
                {c.label}
                <SortIcon dir={sortDir} />
              </button>
            )
          })}
        </div>
        {rows.map((m, i) => (
          <Row key={m.merchantCode} m={m} zebra={i % 2 === 0} />
        ))}
      </div>
    </div>
  )
}

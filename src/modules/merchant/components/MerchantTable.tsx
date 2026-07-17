import { Link } from 'react-router-dom'
import iconSort from '@/assets/icon-sort.svg'
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
      <div className={`${CELL} ${bg} w-[100px] justify-center gap-[10px]`}>
        <button type="button" aria-label={`View ${m.merchantCode}`}>
          <img src={iconEye} alt="" className="size-[16px]" />
        </button>
        <Link to={`/merchants/${m.merchantCode}/edit`} aria-label={`Edit ${m.merchantCode}`}>
          <img src={iconEdit} alt="" className="size-[16px]" />
        </Link>
        <button type="button" aria-label={`Reset password for ${m.merchantCode}`}>
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
  sortDir: SortDir
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
                aria-label={`Merchant Code, sorted ${sortDir === 'asc' ? 'ascending' : 'descending'}. Click to reverse.`}
                title={`Sort by ${c.label} (${sortDir === 'asc' ? 'ascending' : 'descending'})`}
                className={`${cls} cursor-pointer text-left`}
              >
                {c.label}
                <img src={iconSort} alt="" className={`size-[18px] ${sortDir === 'desc' ? 'rotate-180' : ''}`} />
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

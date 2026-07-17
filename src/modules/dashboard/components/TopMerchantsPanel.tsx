import type { TopMerchant } from '../data'

export const formatValue = (value: number, kind: 'count' | 'currency') =>
  kind === 'count'
    ? String(value)
    : `MYR ${value.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

// Bars are relative to the biggest row in the same panel; the widest always fills.
export function barPercent(value: number, rows: TopMerchant[]) {
  const max = Math.max(...rows.map((r) => r.value), 0)
  return max > 0 ? (value / max) * 100 : 0
}

export default function TopMerchantsPanel({
  title,
  rows,
  kind,
}: {
  title: string
  rows: TopMerchant[]
  kind: 'count' | 'currency'
}) {
  return (
    <div className="rounded-[4px] bg-white shadow-card">
      <p className="px-[20px] py-[16px] text-[13px] font-bold text-[#495057]">{title}</p>
      {rows.map((row) => (
        <div
          key={row.code}
          className="flex items-center gap-[16px] border-t border-neutral-100 px-[20px] py-[12px] text-[12px] text-[#495057]"
        >
          <span className="w-[90px] shrink-0">{row.code}</span>
          <span className="w-[150px] shrink-0">{row.name}</span>
          <span className="w-[110px] shrink-0 font-bold">{formatValue(row.value, kind)}</span>
          <span className="flex-1">
            <span
              className="block h-[3px] rounded-full bg-[#556ee6]"
              style={{ width: `${barPercent(row.value, rows)}%` }}
            />
          </span>
        </div>
      ))}
    </div>
  )
}

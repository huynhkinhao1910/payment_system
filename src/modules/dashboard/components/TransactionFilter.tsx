import { useRef, useState } from 'react'
import iconDateRange from '@/assets/icon-date-range.svg'
import DateInput from '@/shared/ui/DateInput'
import { transactions } from '../data'
import { emptyFilters, optionsFor, type Filters } from '../filterTransactions'

const LABEL = 'text-[12px] text-black'
const BOX = 'h-[36px] rounded-[2px] border border-[#c8c8c8] bg-white px-[10px] text-[11px] text-[#6c6c6c] outline-none'

// ponytail: native <select> keeps its own chevron rather than the comp's icon —
// a custom dropdown is a lot of machinery for the same behaviour.
function Select({
  label,
  width,
  value,
  options,
  onChange,
}: {
  label: string
  width: string
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  return (
    <label className={`flex flex-col gap-[8px] ${width}`}>
      <span className={LABEL}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={BOX}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}

export default function TransactionFilter({ onApply }: { onApply: (f: Filters) => void }) {
  // Draft state applies on Submit, matching the comp's button.
  const [draft, setDraft] = useState<Filters>(emptyFilters)
  const fromRef = useRef<HTMLInputElement>(null)
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => setDraft((d) => ({ ...d, [key]: value }))

  return (
    <form
      className="flex flex-wrap items-end gap-[19px]"
      onSubmit={(e) => {
        e.preventDefault()
        onApply(draft)
      }}
    >
      <label className="flex w-[210px] flex-col gap-[8px]">
        <span className={LABEL}>Search</span>
        <input
          value={draft.search}
          onChange={(e) => set('search', e.target.value)}
          placeholder="Enter Transaction No, Merchant Trans No,..."
          className={`${BOX} text-[9px] placeholder:text-[#939393]`}
        />
      </label>

      <div className="flex w-[210px] flex-col gap-[8px]">
        <span className={LABEL}>Created On</span>
        {/* ponytail: the comp draws one range control; two native date inputs
            give a real from/to without a picker library. */}
        {/* Dates are sized to their content so the pair stays tight and the
            icon keeps its place at the right edge, inside the border. */}
        <div className={`${BOX} flex items-center gap-[4px]`}>
          <DateInput
            ref={fromRef}
            aria-label="Created from"
            value={draft.from}
            onChange={(e) => set('from', e.target.value)}
            className="w-[72px] shrink-0"
          />
          <span className="shrink-0">-</span>
          <DateInput
            aria-label="Created to"
            value={draft.to}
            onChange={(e) => set('to', e.target.value)}
            className="w-[72px] shrink-0"
          />
          <button
            type="button"
            aria-label="Open date picker"
            onClick={() => fromRef.current?.showPicker?.()}
            className="ml-auto shrink-0 cursor-pointer"
          >
            <img src={iconDateRange} alt="" className="size-[18px]" />
          </button>
        </div>
      </div>

      {/* The comp labels this "Current Code"; it maps to the table's Currency column. */}
      <Select
        label="Current Code"
        width="w-[93px]"
        value={draft.currency}
        options={optionsFor(transactions, 'currency')}
        onChange={(v) => set('currency', v)}
      />
      <Select
        label="Payment Gateway"
        width="w-[119px]"
        value={draft.gateway}
        options={optionsFor(transactions, 'gateway')}
        onChange={(v) => set('gateway', v)}
      />
      <Select
        label="Status"
        width="w-[74px]"
        value={draft.status}
        options={optionsFor(transactions, 'status')}
        onChange={(v) => set('status', v)}
      />

      <button type="submit" className="h-[36px] w-[84px] rounded-[3px] bg-[#3191ff] text-[13px] font-medium text-white">
        Submit
      </button>
    </form>
  )
}

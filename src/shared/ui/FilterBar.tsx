import { useRef } from 'react'
import iconDateRange from '@/assets/icon-date-range.svg'
import DateInput from '@/shared/ui/DateInput'

const FIELD =
  'h-[31px] w-[211px] rounded-[3px] border border-[#c8c8c8] bg-white px-[13px] text-[11px] text-[#6c6c6c] placeholder:text-[#a8a8a8]'

// A field is a text input, or a select when it carries options.
type Field = string | { label: string; options: string[] }

export default function FilterBar({ fields }: { fields: Field[] }) {
  const dateRef = useRef<HTMLInputElement>(null)

  return (
    <div className="rounded-[4px] bg-white px-[28px] py-[25px] shadow-card">
      <form className="flex flex-wrap items-end gap-[19px]" onSubmit={(e) => e.preventDefault()}>
        <label className="flex flex-col gap-[2px]">
          <span className="text-[12px] text-black">Date</span>
          {/* ponytail: the comp shows a range picker; native date inputs cover it until a range is actually needed. */}
          <span className={`${FIELD} flex items-center justify-between gap-[6px] px-[10px]`}>
            <DateInput ref={dateRef} aria-label="Date" className="min-w-0 flex-1" />
            <button
              type="button"
              aria-label="Open date picker"
              onClick={() => dateRef.current?.showPicker?.()}
              className="shrink-0 cursor-pointer"
            >
              <img src={iconDateRange} alt="" className="size-[18px]" />
            </button>
          </span>
        </label>

        {fields.map((field) => {
          const label = typeof field === 'string' ? field : field.label
          return (
            <label key={label} className="flex flex-col gap-[5px]">
              <span className="text-[11px] text-black">{label}</span>
              {typeof field === 'string' ? (
                <input className={FIELD} placeholder={label} />
              ) : (
                <select className={FIELD} defaultValue={field.options[0]}>
                  {field.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              )}
            </label>
          )
        })}

        <button type="submit" className="h-[30px] w-[84px] rounded-[3px] bg-[#3191ff] text-[13px] font-medium text-white">
          Submit
        </button>
      </form>
    </div>
  )
}

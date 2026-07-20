import type { SelectHTMLAttributes } from 'react'

// The select twin of TextField: same label/required/error/wrapper contract, same
// px/hex from Figma. Restyle the native <select>, don't rebuild it.
type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  required?: boolean
  error?: string
  wrapperClassName?: string
  options: readonly string[]
  placeholder?: string
}

export default function SelectField({
  label,
  required,
  error,
  wrapperClassName = '',
  options,
  placeholder,
  ...select
}: Props) {
  return (
    <label className={`flex flex-col gap-[4px] ${wrapperClassName}`}>
      <span className="text-[11px] text-black">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <select
        {...select}
        aria-invalid={error ? true : undefined}
        className={`h-[31px] w-full rounded-[3px] border bg-white px-[13px] text-[11px] text-[#6c6c6c] outline-none disabled:bg-[#f1f1f1] ${
          error ? 'border-[#ff9494]' : 'border-[#c8c8c8]'
        }`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <span className="text-[10px] text-[#ff5353]">{error}</span>}
    </label>
  )
}

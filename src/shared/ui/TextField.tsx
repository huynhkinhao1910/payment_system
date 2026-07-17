import type { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  required?: boolean
  error?: string
  wrapperClassName?: string
}

export default function TextField({ label, required, error, wrapperClassName = '', ...input }: Props) {
  return (
    <label className={`flex flex-col gap-[4px] ${wrapperClassName}`}>
      <span className="text-[11px] text-black">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <input
        {...input}
        aria-invalid={error ? true : undefined}
        className={`h-[31px] w-full rounded-[3px] border bg-white px-[13px] text-[11px] text-[#6c6c6c] outline-none placeholder:text-[#a8a8a8] disabled:bg-[#f1f1f1] ${
          error ? 'border-[#ff9494]' : 'border-[#c8c8c8]'
        }`}
      />
      {error && <span className="text-[10px] text-[#ff5353]">{error}</span>}
    </label>
  )
}

import type { InputHTMLAttributes, Ref } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & { ref?: Ref<HTMLInputElement> }

// Hides the browser's own picker icon so the design's single calendar icon is
// the only one on the row. Clicking the field still opens the native picker —
// without that, hiding the indicator would leave typing as the only way in.
export default function DateInput({ className = '', onClick, ...props }: Props) {
  return (
    <input
      type="date"
      {...props}
      onClick={(e) => {
        e.currentTarget.showPicker?.()
        onClick?.(e)
      }}
      className={`bg-transparent text-[11px] outline-none [&::-webkit-calendar-picker-indicator]:hidden ${className}`}
    />
  )
}

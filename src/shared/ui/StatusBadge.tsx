import React from 'react'

type Variant = 'pending' | 'success' | 'neutral' | 'warning' | 'danger' | 'custom'

export interface StatusBadgeProps {
  status?: string
  variant?: Variant
  className?: string
  children?: React.ReactNode
}

const VARIANT_CLASSES: Record<Variant, string> = {
  pending: 'rounded-[3px] px-[8px] py-[3px] text-[11px] bg-[#ffeede] text-[#f1b44c]',
  success: 'rounded-[3px] px-[8px] py-[3px] text-[11px] bg-[#e0f5e8] text-[#10723b]',
  neutral: 'rounded-[3px] px-[8px] py-[3px] text-[11px] bg-[#e3f0ff] text-[#1b79f5]',
  warning: 'rounded-[3px] px-[8px] py-[3px] text-[11px] bg-[#fff4e6] text-[#f08c00]',
  danger: 'rounded-[3px] px-[8px] py-[3px] text-[11px] bg-[#ffecec] text-[#ff5b5b]',
  custom: '',
}

/**
 * `StatusBadge` — small reusable badge for status labels
 * - Use `variant` for common semantic colors (pending, success, warning, danger, neutral)
 * - Pass `className` to further customize (or use `variant="custom"` and supply your classes)
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'neutral', className = '', children }) => {
  const content = children ?? status ?? ''
  const base = VARIANT_CLASSES[variant]
  const classes = `${base} ${className}`.trim()

  return (
    <span className={classes} role="status">
      {content}
    </span>
  )
}

export default StatusBadge

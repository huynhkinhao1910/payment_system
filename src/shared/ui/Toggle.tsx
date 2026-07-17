// ponytail: a native checkbox restyled as a switch. The comp only ships one
// toggle state as a flat icon, so the on/off colours are derived from the
// palette rather than exported.
export default function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex items-center gap-[16px] pl-[35px] text-[11px] text-black">
      <span className="w-[130px]">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span className="relative h-[20px] w-[34px] shrink-0 rounded-full bg-[#c8c8c8] transition-colors peer-checked:bg-stat-blue peer-checked:[&>span]:translate-x-[14px] peer-focus-visible:ring-2 peer-focus-visible:ring-stat-blue/50">
        <span className="absolute top-[2px] left-[2px] size-[16px] rounded-full bg-white transition-transform" />
      </span>
    </label>
  )
}

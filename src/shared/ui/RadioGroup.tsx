// ponytail: native radios with accent-color. The comp ships selected/unselected
// as two flat icons, which can't follow real input state.
export default function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  disabled,
}: {
  label: string
  name: string
  options: readonly string[]
  value: string
  onChange: (v: string) => void
  disabled?: boolean
}) {
  return (
    <fieldset className="flex flex-col gap-[10px]">
      <legend className="text-[11px] text-black">{label}</legend>
      <div className="flex items-center gap-[16px]">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-[7px] text-[11px] text-black">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              disabled={disabled}
              onChange={() => onChange(option)}
              className="size-[12px] accent-stat-blue disabled:opacity-50"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

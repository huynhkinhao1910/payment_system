// ponytail: native radios with accent-color. The comp ships selected/unselected
// as two flat icons, which can't follow real input state.
export default function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string
  name: string
  options: readonly string[]
  value: string
  onChange: (v: string) => void
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
              onChange={() => onChange(option)}
              className="size-[12px] accent-stat-blue"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

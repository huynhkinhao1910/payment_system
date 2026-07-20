import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextField from '@/shared/ui/TextField'
import SelectField from '@/shared/ui/SelectField'
import { COLUMN_1, COLUMN_2, emptyValues, validate, type Field, type FormValues } from './createPaylinkForm'

export default function CreatePaylinkPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState<FormValues>(emptyValues)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (name: string, value: string) => setValues((v) => ({ ...v, [name]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    // ponytail: no backend yet — a clean form just returns to the list.
    if (Object.keys(found).length === 0) navigate('/paylinks')
  }

  const renderField = (f: Field) =>
    f.kind === 'select' ? (
      <SelectField
        key={f.name}
        label={f.label}
        required={f.required}
        options={f.options}
        placeholder={f.placeholder}
        value={values[f.name]}
        error={errors[f.name]}
        onChange={(e) => set(f.name, e.target.value)}
        wrapperClassName="w-full max-w-[465px]"
      />
    ) : (
      <TextField
        key={f.name}
        label={f.label}
        required={f.required}
        placeholder={f.label}
        value={values[f.name]}
        error={errors[f.name]}
        onChange={(e) => set(f.name, e.target.value)}
        wrapperClassName="w-full max-w-[465px]"
      />
    )

  return (
    <div className="flex flex-col gap-[22px]">
      <div>
        <h1 className="text-[14px] font-medium text-[#353535]">CREATE PAYLINK</h1>
        <p className="mt-[15px] text-[11px] text-[#575757]">/Transactions/ Paylink List/ Create Paylink</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-[4px] bg-white p-[24px] shadow-card" noValidate>
        <p className="text-[11px] font-medium text-black">Paylink Information</p>

        <div className="mt-[34px] flex flex-wrap gap-[59px]">
          <div className="flex min-w-0 flex-1 flex-col gap-[16px] sm:min-w-[300px]">{COLUMN_1.map(renderField)}</div>
          <div className="flex min-w-0 flex-1 flex-col gap-[16px] sm:min-w-[300px]">{COLUMN_2.map(renderField)}</div>
        </div>

        <div className="mt-[40px] flex items-center gap-[10px]">
          <Link
            to="/paylinks"
            className="flex h-[30px] items-center justify-center rounded-[3px] border border-[#1b79f5] bg-white px-[14px] text-[13px] font-medium text-[#1b79f5]"
          >
            Back to list
          </Link>
          <button
            type="submit"
            className="flex h-[30px] w-[69px] items-center justify-center rounded-[3px] bg-[#3191ff] text-[13px] font-medium text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

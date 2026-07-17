import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TextField from '@/shared/ui/TextField'
import Toggle from '@/shared/ui/Toggle'
import RadioGroup from '@/shared/ui/RadioGroup'
import { merchants } from './data'
import {
  COLUMN_1,
  COLUMN_2,
  COLUMN_2_TAIL,
  STATUS_OPTIONS,
  emptyValues,
  validate,
  valuesFromMerchant,
  type Field,
  type FormValues,
} from './addMerchantForm'

// Add (/merchants/new) and Edit (/merchants/:code/edit) are the same comp —
// Figma nodes 15:802 and 37:1698 differ only by title and prefilled values.
export default function MerchantFormPage() {
  const navigate = useNavigate()
  const { code } = useParams()
  const merchant = code ? merchants.find((m) => m.merchantCode === code) : undefined
  const [values, setValues] = useState<FormValues>(() =>
    merchant ? valuesFromMerchant(merchant) : emptyValues(),
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sendPaylink, setSendPaylink] = useState(false)
  const [transactionLimit, setTransactionLimit] = useState(false)

  const set = (name: string, value: string) => setValues((v) => ({ ...v, [name]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    // ponytail: no backend yet — a clean form just returns to the list.
    if (Object.keys(found).length === 0) navigate('/merchants')
  }

  const renderField = (f: Field) => (
    <TextField
      key={f.name}
      label={f.label}
      type={f.type}
      required={f.required}
      placeholder={f.label}
      value={values[f.name]}
      error={errors[f.name]}
      onChange={(e) => set(f.name, e.target.value)}
      wrapperClassName="w-full max-w-[465px]"
    />
  )

  if (code && !merchant) {
    return (
      <p className="text-[13px] text-neutral-500">
        Merchant {code} not found. <Link to="/merchants" className="text-[#1b79f5]">Back to list</Link>
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-[22px]">
      <div>
        <h1 className="text-[14px] font-medium text-[#353535]">
          {merchant ? 'EDIT MERCHANT' : 'ADD MERCHANT'}
        </h1>
        <p className="mt-[15px] text-[11px] text-[#575757]">
          / Merchant List /{merchant ? 'Edit' : 'Add'} Merchant
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-[4px] bg-white p-[24px] shadow-card" noValidate>
        <p className="text-[11px] font-medium text-black">Merchant Information</p>

        <div className="mt-[34px] flex flex-wrap gap-[59px]">
          <div className="flex min-w-0 flex-1 flex-col gap-[16px] sm:min-w-[300px]">
            {COLUMN_1.map(renderField)}
            <RadioGroup
              label="Status"
              name="status"
              options={STATUS_OPTIONS}
              value={values.status}
              onChange={(v) => set('status', v)}
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-[16px] sm:min-w-[300px]">
            {COLUMN_2.map(renderField)}
            <Toggle label="Enable Send Paylink" checked={sendPaylink} onChange={setSendPaylink} />
            <Toggle label="Enable Transaction Limit" checked={transactionLimit} onChange={setTransactionLimit} />
            {COLUMN_2_TAIL.map(renderField)}
          </div>
        </div>

        <div className="mt-[40px] flex items-center gap-[10px]">
          <Link
            to="/merchants"
            className="flex h-[30px] w-[84px] items-center justify-center rounded-[3px] border border-[#1b79f5] bg-white text-[13px] font-medium text-[#1b79f5]"
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

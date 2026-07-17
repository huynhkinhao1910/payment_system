import { Link, useParams } from 'react-router-dom'
import TextField from '@/shared/ui/TextField'
import RadioGroup from '@/shared/ui/RadioGroup'
import { gateways } from './data'

const STATUS_OPTIONS = ['Active', 'Inactive'] as const

// ponytail: detail only — the comp has no Add or Edit gateway, so there is no
// second mode to share. Give this a `readOnly` prop when Edit gets designed,
// the way MerchantFormPage does.
export default function GatewayDetailPage() {
  const { code } = useParams()
  const gateway = gateways.find((g) => g.gatewayCode === code)

  if (!gateway) {
    return (
      <p className="text-[13px] text-neutral-500">
        Payment gateway {code} not found.{' '}
        <Link to="/payment-gateways" className="text-[#1b79f5]">
          Back to list
        </Link>
      </p>
    )
  }

  const columns = [
    [
      { label: 'Payment Gateway Name', value: gateway.gatewayName },
      { label: 'Created On', value: gateway.createdOn },
      { label: 'Merchant Transaction No', value: gateway.merchantTransactionNo },
    ],
    [
      { label: 'Payment Gateway Code', value: gateway.gatewayCode },
      { label: 'Parent Merchant Code', value: gateway.parentMerchantCode },
    ],
  ]

  return (
    <div className="flex flex-col gap-[22px]">
      <div>
        <h1 className="text-[14px] font-medium text-[#353535]">PAYMENT GATEWAY DETAIL</h1>
        <p className="mt-[15px] text-[11px] text-[#575757]">/Payment Gateway/ Payment Gateway List</p>
      </div>

      <div className="rounded-[4px] bg-white p-[24px] shadow-card">
        <div className="flex flex-wrap gap-[59px]">
          {columns.map((fields, i) => (
            <div key={i} className="flex min-w-0 flex-1 flex-col gap-[16px] sm:min-w-[300px]">
              {fields.map((f) => (
                <TextField
                  key={f.label}
                  label={f.label}
                  value={f.value}
                  readOnly
                  disabled
                  wrapperClassName="w-full max-w-[465px]"
                />
              ))}
              {i === 1 && (
                <RadioGroup
                  label="Status"
                  name="status"
                  options={STATUS_OPTIONS}
                  value={gateway.status}
                  disabled
                  onChange={() => {}}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-[40px]">
          <Link
            to="/payment-gateways"
            className="flex h-[30px] w-[84px] items-center justify-center rounded-[3px] border border-[#1b79f5] bg-white text-[13px] font-medium text-[#1b79f5]"
          >
            Back to list
          </Link>
        </div>
      </div>
    </div>
  )
}

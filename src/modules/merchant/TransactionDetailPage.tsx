import { Link, useParams } from 'react-router-dom'
import TextField from '@/shared/ui/TextField'
import { payouts, type Payout } from './data'

// The comp is read-only throughout — every field is disabled, and the only
// control is Back to list. There's no Edit counterpart designed, so unlike
// MerchantFormPage this needs no readOnly prop.
const COLUMN_1: { label: string; key: keyof Payout }[] = [
  { label: 'Transaction No', key: 'transactionNo' },
  { label: 'Transaction Date', key: 'transactionDate' },
  { label: 'Merchant Transaction No', key: 'merchantTransNo' },
  { label: 'Currency code', key: 'currencyCode' },
  { label: 'Customer Confirm Mess', key: 'customerConfirmMess' },
  { label: 'Customer Email', key: 'customerEmail' },
  { label: 'Customer IP Address', key: 'customerIpAddress' },
  { label: 'Payment Gateway Status', key: 'gatewayStatus' },
  { label: 'Remark', key: 'remark' },
]

const COLUMN_2: { label: string; key: keyof Payout }[] = [
  { label: 'Customer Name', key: 'customerName' },
  { label: 'Transaction Amount', key: 'transactionAmount' },
  { label: 'Merchant Order No', key: 'merchantOrderNo' },
  { label: 'Status', key: 'status' },
  { label: 'Customer Address', key: 'customerAddress' },
  { label: 'Customer Phone', key: 'customerPhone' },
  { label: 'Payment Gateway Code', key: 'gatewayCode' },
  { label: 'Payment Gateway Confirm Message', key: 'gatewayConfirmMessage' },
]

const BACK_TO = '/merchant-payout-report'

export default function TransactionDetailPage() {
  const { transactionNo } = useParams()
  const payout = payouts.find((p) => p.transactionNo === transactionNo)

  if (!payout) {
    return (
      <p className="text-[13px] text-neutral-500">
        Transaction {transactionNo} not found.{' '}
        <Link to={BACK_TO} className="text-[#1b79f5]">
          Back to list
        </Link>
      </p>
    )
  }

  const renderField = (f: { label: string; key: keyof Payout }) => (
    <TextField
      key={f.key}
      label={f.label}
      value={payout[f.key]}
      disabled
      readOnly
      onChange={() => {}}
      wrapperClassName="w-full max-w-[465px]"
    />
  )

  return (
    <div className="flex flex-col gap-[22px]">
      <div>
        <h1 className="text-[14px] font-medium text-[#353535]">TRANSACTION DETAIL</h1>
        <p className="mt-[15px] text-[11px] text-[#575757]">/Merchant/ Merchant Payout Report/ Transaction Detail</p>
      </div>

      <div className="rounded-[4px] bg-white p-[24px] shadow-card">
        <div className="flex flex-wrap gap-[59px]">
          <div className="flex min-w-0 flex-1 flex-col gap-[16px] sm:min-w-[300px]">{COLUMN_1.map(renderField)}</div>
          <div className="flex min-w-0 flex-1 flex-col gap-[16px] sm:min-w-[300px]">{COLUMN_2.map(renderField)}</div>
        </div>

        <div className="mt-[40px]">
          <Link
            to={BACK_TO}
            className="flex h-[30px] w-[84px] items-center justify-center rounded-[3px] border border-[#1b79f5] bg-white text-[13px] font-medium text-[#1b79f5]"
          >
            Back to list
          </Link>
        </div>
      </div>
    </div>
  )
}

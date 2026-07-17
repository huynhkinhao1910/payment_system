import type { transactions } from '../data'

const COLUMNS = [
  'Transaction No',
  'Created On',
  'Merchant Order No',
  'Merchant Trx No',
  'Merchant Code',
  'Merchant Name',
  'Transaction Amount',
  'Currency',
  'Current Status',
  'Payment Gateway',
  'Payment Method',
  'Payment Gateway Type',
] as const

export default function TransactionTable({ rows }: { rows: typeof transactions }) {
  return (
    <div className="overflow-x-auto rounded-[4px] bg-white shadow-card">
      <table className="w-full min-w-[1400px] border-collapse text-left text-[11px]">
        <thead>
          <tr className="h-[46px] bg-neutral-50 text-neutral-600">
            {COLUMNS.map((c) => (
              <th key={c} className="border-b border-neutral-200 px-[10px] font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={COLUMNS.length} className="h-[41px] px-[10px] text-neutral-500">
                No transactions match these filters.
              </td>
            </tr>
          )}
          {rows.map((t) => (
            <tr key={t.transactionNo} className="h-[41px] text-neutral-800">
              <td className="border-b border-neutral-100 px-[10px]">{t.transactionNo}</td>
              <td className="border-b border-neutral-100 px-[10px]">{t.createdOn}</td>
              <td className="border-b border-neutral-100 px-[10px]">{t.merchantOrderNo}</td>
              <td className="border-b border-neutral-100 px-[10px]">{t.merchantTrxNo}</td>
              <td className="border-b border-neutral-100 px-[10px]">{t.merchantCode}</td>
              <td className="border-b border-neutral-100 px-[10px]">{t.merchantName}</td>
              <td className="border-b border-neutral-100 px-[10px]">{t.amount}</td>
              <td className="border-b border-neutral-100 px-[10px]">{t.currency}</td>
              <td className="border-b border-neutral-100 px-[10px]">{t.status}</td>
              <td className="border-b border-neutral-100 px-[10px]">{t.gateway}</td>
              <td className="border-b border-neutral-100 px-[10px]">{t.method}</td>
              <td className="border-b border-neutral-100 px-[10px]">{t.gatewayType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

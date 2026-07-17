import DataTable, { type Column } from '@/shared/ui/DataTable'
import type { transactions } from '../data'

const COLUMNS: Column[] = [
  { label: ['Transaction No'] },
  { label: ['Created On'] },
  { label: ['Merchant Order No'] },
  { label: ['Merchant Trx No'] },
  { label: ['Merchant Code'] },
  { label: ['Merchant Name'] },
  { label: ['Transaction Amount'] },
  { label: ['Currency'] },
  { label: ['Current Status'] },
  { label: ['Payment Gateway'] },
  { label: ['Payment Method'] },
  { label: ['Payment Gateway Type'] },
]

// The dashboard's table is read-only: the comp gives it no sort and no Action column.
// The card and pagination live on the page, as they do on the other list pages.
export default function TransactionTable({ rows }: { rows: typeof transactions }) {
  return (
    <DataTable
      columns={COLUMNS}
      rows={rows}
      rowKey={(t) => t.transactionNo}
      minWidth="min-w-[1400px]"
      empty="No transactions match these filters."
      cells={(t) => [
        t.transactionNo,
        t.createdOn,
        t.merchantOrderNo,
        t.merchantTrxNo,
        t.merchantCode,
        t.merchantName,
        t.amount,
        t.currency,
        t.status,
        t.gateway,
        t.method,
        t.gatewayType,
      ]}
    />
  )
}

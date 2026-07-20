// Field definitions for Create Paylink (Figma: Transactions/ Paylink List/ Create Paylink).
export type Field =
  | { name: string; label: string; kind: 'text'; required?: boolean }
  | { name: string; label: string; kind: 'select'; options: readonly string[]; placeholder: string; required?: boolean }

export const COLUMN_1: Field[] = [
  { name: 'merchantCode', label: 'Merchant Code', kind: 'select', options: ['SI0001', 'A00001'], placeholder: 'Select Merchant Code' },
  { name: 'merchantChannel', label: 'Merchant Channel', kind: 'select', options: ['Web', 'Mobile'], placeholder: 'Select Merchant Channel' },
  { name: 'customerName', label: 'Customer Name', kind: 'text', required: true },
  { name: 'customerEmail', label: 'Customer Email', kind: 'text' },
]

export const COLUMN_2: Field[] = [
  { name: 'customerPhone', label: 'Customer Phone', kind: 'text' },
  { name: 'transactionAmount', label: 'Transaction Amount', kind: 'text' },
  { name: 'currencyCode', label: 'Currency Code', kind: 'select', options: ['MYR', 'USD', 'SGD'], placeholder: 'Select Currency Code' },
  { name: 'transactionDescription', label: 'Transaction Description', kind: 'text' },
]

export const ALL_FIELDS = [...COLUMN_1, ...COLUMN_2]

export type FormValues = Record<string, string>

export const emptyValues = (): FormValues => Object.fromEntries(ALL_FIELDS.map((f) => [f.name, '']))

export function validate(values: FormValues): Record<string, string> {
  const errors: Record<string, string> = {}
  for (const field of ALL_FIELDS) {
    if (field.required && !values[field.name]?.trim()) {
      errors[field.name] = `${field.label} is required`
    }
  }
  const email = values.customerEmail?.trim()
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.customerEmail = 'Enter a valid email address'
  }
  return errors
}

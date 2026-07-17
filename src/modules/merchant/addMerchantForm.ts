import type { Merchant } from './data'

export type Field = { name: string; label: string; required?: boolean; type?: string }

// Field order and labels from Figma node 15:802 (Add New Merchant).
export const COLUMN_1: Field[] = [
  { name: 'merchantName', label: 'Merchant Name', required: true },
  { name: 'companyRegNo', label: 'Company Reg No', required: true },
  { name: 'address', label: 'Address' },
  { name: 'postcode', label: 'Postcode' },
  { name: 'city', label: 'City' },
  { name: 'state', label: 'State' },
  { name: 'countryName', label: 'Country Name' },
  { name: 'phoneNo', label: 'Phone No' },
  { name: 'faxNo', label: 'Fax No' },
  { name: 'contactPerson', label: 'Contact Person' },
  { name: 'contactPhone', label: 'Contact Phone' },
  { name: 'emailAddress', label: 'Email Address' },
  { name: 'callbackUrl', label: 'CallbackURL' },
]

// ponytail: the comp repeats "CallbackURL" (end of column 1 AND top of column 2)
// and "Settlement Report Email" (twice in column 2). Both are kept once here —
// two inputs writing the same key would be a bug, not a feature.
export const COLUMN_2: Field[] = [
  { name: 'callbackErrorUrl', label: 'Callback ErrorURL' },
  { name: 'callbackSuccessUrl', label: 'Callback SuccessURL' },
  { name: 'merchantLogo', label: 'Merchant Logo' },
  { name: 'contactTechnicalPerson', label: 'Contact Technical Person' },
  { name: 'contactTechnicalPhone', label: 'Contact Technical Phone' },
  { name: 'technicalEmail', label: 'Technical Email' },
  { name: 'invoiceReceiverEmail', label: 'Invoice Receiver Email' },
  { name: 'settlementReportEmail', label: 'Settlement Report Email' },
]

export const COLUMN_2_TAIL: Field[] = [
  { name: 'portalEmailLogin', label: 'Merchant Portal User Email Login', required: true },
  { name: 'portalPasswordLogin', label: 'Merchant Portal Password Login', type: 'password' },
]

export const ALL_FIELDS = [...COLUMN_1, ...COLUMN_2, ...COLUMN_2_TAIL]

// Status sits at the foot of column 1. It is drawn on the Edit Merchant comp
// (node 37:1675), not on Add Merchant — carried over here on request.
export const STATUS_OPTIONS = ['New', 'Approved', 'Disapproved'] as const
export const DEFAULT_STATUS = 'New'

export type FormValues = Record<string, string>

export const emptyValues = (): FormValues => ({
  ...Object.fromEntries(ALL_FIELDS.map((f) => [f.name, ''])),
  status: DEFAULT_STATUS,
})

// ponytail: the list record only carries the columns the table shows, so an edit
// prefills those and leaves the rest blank. Fills in when a real GET exists.
export const valuesFromMerchant = (m: Merchant): FormValues => ({
  ...emptyValues(),
  merchantName: m.merchantName,
  companyRegNo: m.companyRegNo,
  address: m.address,
  countryName: m.countryName,
  contactPerson: m.contactPerson,
  contactPhone: m.contactPhone,
  status: m.status,
})

export function validate(values: FormValues): Record<string, string> {
  const errors: Record<string, string> = {}
  for (const field of ALL_FIELDS) {
    if (field.required && !values[field.name]?.trim()) {
      errors[field.name] = `${field.label} is required`
    }
  }
  const email = values.portalEmailLogin?.trim()
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.portalEmailLogin = 'Enter a valid email address'
  }
  return errors
}

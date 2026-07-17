// ponytail: static mock data matching the Figma comps. Swap for API calls when the backend exists.

export type Merchant = {
  merchantCode: string
  merchantName: string
  companyRegNo: string
  createdOn: string
  address: string
  countryName: string
  contactPerson: string
  contactPhone: string
  status: string
}

export const merchants: Merchant[] = Array.from({ length: 10 }, (_, i) => ({
  merchantCode: `SO${(1 + i).toString().padStart(4, '0')}`,
  merchantName: 'Souqa Payment Testing',
  companyRegNo: `2026071600${(1 + i).toString().padStart(2, '0')}`,
  createdOn: `16/07/2026 11:49:${(28 + i).toString().padStart(2, '0')}`,
  address: '168, Jalan, Bukit Bintang, 55100 Kuala Lumpur',
  countryName: 'Malaysia',
  contactPerson: 'Tanya',
  contactPhone: `6011452800${i}`,
  status: 'Approved',
}))

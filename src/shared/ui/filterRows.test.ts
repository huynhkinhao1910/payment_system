import { expect, test } from 'vitest'
import { filterRows, type FilterField } from './filterRows'

const rows = [
  { code: 'SO0001', name: 'Alpha', status: 'Pending' },
  { code: 'SO0002', name: 'Beta', status: 'Approved' },
  { code: 'SO0010', name: 'Alpha Prime', status: 'Approved' },
]
const fields: FilterField[] = [{ key: 'code' }, { key: 'name' }, { key: 'status', options: ['All', 'Pending', 'Approved'] }]

test('no active filters returns all rows', () => {
  expect(filterRows(rows, {}, fields)).toHaveLength(3)
  expect(filterRows(rows, { status: 'All', name: '  ' }, fields)).toHaveLength(3)
})

test('text field is a case-insensitive substring match', () => {
  expect(filterRows(rows, { name: 'alpha' }, fields).map((r) => r.code)).toEqual(['SO0001', 'SO0010'])
})

test('select field matches exactly, not as a substring', () => {
  // 'Approved' must not also catch a hypothetical 'Disapproved'
  expect(filterRows([...rows, { code: 'X', name: 'Z', status: 'Disapproved' }], { status: 'Approved' }, fields)).toHaveLength(2)
})

test('multiple filters are ANDed', () => {
  expect(filterRows(rows, { name: 'alpha', status: 'Approved' }, fields).map((r) => r.code)).toEqual(['SO0010'])
})

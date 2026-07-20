import { expect, test } from 'vitest'
import { emptyValues, validate } from './createPaylinkForm'

test('customer name is required', () => {
  expect(validate(emptyValues())).toEqual({ customerName: 'Customer Name is required' })
})

test('a filled name with no email is clean', () => {
  expect(validate({ ...emptyValues(), customerName: 'Jane' })).toEqual({})
})

test('bad email is rejected even when name is present', () => {
  const errors = validate({ ...emptyValues(), customerName: 'Jane', customerEmail: 'nope' })
  expect(errors.customerEmail).toBe('Enter a valid email address')
})

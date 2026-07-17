import { expect, test } from 'vitest'
import { DEFAULT_STATUS, emptyValues, validate, valuesFromMerchant } from './addMerchantForm'
import { merchants } from './data'

test('status defaults to New and is not required', () => {
  expect(emptyValues().status).toBe(DEFAULT_STATUS)
  expect(validate(emptyValues())).not.toHaveProperty('status')
})

test('flags every required field when the form is empty', () => {
  expect(validate(emptyValues())).toEqual({
    merchantName: 'Merchant Name is required',
    companyRegNo: 'Company Reg No is required',
    portalEmailLogin: 'Merchant Portal User Email Login is required',
  })
})

test('whitespace does not satisfy a required field', () => {
  expect(validate({ ...emptyValues(), merchantName: '   ' }).merchantName).toBe('Merchant Name is required')
})

test('passes once required fields are filled with a valid login email', () => {
  const values = {
    ...emptyValues(),
    merchantName: 'Souqa Payment Testing',
    companyRegNo: '202607160001',
    portalEmailLogin: 'ops@souqa.test',
  }
  expect(validate(values)).toEqual({})
})

test('editing prefills the known columns and leaves the rest blank', () => {
  const m = merchants[0]
  const values = valuesFromMerchant(m)
  expect(values.merchantName).toBe(m.merchantName)
  expect(values.companyRegNo).toBe(m.companyRegNo)
  expect(values.status).toBe(m.status)
  expect(values.callbackUrl).toBe('')
  // every key the form writes still exists, so no input flips uncontrolled
  expect(Object.keys(values).sort()).toEqual(Object.keys(emptyValues()).sort())
})

test('rejects a malformed login email', () => {
  const values = { ...emptyValues(), merchantName: 'A', companyRegNo: 'B', portalEmailLogin: 'not-an-email' }
  expect(validate(values).portalEmailLogin).toBe('Enter a valid email address')
})

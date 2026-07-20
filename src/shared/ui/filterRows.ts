// Applies FilterBar values to a row set. Text fields match as case-insensitive
// substrings; select fields (those with `options`) match exactly. An empty value
// or 'All' means "don't filter on this field".
export type FilterField = { key: string; options?: readonly string[] }

export function filterRows<T>(
  rows: T[],
  values: Record<string, string>,
  fields: readonly FilterField[],
  // Every filtered column holds a string, so the default reads it by key. A page
  // with a non-string or computed column can pass its own accessor.
  pick: (row: T, key: string) => string = (row, key) => (row as Record<string, string>)[key] ?? '',
): T[] {
  const active = fields.filter((f) => {
    const v = values[f.key]
    return v != null && v.trim() !== '' && v !== 'All'
  })
  if (active.length === 0) return rows
  return rows.filter((row) =>
    active.every((f) => {
      const cell = pick(row, f.key).toLowerCase()
      const v = values[f.key].toLowerCase()
      return f.options ? cell === v : cell.includes(v)
    }),
  )
}

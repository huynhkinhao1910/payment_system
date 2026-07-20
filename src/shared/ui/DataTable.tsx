import type { ReactNode } from 'react'
import SortIcon from '@/shared/ui/SortIcon'

// A header is one or more lines, matching the comps where a column stacks two
// labels ("Merchant Code" over "Merchant Name") and the row stacks two values.
export type Column = { label: readonly string[]; sortable?: boolean }

// A cell is plain text, several lines of text, or — when a column needs its own
// rendering (a badge, a link, a formatted amount) — whatever the caller returns.
export type Cell = string | readonly string[] | ReactNode

const isText = (cell: Cell): cell is string | readonly string[] =>
  typeof cell === 'string' || (Array.isArray(cell) && cell.every((line) => typeof line === 'string'))

const BORDER = 'border-r border-b border-[#c8c8c8] first:border-l'
const HEAD = `${BORDER} h-[52px] border-t bg-white p-[10px] text-left align-middle text-[13px] font-medium text-black`
const CELL = `${BORDER} h-[52px] p-[10px] align-middle text-[12px] whitespace-nowrap text-[#6c6c6c]`

function Lines({ lines }: { lines: readonly string[] }) {
  return (
    <span className="flex flex-col gap-[2px]">
      {lines.filter(Boolean).map((line) => (
        <span key={line}>{line}</span>
      ))}
    </span>
  )
}

export default function DataTable<T>({
  columns,
  rows,
  rowKey,
  cells,
  action,
  empty = 'No records found',
  minWidth,
  sortDir = null,
  onToggleSort,
}: {
  columns: readonly Column[]
  rows: T[]
  rowKey: (row: T) => string
  // One entry per column except Action; a string[] stacks its lines in the cell,
  // and anything else is rendered as-is so a column can bring its own markup.
  cells: (row: T) => Cell[]
  // The Action column's content. Destinations differ per table, so the caller
  // renders it; the last column exists only when this is passed.
  action?: (row: T) => ReactNode
  // Shown when rows is empty (e.g. a filter matched nothing). Defaults on.
  empty?: string
  minWidth?: string
  // Structurally SortDir, declared inline so shared/ui doesn't import a module.
  // null means nothing is sorted yet — the rows are in the order they came in.
  sortDir?: 'asc' | 'desc' | null
  // A column sorts only when the caller can act on it.
  onToggleSort?: () => void
}) {
  return (
    // A real <table> sizes each column to its content, so the columns track the
    // data instead of the comp's fixed px. min-w keeps it legible before it scrolls.
    <div className="overflow-x-auto">
      <table className={`w-full ${minWidth ?? 'min-w-[1100px]'} border-separate border-spacing-0`}>
        <thead>
          <tr>
            {columns.map((c, i) => {
              const cls = `${HEAD} ${i === 0 ? 'rounded-tl-[3px]' : ''} ${
                i === columns.length - 1 ? 'rounded-tr-[3px]' : ''
              }`

              if (!c.sortable || !onToggleSort) {
                return (
                  <th key={i} scope="col" className={cls}>
                    <Lines lines={c.label} />
                  </th>
                )
              }
              return (
                <th
                  key={i}
                  scope="col"
                  aria-sort={sortDir ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                  className={`${cls} p-0`}
                >
                  <button
                    type="button"
                    onClick={onToggleSort}
                    title={sortDir ? `Sort by ${c.label[0]} (${sortDir === 'asc' ? 'ascending' : 'descending'})` : `Sort by ${c.label[0]}`}
                    className="flex w-full cursor-pointer items-center justify-between gap-[8px] p-[10px] text-left"
                  >
                    <Lines lines={c.label} />
                    <SortIcon dir={sortDir} />
                  </button>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {empty && rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className={`${CELL} text-center`}>
                {empty}
              </td>
            </tr>
          )}
          {rows.map((row, i) => (
            <tr key={rowKey(row)} className={i % 2 === 0 ? 'bg-[#eff2f7]' : 'bg-white'}>
              {cells(row).map((cell, j) => (
                <td key={j} className={CELL}>
                  {isText(cell) ? <Lines lines={typeof cell === 'string' ? [cell] : cell} /> : cell}
                </td>
              ))}
              {action && (
                <td className={CELL}>
                  <div className="flex justify-center gap-[6px]">{action(row)}</div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

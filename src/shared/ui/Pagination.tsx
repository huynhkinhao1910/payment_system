const PAGE_BTN = 'flex size-[26px] items-center justify-center border-t border-r border-b border-[#c8c8c8] text-[12px]'

// ponytail: shows first 5 then last, with an ellipsis gap — matches the comp, no windowing math.
export default function Pagination({
  page,
  pages,
  onChange,
}: {
  page: number
  pages: number
  onChange: (p: number) => void
}) {
  const nums = [...Array(Math.min(5, pages)).keys()].map((i) => i + 1)
  return (
    <div className="flex items-center">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="flex h-[26px] w-[71px] items-center justify-center rounded-l-[3px] border border-[#c8c8c8] bg-[#ebebeb] text-[12px] text-[#6c6c6c] disabled:opacity-50"
      >
        Previous
      </button>
      {nums.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`${PAGE_BTN} ${n === page ? 'bg-[#1b79f5] text-white' : 'bg-white text-[#6c6c6c]'}`}
        >
          {n}
        </button>
      ))}
      {pages > 6 && <span className={`${PAGE_BTN} bg-white text-[#6c6c6c]`}>...</span>}
      {pages > 5 && (
        <button
          type="button"
          onClick={() => onChange(pages)}
          className={`${PAGE_BTN} ${pages === page ? 'bg-[#1b79f5] text-white' : 'bg-white text-[#6c6c6c]'}`}
        >
          {pages}
        </button>
      )}
      <button
        type="button"
        disabled={page === pages}
        onClick={() => onChange(page + 1)}
        className="flex h-[26px] w-[46px] items-center justify-center rounded-r-[3px] border-t border-r border-b border-[#c8c8c8] bg-white text-[12px] text-[#6c6c6c] disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}

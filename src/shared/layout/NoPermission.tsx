import { Link, useNavigate } from 'react-router-dom'

export default function NoPermission() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center gap-[16px] py-[120px] text-center">
      <p className="text-[64px] font-medium leading-none text-[#f1b44c]">403</p>
      <h1 className="text-[14px] font-medium text-[#353535]">No permission</h1>
      <p className="text-[11px] text-[#6c6c6c]">You don't have permission to access this page.</p>
      <div className="mt-[8px] flex items-center gap-[10px]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-[30px] items-center justify-center rounded-[3px] border border-[#1b79f5] bg-white px-[16px] text-[13px] font-medium text-[#1b79f5]"
        >
          Go back
        </button>
        <Link
          to="/"
          className="flex h-[30px] items-center justify-center rounded-[3px] bg-[#3191ff] px-[16px] text-[13px] font-medium text-white"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}

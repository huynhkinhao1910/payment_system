import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import chevronDown from '@/assets/icon-chevron-down.svg'
import { NAV, type NavItem } from './nav'

const ROW = 'flex h-[45px] w-full items-center justify-between pr-[20px] pl-[25px] text-[13px]'

function NavGroup({ item }: { item: NavItem & { children: { to: string; label: string }[] } }) {
  const { pathname } = useLocation()
  const holdsActive = item.children.some((c) => pathname === c.to || pathname.startsWith(`${c.to}/`))
  const [open, setOpen] = useState(holdsActive)

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`${ROW} ${holdsActive ? 'text-white' : 'text-sidebar-fg'} cursor-pointer`}
      >
        <span className="flex items-center gap-[10px]">
          <img src={item.icon} alt="" className="size-[18px]" />
          {item.label}
        </span>
        <img src={chevronDown} alt="" className={`size-[15px] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open &&
        item.children.map((child) => (
          <NavLink
            key={child.to}
            to={child.to}
            className={({ isActive }) =>
              `flex h-[40px] items-center pl-[53px] text-[12px] ${isActive ? 'bg-black/20 text-white' : 'text-sidebar-fg'}`
            }
          >
            {child.label}
          </NavLink>
        ))}
    </div>
  )
}

function Sidebar() {
  return (
    <aside className="w-[246px] shrink-0 bg-sidebar">
      <div className="mx-[60px] mt-[19px] flex h-[51px] items-center justify-center bg-white">
        <span className="text-[15px] font-bold text-black">LOGO</span>
      </div>
      <nav className="mt-[44px] flex flex-col">
        {NAV.map((item) =>
          item.children ? (
            <NavGroup key={item.label} item={{ ...item, children: item.children }} />
          ) : (
            <NavLink
              key={item.label}
              to={item.to!}
              end
              className={({ isActive }) => `${ROW} ${isActive ? 'bg-black/20 text-white' : 'text-sidebar-fg'}`}
            >
              <span className="flex items-center gap-[10px]">
                <img src={item.icon} alt="" className="size-[18px]" />
                {item.label}
              </span>
            </NavLink>
          ),
        )}
      </nav>
    </aside>
  )
}

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[60px] items-center bg-white px-[18px] shadow-card">
          <button type="button" aria-label="Toggle sidebar" className="flex size-[18px] flex-col justify-between">
            <span className="block h-[2px] w-full bg-sidebar" />
            <span className="block h-[2px] w-full bg-sidebar" />
            <span className="block h-[2px] w-full bg-sidebar" />
          </button>
        </header>
        <main className="min-w-0 flex-1 px-[27px] py-[22px]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

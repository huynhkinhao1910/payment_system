import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import chevronDown from '@/assets/icon-chevron-down.svg'
import { NAV, type NavItem } from './nav'

// Three bands, still one `open` boolean:
//   < md          drawer over the content — `open` shows/hides it
//   md .. lg      in flow, defaults to the rail
//   >= lg         in flow, defaults to the full panel
// md and lg render identically (rail <-> 246px panel, both in flow); they differ
// only in what `open` defaults to, so MD is the CSS boundary and LG the default.
const MD = 768
const LG = 1024
const STORE_KEY = 'sidebar-open'

const row = (collapsed: boolean) =>
  `flex h-[45px] w-full items-center text-[13px] ${
    collapsed ? 'justify-center' : 'justify-between pr-[20px] pl-[25px]'
  }`

const childClass = (pad: string) => ({ isActive }: { isActive: boolean }) =>
  `flex h-[40px] items-center ${pad} text-[12px] ${isActive ? 'bg-black/20 text-white' : 'text-sidebar-fg'}`

function NavGroup({
  item,
  collapsed,
}: {
  item: NavItem & { children: { to: string; label: string }[] }
  collapsed: boolean
}) {
  const { pathname } = useLocation()
  const holdsActive = item.children.some((c) => pathname === c.to || pathname.startsWith(`${c.to}/`))
  const [open, setOpen] = useState(holdsActive)
  const btnRef = useRef<HTMLButtonElement>(null)
  const popRef = useRef<HTMLDivElement>(null)
  const popId = `nav-${item.label.replace(/\s+/g, '-').toLowerCase()}`

  if (collapsed) {
    // Nothing to fly out — a popover here would just be an empty box. The tooltip
    // still names the icon.
    if (item.children.length === 0) {
      return (
        <button
          type="button"
          aria-label={item.label}
          title={item.label}
          className={`${row(true)} ${holdsActive ? 'text-white' : 'text-sidebar-fg'} cursor-pointer`}
        >
          <img src={item.icon} alt="" className="size-[18px]" />
        </button>
      )
    }

    // The rail has no room for an accordion, so each group gets a flyout. `popover`
    // puts it in the top layer — the rail's overflow-hidden can't clip it — and
    // brings click-outside and Esc dismissal with it, so there's nothing to wire up.
    // The popover box itself sits flush against the rail and carries the gap as
    // transparent padding. Offsetting the box instead would leave a dead zone the
    // pointer crosses on its way over, closing the flyout before it arrives.
    const place = () => {
      const b = btnRef.current?.getBoundingClientRect()
      const p = popRef.current
      if (!b || !p) return
      p.style.top = `${b.top}px`
      p.style.left = `${b.right}px`
    }
    // togglePopover's force arg is idempotent, so re-entering an open flyout or
    // leaving a closed one is a no-op rather than a throw.
    const show = () => {
      place()
      popRef.current?.togglePopover(true)
    }
    return (
      // The flyout is a DOM child of this wrapper, so moving onto it never counts
      // as leaving — mouseleave tracks the DOM tree, not the top layer's position.
      <div onMouseEnter={show} onMouseLeave={() => popRef.current?.togglePopover(false)}>
        <button
          ref={btnRef}
          type="button"
          popoverTarget={popId}
          onClick={place}
          aria-label={item.label}
          title={item.label}
          className={`${row(true)} ${holdsActive ? 'text-white' : 'text-sidebar-fg'} cursor-pointer`}
        >
          <img src={item.icon} alt="" className="size-[18px]" />
        </button>
        <div ref={popRef} id={popId} popover="auto" className="m-0 bg-transparent p-0 pl-[8px]">
          <div className="min-w-[180px] overflow-hidden rounded-[4px] bg-sidebar py-[6px] shadow-lg">
            {item.children.map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                onClick={() => popRef.current?.hidePopover()}
                className={childClass('px-[16px]')}
              >
                {child.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`${row(false)} ${holdsActive ? 'text-white' : 'text-sidebar-fg'} cursor-pointer`}
      >
        <span className="flex items-center gap-[10px]">
          <img src={item.icon} alt="" className="size-[18px]" />
          {item.label}
        </span>
        <img src={chevronDown} alt="" className={`size-[15px] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && item.children.map((child) => (
        <NavLink key={child.to} to={child.to} className={childClass('pl-[53px]')}>
          {child.label}
        </NavLink>
      ))}
    </div>
  )
}

function Sidebar({ collapsed }: { collapsed: boolean }) {
  return (
    <>
      <div
        className={`mt-[19px] flex h-[51px] items-center justify-center overflow-hidden bg-white ${
          collapsed ? 'mx-[10px]' : 'mx-[60px]'
        }`}
      >
        <span className={`font-bold text-black ${collapsed ? 'text-[11px]' : 'text-[15px]'}`}>LOGO</span>
      </div>
      <nav className="mt-[44px] flex flex-col">
        {NAV.map((item) =>
          item.children ? (
            <NavGroup key={item.label} item={{ ...item, children: item.children }} collapsed={collapsed} />
          ) : (
            <NavLink
              key={item.label}
              to={item.to!}
              end
              aria-label={collapsed ? item.label : undefined}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `${row(collapsed)} ${isActive ? 'bg-black/20 text-white' : 'text-sidebar-fg'}`
              }
            >
              <span className="flex items-center gap-[10px]">
                <img src={item.icon} alt="" className="size-[18px]" />
                {!collapsed && item.label}
              </span>
            </NavLink>
          ),
        )}
      </nav>
    </>
  )
}

export default function Layout() {
  const [open, setOpen] = useState(() => {
    // The drawer always starts closed — an overlay restored over the page on load
    // would be startling. Only the in-flow bands remember what you picked.
    if (window.innerWidth < MD) return false
    const saved = localStorage.getItem(STORE_KEY)
    return saved === null ? window.innerWidth >= LG : saved === '1'
  })
  const { pathname } = useLocation()

  // Only a deliberate act — the toggle, or crossing the breakpoint — is a preference.
  // Closing the drawer on navigation goes through plain setOpen so it never writes.
  const choose = (v: boolean) => {
    setOpen(v)
    if (window.innerWidth >= MD) localStorage.setItem(STORE_KEY, v ? '1' : '0')
  }

  // Only the drawer needs this — from `md` up the sidebar is in flow, so navigating
  // with it expanded is fine and shouldn't yank it back to the rail.
  useEffect(() => {
    if (window.innerWidth < MD) setOpen(false)
  }, [pathname])

  // Collapse on the way down to a small screen, restore on the way back up.
  // matchMedia fires only on the crossing itself, unlike a resize listener.
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${LG}px)`)
    const sync = (e: MediaQueryListEvent) => {
      setOpen(e.matches)
      localStorage.setItem(STORE_KEY, e.matches ? '1' : '0')
    }
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return (
    <div className="flex min-h-screen">
      {/* Closed-on-mobile uses `invisible`, not `hidden`, so the off-screen links
          leave the tab order but the slide still animates. */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 shrink-0 overflow-hidden bg-sidebar transition-all md:static ${
          open ? 'w-[246px]' : 'invisible w-[246px] -translate-x-full md:visible md:w-[60px] md:translate-x-0'
        }`}
      >
        <Sidebar collapsed={!open} />
      </aside>

      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[60px] items-center bg-white px-[18px] shadow-card">
          <button
            type="button"
            aria-label="Toggle sidebar"
            aria-expanded={open}
            onClick={() => choose(!open)}
            className="flex size-[18px] cursor-pointer flex-col justify-between"
          >
            <span className="block h-[2px] w-full bg-sidebar" />
            <span className="block h-[2px] w-full bg-sidebar" />
            <span className="block h-[2px] w-full bg-sidebar" />
          </button>
        </header>
        <main className="min-w-0 flex-1 px-[16px] py-[22px] sm:px-[27px]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

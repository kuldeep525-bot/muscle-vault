import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'

// const navItems = [
//   {
//     label: 'Dashboard',
//     href: '/dashboard',
//     icon: (
//       <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
//         <rect x="3" y="3" width="7" height="7" rx="1"/>
//         <rect x="14" y="3" width="7" height="7" rx="1"/>
//         <rect x="3" y="14" width="7" height="7" rx="1"/>
//         <rect x="14" y="14" width="7" height="7" rx="1"/>
//       </svg>
//     ),
//   },
//   {
//     label: 'Members',
//     href: '/dashboard/members',
//     icon: (
//       <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
//         <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
//         <circle cx="9" cy="7" r="4"/>
//         <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
//         <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
//       </svg>
//     ),
//   },
//   {
//     label: 'Attendance',
//     href: '/dashboard/attendance',
//     icon: (
//       <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
//         <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//         <polyline points="14 2 14 8 20 8"/>
//         <line x1="16" y1="13" x2="8" y2="13"/>
//         <line x1="16" y1="17" x2="8" y2="17"/>
//         <polyline points="10 9 9 9 8 9"/>
//       </svg>
//     ),
//   },
//   {
//     label: 'Plans',
//     href: '/dashboard/plans',
//     icon: (
//       <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
//         <line x1="12" y1="1" x2="12" y2="23"/>
//         <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
//       </svg>
//     ),
//   },
//   {
//     label: 'Trainers',
//     href: '/dashboard/trainers',
//     icon: (
//       <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
//         <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//       </svg>
//     ),
//   },
//   {
//     label: 'Inquiries',
//     href: '/dashboard/inquiries',
//     icon: (
//       <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
//         <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
//       </svg>
//     ),
//   },
// ]
const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    label: 'Members',
    href: '/dashboard/members',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: 'Payments',
    href: '/dashboard/payments',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
  },
  {
    label: 'Plans',
    href: '/dashboard/plans',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    label: 'Inquiries',
    href: '/dashboard/inquiries',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
]

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully!')
    navigate('/')
  }

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed top-0 left-0 h-full z-30
        w-64 bg-[#0d0d0d] border-r border-white/5
        flex flex-col
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>

        {/* LOGO */}
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="font-bebas text-xl tracking-widest text-white">
            MUSCLE <span className="text-orange-500">VAULT</span>
          </Link>
          <div className="text-xs text-gray-600 tracking-wider mt-1">
            Admin Dashboard
          </div>
        </div>

        {/* NAV LINKS */}
        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3
                  px-4 py-3 rounded-lg
                  text-sm tracking-wider
                  transition-all duration-200
                  group relative
                  ${isActive
                    ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                    : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'
                  }
                `}
              >
                {/* Active left border */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-orange-500 rounded-full"/>
                )}
                <span className={isActive ? 'text-orange-500' : 'text-gray-600 group-hover:text-white transition-colors'}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* USER INFO + LOGOUT */}
        <div className="p-4 border-t border-white/5">

          {/* User info */}
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="
              w-9 h-9 rounded-full
              bg-orange-500/20 border border-orange-500/30
              flex items-center justify-center
              text-orange-500 font-bebas text-lg
              shrink-0
            ">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <div className="text-white text-sm font-medium truncate">
                {user?.name}
              </div>
              <div className="text-gray-600 text-xs truncate">
                {user?.email}
              </div>
            </div>
          </div>

          {/* View site */}
          <Link
            to="/"
            className="
              flex items-center gap-3
              px-4 py-2.5 rounded-lg
              text-xs text-gray-500
              hover:text-white hover:bg-white/5
              transition-all duration-200
              tracking-wider mb-1
            "
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            View Website
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="
              w-full flex items-center gap-3
              px-4 py-2.5 rounded-lg
              text-xs text-gray-500
              hover:text-red-400 hover:bg-red-500/5
              transition-all duration-200
              tracking-wider
            "
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>

        </div>
      </aside>
    </>
  )
}

export default Sidebar
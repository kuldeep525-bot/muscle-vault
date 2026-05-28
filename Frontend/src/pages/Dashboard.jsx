import { useState } from 'react'
import Sidebar from '../components/admin/Sidebar'
import DashboardStats from '../components/admin/DashboardStats'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <div className="
          sticky top-0 z-10
          bg-[#0a0a0a]/95 backdrop-blur-md
          border-b border-white/5
          px-6 py-4
          flex items-center justify-between
        ">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-white transition-colors"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          <div>
            <h1 className="font-bebas text-xl tracking-wider text-white">
              DASHBOARD
            </h1>
            <p className="text-gray-600 text-xs">
              Welcome back! Yeh hai aaj ka overview.
            </p>
          </div>

          {/* Date */}
          <div className="text-gray-600 text-xs hidden sm:block">
            {new Date().toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 p-6">
          <DashboardStats />
        </div>

      </div>
    </div>
  )
}

export default Dashboard

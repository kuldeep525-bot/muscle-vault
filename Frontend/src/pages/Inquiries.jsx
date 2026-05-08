import { useState } from 'react'
import Sidebar from '../components/admin/Sidebar'
import InquiriesTable from '../components/admin/InquiriesTable'

const Inquiries = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="
          sticky top-0 z-10
          bg-[#0a0a0a]/95 backdrop-blur-md
          border-b border-white/5
          px-6 py-4
          flex items-center gap-4
        ">
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
            <h1 className="font-bebas text-xl tracking-wider text-white">INQUIRIES</h1>
            <p className="text-gray-600 text-xs">Contact form submissions dekho</p>
          </div>
        </div>
        <div className="flex-1 p-6">
          <InquiriesTable />
        </div>
      </div>
    </div>
  )
}

export default Inquiries
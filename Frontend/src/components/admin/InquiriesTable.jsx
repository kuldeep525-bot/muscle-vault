import { useState, useEffect } from 'react'
import API from '../../utils/api'
import toast from 'react-hot-toast'

const statusColors = {
  new:     'bg-orange-500/10 text-orange-400 border-orange-500/20',
  read:    'bg-blue-500/10 text-blue-400 border-blue-500/20',
  replied: 'bg-green-500/10 text-green-400 border-green-500/20',
  closed:  'bg-gray-500/10 text-gray-400 border-gray-500/20',
}

const InquiriesTable = () => {
  const [inquiries, setInquiries]   = useState([])
  const [loading, setLoading]       = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [selected, setSelected]     = useState(null)
  const [showModal, setShowModal]   = useState(false)

const fetchInquiries = async () => {
  try {
    setLoading(true)

    const params = new URLSearchParams()

    if (statusFilter) {
      params.append('status', statusFilter)
    }

    const { data } = await API.get(
      `/inquiry/getAll?${params.toString()}`
    )

    setInquiries(data.data || [])

  } catch (error) {
    toast.error('Inquiries load nahi hui!')
  } finally {
    setLoading(false)
  }
}

  useEffect(() => { fetchInquiries() }, [statusFilter])

  // Update status
  const handleStatusUpdate = async (id, newStatus) => {
  try {

    const { data } = await API.put(
      `/inquiry/update/${id}`,
      {
        status: newStatus
      }
    )

    toast.success(data.message)

    fetchInquiries()

    if (selected?._id === id) {
      setSelected({
        ...selected,
        status: newStatus
      })
    }

  } catch (error) {
    toast.error(
      error.response?.data?.message || 'Update nahi hua!'
    )
  }
}

  // Open detail modal
  const handleView = async (inquiry) => {
    setSelected(inquiry)
    setShowModal(true)
    // Auto mark as read
    if (inquiry.status === 'new') {
      await handleStatusUpdate(inquiry._id, 'read')
    }
  }

  const handleDelete = async (id) => {
  try {

    await API.delete(`/inquiry/delete/${id}`)

    toast.success('Inquiry deleted!')

    fetchInquiries()

    if (selected?._id === id) {
      setShowModal(false)
    }

  } catch (error) {
    toast.error('Delete nahi hua!')
  }
}

  // Time ago
  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr)
    const mins  = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days  = Math.floor(diff / 86400000)
    if (mins < 60)  return `${mins}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-bebas text-2xl tracking-wider text-white">
            INQUIRIES
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            {inquiries.length} inquiries found
          </p>
        </div>

        {/* New badge */}
        {inquiries.filter(i => i.status === 'new').length > 0 && (
          <div className="
            flex items-center gap-2 px-4 py-2
            bg-orange-500/10 border border-orange-500/20
            rounded-lg
          ">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"/>
            <span className="text-orange-400 text-xs tracking-wider">
              {inquiries.filter(i => i.status === 'new').length} new unread
            </span>
          </div>
        )}
      </div>

      {/* STATUS FILTER TABS */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['', 'new', 'read', 'replied', 'closed'].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`
              px-4 py-2 rounded-lg text-xs tracking-widest uppercase
              transition-all duration-200
              ${statusFilter === s
                ? 'bg-orange-500 text-white'
                : 'border border-white/10 text-gray-500 hover:border-orange-500/50 hover:text-orange-500'
              }
            `}
          >
            {s === '' ? 'All' : s}
          </button>
        ))}
      </div>

      {/* INQUIRIES LIST */}
      <div className="flex flex-col gap-3">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="bg-[#111] border border-white/5 rounded-xl p-5 animate-pulse">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5"/>
                  <div>
                    <div className="h-3 bg-white/5 rounded w-24 mb-1"/>
                    <div className="h-2 bg-white/5 rounded w-32"/>
                  </div>
                </div>
                <div className="h-5 bg-white/5 rounded w-16"/>
              </div>
              <div className="h-3 bg-white/5 rounded w-1/3 mb-2"/>
              <div className="h-3 bg-white/5 rounded mb-1"/>
              <div className="h-3 bg-white/5 rounded w-3/4"/>
            </div>
          ))
        ) : inquiries.length === 0 ? (
          <div className="bg-[#111] border border-white/5 rounded-xl p-16 text-center">
            <div className="text-4xl mb-3">📭</div>
            <div className="text-gray-500 text-sm">Koi inquiry nahi mili</div>
          </div>
        ) : (
          inquiries.map((inquiry) => (
            <div
              key={inquiry._id}
              onClick={() => handleView(inquiry)}
              className={`
                bg-[#111] border rounded-xl p-5
                cursor-pointer
                hover:border-orange-500/20
                transition-all duration-200
                ${inquiry.status === 'new'
                  ? 'border-orange-500/20'
                  : 'border-white/5'
                }
              `}
            >
              <div className="flex items-start justify-between gap-4">

                {/* Left — Person info */}
                <div className="flex items-start gap-3 flex-1 min-w-0">

                  {/* Avatar */}
                  <div className="
                    w-10 h-10 rounded-full shrink-0
                    bg-orange-500/20 border border-orange-500/30
                    flex items-center justify-center
                    font-bebas text-lg text-orange-500
                  ">
                    {inquiry.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">

                    {/* Name + email */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white text-sm font-medium">
                        {inquiry.name}
                      </span>
                      {inquiry.status === 'new' && (
                        <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0"/>
                      )}
                    </div>
                    <div className="text-gray-500 text-xs">{inquiry.email}</div>

                    {/* Subject */}
                    <div className="text-gray-300 text-sm mt-2 font-medium">
                      {inquiry.subject}
                    </div>

                    {/* Message preview */}
                    <p className="text-gray-600 text-xs mt-1 line-clamp-2 leading-relaxed">
                      {inquiry.message}
                    </p>

                  </div>
                </div>

                {/* Right — Status + time */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className={`
                    text-xs px-2.5 py-1 rounded-full border font-medium capitalize
                    ${statusColors[inquiry.status]}
                  `}>
                    {inquiry.status}
                  </span>
                  <span className="text-gray-700 text-xs">
                    {timeAgo(inquiry.createdAt)}
                  </span>
                  {inquiry.phone && (
                    <span className="text-gray-600 text-xs">
                      📞 {inquiry.phone}
                    </span>
                  )}
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* DETAIL MODAL */}
      {showModal && selected && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bebas text-xl tracking-wider text-white">
                INQUIRY DETAIL
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Person info */}
            <div className="flex items-center gap-4 p-4 bg-[#0d0d0d] rounded-xl mb-5">
              <div className="
                w-14 h-14 rounded-full shrink-0
                bg-orange-500/20 border-2 border-orange-500/30
                flex items-center justify-center
                font-bebas text-2xl text-orange-500
              ">
                {selected.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-white font-medium">{selected.name}</div>
                <div className="text-gray-500 text-sm">{selected.email}</div>
                {selected.phone && (
                  <div className="text-gray-600 text-xs mt-0.5">📞 {selected.phone}</div>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="mb-4">
              <div className="text-xs tracking-widest uppercase text-gray-600 mb-1">Subject</div>
              <div className="text-white font-medium">{selected.subject}</div>
            </div>

            {/* Message */}
            <div className="mb-6">
              <div className="text-xs tracking-widest uppercase text-gray-600 mb-2">Message</div>
              <div className="
                bg-[#0d0d0d] rounded-xl p-4
                text-gray-300 text-sm leading-relaxed
              ">
                {selected.message}
              </div>
            </div>

            {/* Time */}
            <div className="text-gray-600 text-xs mb-5">
              Received: {new Date(selected.createdAt).toLocaleString('en-IN')}
            </div>

            {/* Update Status */}
            <div>
              <div className="text-xs tracking-widest uppercase text-gray-500 mb-3">
                Update Status
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['new', 'read', 'replied', 'closed'].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusUpdate(selected._id, s)}
                    className={`
                      py-2.5 rounded-lg text-xs tracking-wider uppercase
                      border transition-all duration-200 capitalize
                      ${selected.status === s
                        ? 'bg-orange-500 border-orange-500 text-white'
                        : 'border-white/10 text-gray-500 hover:border-orange-500/50 hover:text-orange-500'
                      }
                    `}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* DELETE BUTTON */}
<div className="mt-5">
  <button
    onClick={() => handleDelete(selected._id)}
    className="
      w-full py-3 rounded-lg
      bg-red-500/10 border border-red-500/20
      text-red-400
      hover:bg-red-500 hover:text-white
      transition-all duration-200
    "
  >
    Delete Inquiry
  </button>
</div>

          </div>
        </div>
      )}

    </div>
  )
}

export default InquiriesTable
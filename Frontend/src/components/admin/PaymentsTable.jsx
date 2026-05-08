import { useState, useEffect } from 'react'
import API from '../../utils/api'
import toast from 'react-hot-toast'

const statusColors = {
  paid:    'bg-green-500/10 text-green-400 border-green-500/20',
  due:     'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  overdue: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
]

const currentMonth = `${months[new Date().getMonth()]} ${new Date().getFullYear()}`

const PaymentsTable = () => {
  const [payments, setPayments]   = useState([])
  const [members, setMembers]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [monthFilter, setMonthFilter]   = useState(currentMonth)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    memberId: '',
    amount: '',
    month: currentMonth,
    status: 'paid',
    paidOn: new Date().toISOString().split('T')[0],
  })
  const [saving, setSaving] = useState(false)

  // Fetch payments
  const fetchPayments = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter) params.append('status', statusFilter)
      if (monthFilter)  params.append('month', monthFilter)
      const { data } = await API.get(`/payments?${params}`)
      setPayments(data.data)
    } catch {
      toast.error('Payments load nahi hue!')
    } finally {
      setLoading(false)
    }
  }

  // Fetch members for dropdown
  const fetchMembers = async () => {
    try {
      const { data } = await API.get('/members')
      setMembers(data.data)
    } catch {}
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  useEffect(() => {
    fetchPayments()
  }, [statusFilter, monthFilter])

  // Add payment
  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.memberId || !form.amount) {
      toast.error('Member aur amount required hai!')
      return
    }
    try {
      setSaving(true)
      await API.post('/payments', {
        member: form.memberId,
        amount: Number(form.amount),
        month:  form.month,
        status: form.status,
        paidOn: form.paidOn,
      })
      toast.success('Payment record add ho gaya!')
      setShowModal(false)
      fetchPayments()
      setForm({
        memberId: '',
        amount: '',
        month: currentMonth,
        status: 'paid',
        paidOn: new Date().toISOString().split('T')[0],
      })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save nahi hua!')
    } finally {
      setSaving(false)
    }
  }

  // Update payment status
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await API.put(`/payments/${id}`, { status: newStatus })
      toast.success('Status updated!')
      fetchPayments()
    } catch {
      toast.error('Update nahi hua!')
    }
  }

  // Delete payment
  const handleDelete = async (id) => {
    if (!window.confirm('Yeh payment record delete karna chahte ho?')) return
    try {
      await API.delete(`/payments/${id}`)
      toast.success('Deleted!')
      fetchPayments()
    } catch {
      toast.error('Delete nahi hua!')
    }
  }

  // Summary counts
  const paidCount   = payments.filter(p => p.status === 'paid').length
  const dueCount    = payments.filter(p => p.status === 'due').length
  const overdueCount = payments.filter(p => p.status === 'overdue').length
  const totalAmount = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-bebas text-2xl tracking-wider text-white">
            PAYMENT TRACKER
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Monthly payment status track karo
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="
            flex items-center gap-2 px-5 py-2.5
            bg-orange-500 hover:bg-orange-600
            text-white text-xs tracking-widest uppercase font-medium
            rounded-lg transition-all duration-300
          "
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Payment
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: 'Paid',
            value: paidCount,
            color: 'bg-green-500/10 border-green-500/20',
            text: 'text-green-400',
            icon: '✅',
          },
          {
            label: 'Due',
            value: dueCount,
            color: 'bg-yellow-500/10 border-yellow-500/20',
            text: 'text-yellow-400',
            icon: '⚠️',
          },
          {
            label: 'Overdue',
            value: overdueCount,
            color: 'bg-red-500/10 border-red-500/20',
            text: 'text-red-400',
            icon: '❌',
          },
          {
            label: 'Total Collected',
            value: `₹${totalAmount.toLocaleString()}`,
            color: 'bg-orange-500/10 border-orange-500/20',
            text: 'text-orange-400',
            icon: '💰',
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`
              border rounded-xl p-4
              ${card.color}
            `}
          >
            <div className="text-2xl mb-2">{card.icon}</div>
            <div className={`font-bebas text-3xl tracking-wider ${card.text}`}>
              {card.value}
            </div>
            <div className="text-gray-500 text-xs mt-0.5">{card.label}</div>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">

        {/* Month filter */}
        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="
            bg-[#111] border border-white/10
            rounded-lg px-4 py-2.5
            text-gray-400 text-sm
            focus:outline-none focus:border-orange-500
            transition-colors duration-300
          "
        >
          {months.map((m) => (
            <option
              key={m}
              value={`${m} ${new Date().getFullYear()}`}
              className="bg-[#111]"
            >
              {m} {new Date().getFullYear()}
            </option>
          ))}
        </select>

        {/* Status filter */}
        <div className="flex gap-2 flex-wrap">
          {['', 'paid', 'due', 'overdue'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`
                px-4 py-2.5 rounded-lg text-xs tracking-widest uppercase
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

        {/* Refresh */}
        <button
          onClick={fetchPayments}
          className="
            px-4 py-2.5 border border-white/10
            rounded-lg text-gray-500
            hover:border-orange-500 hover:text-orange-500
            transition-all duration-300 ml-auto
          "
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-gray-600 font-medium">Member</th>
                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-gray-600 font-medium">Plan</th>
                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-gray-600 font-medium">Month</th>
                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-gray-600 font-medium">Amount</th>
                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-gray-600 font-medium">Paid On</th>
                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-gray-600 font-medium">Status</th>
                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-white/5 animate-pulse">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5"/>
                        <div className="h-3 bg-white/5 rounded w-24"/>
                      </div>
                    </td>
                    {[...Array(5)].map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-3 bg-white/5 rounded w-16"/>
                      </td>
                    ))}
                    <td className="px-6 py-4">
                      <div className="h-7 bg-white/5 rounded w-20"/>
                    </td>
                  </tr>
                ))
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="text-4xl mb-3">💳</div>
                    <div className="text-gray-500 text-sm">
                      Is month ka koi payment record nahi hai
                    </div>
                    <button
                      onClick={() => setShowModal(true)}
                      className="
                        mt-4 px-6 py-2.5
                        border border-orange-500 text-orange-500
                        hover:bg-orange-500 hover:text-white
                        text-xs tracking-widest uppercase rounded-lg
                        transition-all duration-300
                      "
                    >
                      Payment Add Karo
                    </button>
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="
                      border-b border-white/5
                      hover:bg-white/[0.02]
                      transition-colors duration-200
                    "
                  >
                    {/* Member */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="
                          w-8 h-8 rounded-full shrink-0
                          bg-orange-500/20 border border-orange-500/30
                          flex items-center justify-center
                          text-orange-500 font-bebas
                        ">
                          {payment.member?.user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-white text-sm">
                            {payment.member?.user?.name}
                          </div>
                          <div className="text-gray-600 text-xs">
                            {payment.member?.memberId}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="px-6 py-4">
                      <span className="text-gray-400 text-sm">
                        {payment.member?.membershipPlan?.name || '—'}
                      </span>
                    </td>

                    {/* Month */}
                    <td className="px-6 py-4">
                      <span className="text-gray-400 text-sm">
                        {payment.month}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">
                        ₹{payment.amount?.toLocaleString()}
                      </span>
                    </td>

                    {/* Paid On */}
                    <td className="px-6 py-4">
                      <span className="text-gray-500 text-sm">
                        {payment.paidOn
                          ? new Date(payment.paidOn).toLocaleDateString('en-IN')
                          : '—'
                        }
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`
                        text-xs px-2.5 py-1 rounded-full border font-medium capitalize
                        ${statusColors[payment.status]}
                      `}>
                        {payment.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">

                        {/* Mark as Paid */}
                        {payment.status !== 'paid' && (
                          <button
                            onClick={() => handleStatusUpdate(payment._id, 'paid')}
                            className="
                              px-3 py-1.5 text-xs tracking-wider
                              border border-green-500/30 text-green-400
                              hover:bg-green-500/10
                              rounded-lg transition-all duration-200
                            "
                          >
                            Mark Paid
                          </button>
                        )}

                        {/* Mark as Due */}
                        {payment.status === 'paid' && (
                          <button
                            onClick={() => handleStatusUpdate(payment._id, 'due')}
                            className="
                              px-3 py-1.5 text-xs tracking-wider
                              border border-yellow-500/30 text-yellow-400
                              hover:bg-yellow-500/10
                              rounded-lg transition-all duration-200
                            "
                          >
                            Mark Due
                          </button>
                        )}

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(payment._id)}
                          className="
                            w-7 h-7 rounded-lg
                            border border-white/10 text-gray-500
                            hover:border-red-500/30 hover:text-red-400
                            flex items-center justify-center
                            transition-all duration-200
                          "
                        >
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                          </svg>
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD PAYMENT MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bebas text-xl tracking-wider text-white">
                ADD PAYMENT
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

            <form onSubmit={handleSave} className="flex flex-col gap-4">

              {/* Member select */}
              <div>
                <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                  Member *
                </label>
                <select
                  value={form.memberId}
                  onChange={(e) => setForm({ ...form, memberId: e.target.value })}
                  className="
                    w-full bg-[#0d0d0d] border border-white/10
                    rounded-lg px-4 py-3 text-gray-400 text-sm
                    focus:outline-none focus:border-orange-500
                    transition-colors duration-300
                  "
                >
                  <option value="">Member select karo...</option>
                  {members.map((m) => (
                    <option key={m._id} value={m._id} className="bg-[#111]">
                      {m.user?.name} — {m.memberId}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                  Amount (₹) *
                </label>
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  placeholder="999"
                  className="
                    w-full bg-[#0d0d0d] border border-white/10
                    rounded-lg px-4 py-3 text-white text-sm
                    placeholder-gray-600
                    focus:outline-none focus:border-orange-500
                    transition-colors duration-300
                  "
                />
              </div>

              {/* Month */}
              <div>
                <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                  Month
                </label>
                <select
                  value={form.month}
                  onChange={(e) => setForm({ ...form, month: e.target.value })}
                  className="
                    w-full bg-[#0d0d0d] border border-white/10
                    rounded-lg px-4 py-3 text-gray-400 text-sm
                    focus:outline-none focus:border-orange-500
                    transition-colors duration-300
                  "
                >
                  {months.map((m) => (
                    <option
                      key={m}
                      value={`${m} ${new Date().getFullYear()}`}
                      className="bg-[#111]"
                    >
                      {m} {new Date().getFullYear()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                  Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['paid', 'due', 'overdue'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, status: s })}
                      className={`
                        py-2.5 rounded-lg text-xs tracking-wider uppercase
                        border transition-all duration-200 capitalize
                        ${form.status === s
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'border-white/10 text-gray-500 hover:border-orange-500/50'
                        }
                      `}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Paid On date */}
              {form.status === 'paid' && (
                <div>
                  <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                    Paid On Date
                  </label>
                  <input
                    type="date"
                    value={form.paidOn}
                    onChange={(e) => setForm({ ...form, paidOn: e.target.value })}
                    className="
                      w-full bg-[#0d0d0d] border border-white/10
                      rounded-lg px-4 py-3 text-gray-400 text-sm
                      focus:outline-none focus:border-orange-500
                      transition-colors duration-300
                    "
                  />
                </div>
              )}

              {/* Save button */}
              <button
                type="submit"
                disabled={saving}
                className="
                  w-full py-3.5 mt-2
                  bg-orange-500 hover:bg-orange-600
                  disabled:opacity-50 disabled:cursor-not-allowed
                  text-white text-xs tracking-widest uppercase font-medium
                  rounded-lg transition-all duration-300
                  flex items-center justify-center gap-2
                "
              >
                {saving ? (
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
                Save Payment
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default PaymentsTable


// import { useState, useEffect } from 'react'
// import API from '../../utils/api'
// import toast from 'react-hot-toast'

// const statusColors = {
//   paid: 'bg-green-500/10 text-green-400 border-green-500/20',
//   due: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
//   overdue: 'bg-red-500/10 text-red-400 border-red-500/20',
// }

// const months = [
//   'January', 'February', 'March', 'April',
//   'May', 'June', 'July', 'August',
//   'September', 'October', 'November', 'December',
// ]

// const currentMonth = `${months[new Date().getMonth()]} ${new Date().getFullYear()}`

// const PaymentsTable = () => {
//   const [payments, setPayments] = useState([])
//   const [members, setMembers] = useState([])
//   const [plans, setPlans] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [statusFilter, setStatusFilter] = useState('')
//   const [monthFilter, setMonthFilter] = useState(currentMonth)
//   const [showModal, setShowModal] = useState(false)
//   const [saving, setSaving] = useState(false)

//   const [form, setForm] = useState({
//     memberId: '',
//     planId: '',
//     amount: '',
//     month: currentMonth,
//     status: 'paid',
//     paidAt: new Date().toISOString().split('T')[0],
//   })

//   // FETCH PAYMENTS
//   const fetchPayments = async () => {
//     try {
//       setLoading(true)

//       const params = new URLSearchParams()

//       if (statusFilter) params.append('status', statusFilter)
//       if (monthFilter) params.append('month', monthFilter)

//       const { data } = await API.get(`/payment/getAll?${params}`)

//       setPayments(data.data || [])
//     } catch (err) {
//       if (err.response?.status !== 404) {
//         toast.error('Payments load nahi hue!')
//       }

//       setPayments([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   // FETCH MEMBERS
//   const fetchMembers = async () => {
//     try {
//       const { data } = await API.get('/member/getAll')
//       setMembers(data.data || [])
//     } catch {
//       toast.error('Members load nahi hue!')
//     }
//   }

//   // FETCH PLANS
//   const fetchPlans = async () => {
//     try {
//       const { data } = await API.get('/plan/getAll')
//       console.log(data) // check karo response
//       setPlans(data.plan || [])
//     } catch {
//       toast.error('Plans load nahi hue!')
//     }
//   }

//   useEffect(() => {
//     fetchMembers()
//     fetchPlans()
//   }, [])

//   useEffect(() => {
//     fetchPayments()
//   }, [statusFilter, monthFilter])

//   // SAVE PAYMENT
//   const handleSave = async (e) => {
//     e.preventDefault()

//     if (!form.memberId || !form.planId || !form.amount) {
//       toast.error('Member, Plan aur Amount required hai!')
//       return
//     }

//     try {
//       setSaving(true)

//       await API.post('/payment/create', {
//         memberId: form.memberId,
//         planId: form.planId,
//         amount: Number(form.amount),
//         month: form.month,
//         status: form.status,
//         paidAt: form.status === 'paid' ? form.paidAt : null,
//       })

//       toast.success('Payment record add ho gaya!')

//       setShowModal(false)

//       fetchPayments()

//       setForm({
//         memberId: '',
//         planId: '',
//         amount: '',
//         month: currentMonth,
//         status: 'paid',
//         paidAt: new Date().toISOString().split('T')[0],
//       })
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Save nahi hua!')
//     } finally {
//       setSaving(false)
//     }
//   }

//   // UPDATE STATUS
//   const handleStatusUpdate = async (id, newStatus) => {
//     try {
//       await API.put(`/payment/update/${id}`, {
//         status: newStatus,
//       })

//       toast.success('Status updated!')
//       fetchPayments()
//     } catch {
//       toast.error('Update nahi hua!')
//     }
//   }

//   // DELETE PAYMENT
//   const handleDelete = async (id) => {
//     if (!window.confirm('Yeh payment record delete karna chahte ho?')) return

//     try {
//       await API.delete(`/payment/delete/${id}`)

//       toast.success('Deleted!')
//       fetchPayments()
//     } catch {
//       toast.error('Delete nahi hua!')
//     }
//   }

//   const paidCount = payments.filter((p) => p.status === 'paid').length
//   const dueCount = payments.filter((p) => p.status === 'due').length
//   const overdueCount = payments.filter((p) => p.status === 'overdue').length

//   const totalAmount = payments
//     .filter((p) => p.status === 'paid')
//     .reduce((sum, p) => sum + p.amount, 0)

//   return (
//     <div>

//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//         <div>
//           <h2 className="font-bebas text-2xl tracking-wider text-white">
//             PAYMENT TRACKER
//           </h2>

//           <p className="text-gray-500 text-xs mt-0.5">
//             Monthly payment status track karo
//           </p>
//         </div>

//         <button
//           onClick={() => setShowModal(true)}
//           className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-Replace: red-700
//  text-white text-xs tracking-widest uppercase font-medium rounded-lg transition-all duration-300"
//         >
//           Add Payment
//         </button>
//       </div>

//       {/* SUMMARY */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

//         <div className="border rounded-xl p-4 bg-green-500/10 border-green-500/20">
//           <div className="text-2xl mb-2">✅</div>
//           <div className="font-bebas text-3xl tracking-wider text-green-400">
//             {paidCount}
//           </div>
//           <div className="text-gray-500 text-xs mt-0.5">
//             Paid
//           </div>
//         </div>

//         <div className="border rounded-xl p-4 bg-yellow-500/10 border-yellow-500/20">
//           <div className="text-2xl mb-2">⚠️</div>
//           <div className="font-bebas text-3xl tracking-wider text-yellow-400">
//             {dueCount}
//           </div>
//           <div className="text-gray-500 text-xs mt-0.5">
//             Due
//           </div>
//         </div>

//         <div className="border rounded-xl p-4 bg-red-500/10 border-red-500/20">
//           <div className="text-2xl mb-2">❌</div>
//           <div className="font-bebas text-3xl tracking-wider text-red-400">
//             {overdueCount}
//           </div>
//           <div className="text-gray-500 text-xs mt-0.5">
//             Overdue
//           </div>
//         </div>

//         <div className="border rounded-xl p-4 bg-red-600/10 border-red-600/20">
//           <div className="text-2xl mb-2">💰</div>
//           <div className="font-bebas text-3xl tracking-wider text-red-500">
//             ₹{totalAmount.toLocaleString()}
//           </div>
//           <div className="text-gray-500 text-xs mt-0.5">
//             Total Collected
//           </div>
//         </div>

//       </div>

//       {/* TABLE */}
//       <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
//         <div className="overflow-x-auto">

//           <table className="w-full">

//             <thead>
//               <tr className="border-b border-white/5">
//                 <th className="text-left px-6 py-4 text-xs uppercase text-gray-600">Member</th>
//                 <th className="text-left px-6 py-4 text-xs uppercase text-gray-600">Plan</th>
//                 <th className="text-left px-6 py-4 text-xs uppercase text-gray-600">Month</th>
//                 <th className="text-left px-6 py-4 text-xs uppercase text-gray-600">Amount</th>
//                 <th className="text-left px-6 py-4 text-xs uppercase text-gray-600">Paid On</th>
//                 <th className="text-left px-6 py-4 text-xs uppercase text-gray-600">Status</th>
//                 <th className="text-left px-6 py-4 text-xs uppercase text-gray-600">Actions</th>
//               </tr>
//             </thead>

//             <tbody>

//               {payments.map((payment) => (

//                 <tr
//                   key={payment._id}
//                   className="border-b border-white/5 hover:bg-white/[0.02]"
//                 >

//                   <td className="px-6 py-4">
//                     <div className="text-white text-sm">
//                       {payment.memberId?.userId?.name}
//                     </div>

//                     <div className="text-gray-600 text-xs">
//                       {payment.memberId?.userId?.email}
//                     </div>
//                   </td>

//                   <td className="px-6 py-4 text-gray-400 text-sm">
//                     {payment.planId?.name || '—'}
//                   </td>

//                   <td className="px-6 py-4 text-gray-400 text-sm">
//                     {payment.month}
//                   </td>

//                   <td className="px-6 py-4 text-white font-medium">
//                     ₹{payment.amount}
//                   </td>

//                   <td className="px-6 py-4 text-gray-500 text-sm">
//                     {payment.paidAt
//                       ? new Date(payment.paidAt).toLocaleDateString('en-IN')
//                       : '—'}
//                   </td>

//                   <td className="px-6 py-4">
//                     <span
//                       className={`text-xs px-2.5 py-1 rounded-full border capitalize ${statusColors[payment.status]}`}
//                     >
//                       {payment.status}
//                     </span>
//                   </td>

//                   <td className="px-6 py-4 flex gap-2">

//                     {payment.status !== 'paid' && (
//                       <button
//                         onClick={() =>
//                           handleStatusUpdate(payment._id, 'paid')
//                         }
//                         className="px-3 py-1.5 text-xs border border-green-500/30 text-green-400 rounded-lg"
//                       >
//                         Mark Paid
//                       </button>
//                     )}

//                     <button
//                       onClick={() => handleDelete(payment._id)}
//                       className="px-3 py-1.5 text-xs border border-red-500/30 text-red-400 rounded-lg"
//                     >
//                       Delete
//                     </button>

//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         </div>
//       </div>

//       {/* MODAL */}
//       {showModal && (
//         <div
//           className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
//           onClick={() => setShowModal(false)}
//         >

//           <div
//             className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md"
//             onClick={(e) => e.stopPropagation()}
//           >

//             <h3 className="font-bebas text-xl tracking-wider text-white mb-6">
//               ADD PAYMENT
//             </h3>

//             <form onSubmit={handleSave} className="flex flex-col gap-4">

//               {/* MEMBER */}
//               <div>
//                 <label className="text-xs uppercase text-gray-500 mb-2 block">
//                   Member *
//                 </label>

//                 <select
//                   value={form.memberId}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       memberId: e.target.value,
//                     })
//                   }
//                   className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-gray-400 text-sm"
//                 >
//                   <option value="">Select Member</option>

//                   {members.map((m) => (
//                     <option key={m._id} value={m._id}>
//                       {m.userId?.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* PLAN */}
//               <div>
//                 <label className="text-xs uppercase text-gray-500 mb-2 block">
//                   Plan *
//                 </label>

//                 <select
//                   value={form.planId}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       planId: e.target.value,
//                     })
//                   }
//                   className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-gray-400 text-sm"
//                 >
//                   <option value="">Select Plan</option>

//                   {plans.map((plan) => (
//                     <option key={plan._id} value={plan._id}>
//                       {plan.name} — ₹{plan.price}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* AMOUNT */}
//               <div>
//                 <label className="text-xs uppercase text-gray-500 mb-2 block">
//                   Amount *
//                 </label>

//                 <input
//                   type="number"
//                   value={form.amount}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       amount: e.target.value,
//                     })
//                   }
//                   className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-white text-sm"
//                 />
//               </div>

//               {/* MONTH */}
//               <div>
//                 <label className="text-xs uppercase text-gray-500 mb-2 block">
//                   Month
//                 </label>

//                 <select
//                   value={form.month}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       month: e.target.value,
//                     })
//                   }
//                   className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-gray-400 text-sm"
//                 >
//                   {months.map((m) => (
//                     <option key={m} value={`${m} ${new Date().getFullYear()}`}>
//                       {m} {new Date().getFullYear()}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* STATUS */}
//               <div>
//                 <label className="text-xs uppercase text-gray-500 mb-2 block">
//                   Status
//                 </label>

//                 <select
//                   value={form.status}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       status: e.target.value,
//                     })
//                   }
//                   className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-gray-400 text-sm"
//                 >
//                   <option value="paid">Paid</option>
//                   <option value="due">Due</option>
//                   <option value="overdue">Overdue</option>
//                 </select>
//               </div>

//               {/* PAID DATE */}
//               {form.status === 'paid' && (
//                 <div>
//                   <label className="text-xs uppercase text-gray-500 mb-2 block">
//                     Paid Date
//                   </label>

//                   <input
//                     type="date"
//                     value={form.paidAt}
//                     onChange={(e) =>
//                       setForm({
//                         ...form,
//                         paidAt: e.target.value,
//                       })
//                     }
//                     className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-gray-400 text-sm"
//                   />
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={saving}
//                 className="w-full py-3.5 mt-2 bg-red-600 hover:bg-Replace: red-700
//  text-white text-xs uppercase rounded-lg"
//               >
//                 {saving ? 'Saving...' : 'Save Payment'}
//               </button>

//             </form>

//           </div>

//         </div>
//       )}

//     </div>
//   )
// }

// export default PaymentsTable













import { useState, useEffect } from 'react'
import API from '../../utils/api'
import toast from 'react-hot-toast'

const statusColors = {
  paid: 'bg-green-500/10 text-green-400 border-green-500/20',
  due: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  overdue: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const currentMonth = new Date().toISOString().slice(0, 7)

const PaymentsTable = () => {
  const [payments, setPayments] = useState([])
  const [members, setMembers] = useState([])
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [monthFilter, setMonthFilter] = useState(currentMonth)
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    memberId: '',
    planId: '',
    amount: '',
    month: currentMonth,
    status: 'paid',
    paidAt: new Date().toISOString().split('T')[0],
  })

  // FETCH PAYMENTS
  const fetchPayments = async () => {
    try {
      setLoading(true)

      const params = new URLSearchParams()

      if (statusFilter) params.append('status', statusFilter)
      if (monthFilter) params.append('month', monthFilter)

      const { data } = await API.get(`/payment/getAll?${params}`)

      setPayments(data.data || [])
    } catch (err) {
      if (err.response?.status !== 404) {
        toast.error('Payments load nahi hue!')
      }

      setPayments([])
    } finally {
      setLoading(false)
    }
  }

  // FETCH MEMBERS
  const fetchMembers = async () => {
    try {
      const { data } = await API.get('/member/getAll')
      setMembers(data.data || [])
    } catch {
      toast.error('Members load nahi hue!')
    }
  }

  // FETCH PLANS
  const fetchPlans = async () => {
    try {
      const { data } = await API.get('/plan/getAll')
      setPlans(data.plan || [])
    } catch {
      toast.error('Plans load nahi hue!')
    }
  }

  useEffect(() => {
    fetchMembers()
    fetchPlans()
  }, [])

  useEffect(() => {
    fetchPayments()
  }, [statusFilter, monthFilter])

  // SAVE PAYMENT
  const handleSave = async (e) => {
    e.preventDefault()

    if (!form.memberId || !form.planId || !form.amount) {
      toast.error('Member, Plan aur Amount required hai!')
      return
    }

    try {
      setSaving(true)

      await API.post('/payment/create', {
        memberId: form.memberId,
        planId: form.planId,
        amount: Number(form.amount),
        month: form.month,
        status: form.status,
        paidAt: form.status === 'paid' ? form.paidAt : null,
      })

      toast.success('Payment record add ho gaya!')

      setShowModal(false)

      fetchPayments()

      setForm({
        memberId: '',
        planId: '',
        amount: '',
        month: currentMonth,
        status: 'paid',
        paidAt: new Date().toISOString().split('T')[0],
      })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save nahi hua!')
    } finally {
      setSaving(false)
    }
  }

  // UPDATE STATUS
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await API.put(`/payment/update/${id}`, {
        status: newStatus,
      })

      toast.success('Status updated!')
      fetchPayments()
    } catch {
      toast.error('Update nahi hua!')
    }
  }

  // DELETE PAYMENT
  const handleDelete = async (id) => {
    if (!window.confirm('Yeh payment record delete karna chahte ho?')) return

    try {
      await API.delete(`/payment/delete/${id}`)

      toast.success('Deleted!')
      fetchPayments()
    } catch {
      toast.error('Delete nahi hua!')
    }
  }

  const paidCount = payments.filter((p) => p.status === 'paid').length
  const dueCount = payments.filter((p) => p.status === 'due').length
  const overdueCount = payments.filter((p) => p.status === 'overdue').length

  const totalAmount = payments
    .filter((p) => p.status === 'paid')
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
          className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs tracking-widest uppercase font-medium rounded-lg transition-all duration-300"
        >
          Add Payment
        </button>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div className="border rounded-xl p-4 bg-green-500/10 border-green-500/20">
          <div className="text-2xl mb-2">✅</div>

          <div className="font-bebas text-3xl tracking-wider text-green-400">
            {paidCount}
          </div>

          <div className="text-gray-500 text-xs mt-0.5">
            Paid
          </div>
        </div>

        <div className="border rounded-xl p-4 bg-yellow-500/10 border-yellow-500/20">
          <div className="text-2xl mb-2">⚠️</div>

          <div className="font-bebas text-3xl tracking-wider text-yellow-400">
            {dueCount}
          </div>

          <div className="text-gray-500 text-xs mt-0.5">
            Due
          </div>
        </div>

        <div className="border rounded-xl p-4 bg-red-500/10 border-red-500/20">
          <div className="text-2xl mb-2">❌</div>

          <div className="font-bebas text-3xl tracking-wider text-red-400">
            {overdueCount}
          </div>

          <div className="text-gray-500 text-xs mt-0.5">
            Overdue
          </div>
        </div>

        <div className="border rounded-xl p-4 bg-red-600/10 border-red-600/20">
          <div className="text-2xl mb-2">💰</div>

          <div className="font-bebas text-3xl tracking-wider text-red-500">
            ₹{totalAmount.toLocaleString()}
          </div>

          <div className="text-gray-500 text-xs mt-0.5">
            Total Collected
          </div>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-xs uppercase text-gray-600">Member</th>
                <th className="text-left px-6 py-4 text-xs uppercase text-gray-600">Plan</th>
                <th className="text-left px-6 py-4 text-xs uppercase text-gray-600">Month</th>
                <th className="text-left px-6 py-4 text-xs uppercase text-gray-600">Amount</th>
                <th className="text-left px-6 py-4 text-xs uppercase text-gray-600">Paid On</th>
                <th className="text-left px-6 py-4 text-xs uppercase text-gray-600">Status</th>
                <th className="text-left px-6 py-4 text-xs uppercase text-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody>

              {payments.map((payment) => (

                <tr
                  key={payment._id}
                  className="border-b border-white/5 hover:bg-white/[0.02]"
                >

                  <td className="px-6 py-4">
                    <div className="text-white text-sm">
                      {payment.memberId?.userId?.name}
                    </div>

                    <div className="text-gray-600 text-xs">
                      {payment.memberId?.userId?.email}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {payment.planId?.name || '—'}
                  </td>

                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {payment.month
                      ? new Date(payment.month).toLocaleDateString('en-IN', {
                          month: 'long',
                          year: 'numeric',
                        })
                      : '—'}
                  </td>

                  <td className="px-6 py-4 text-white font-medium">
                    ₹{payment.amount}
                  </td>

                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {payment.paidAt
                      ? new Date(payment.paidAt).toLocaleDateString('en-IN')
                      : '—'}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full border capitalize ${statusColors[payment.status]}`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 flex gap-2">

                    {payment.status !== 'paid' && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(payment._id, 'paid')
                        }
                        className="px-3 py-1.5 text-xs border border-green-500/30 text-green-400 rounded-lg"
                      >
                        Mark Paid
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(payment._id)}
                      className="px-3 py-1.5 text-xs border border-red-500/30 text-red-400 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >

          <div
            className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >

            <h3 className="font-bebas text-xl tracking-wider text-white mb-6">
              ADD PAYMENT
            </h3>

            <form onSubmit={handleSave} className="flex flex-col gap-4">

              {/* MEMBER */}
              <div>
                <label className="text-xs uppercase text-gray-500 mb-2 block">
                  Member *
                </label>

                <select
                  value={form.memberId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      memberId: e.target.value,
                    })
                  }
                  className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-gray-400 text-sm"
                >
                  <option value="">Select Member</option>

                  {members.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.userId?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* PLAN */}
              <div>
                <label className="text-xs uppercase text-gray-500 mb-2 block">
                  Plan *
                </label>

                <select
                  value={form.planId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      planId: e.target.value,
                    })
                  }
                  className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-gray-400 text-sm"
                >
                  <option value="">Select Plan</option>

                  {plans.map((plan) => (
                    <option key={plan._id} value={plan._id}>
                      {plan.name} — ₹{plan.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* AMOUNT */}
              <div>
                <label className="text-xs uppercase text-gray-500 mb-2 block">
                  Amount *
                </label>

                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      amount: e.target.value,
                    })
                  }
                  className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-white text-sm"
                />
              </div>

              {/* MONTH */}
              <div>
                <label className="text-xs uppercase text-gray-500 mb-2 block">
                  Month
                </label>

                <input
                  type="month"
                  value={form.month}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      month: e.target.value,
                    })
                  }
                  className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-gray-400 text-sm"
                />
              </div>

              {/* STATUS */}
              <div>
                <label className="text-xs uppercase text-gray-500 mb-2 block">
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value,
                    })
                  }
                  className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-gray-400 text-sm"
                >
                  <option value="paid">Paid</option>
                  <option value="due">Due</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>

              {/* PAID DATE */}
              {form.status === 'paid' && (
                <div>
                  <label className="text-xs uppercase text-gray-500 mb-2 block">
                    Paid Date
                  </label>

                  <input
                    type="date"
                    value={form.paidAt}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        paidAt: e.target.value,
                      })
                    }
                    className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-gray-400 text-sm"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3.5 mt-2 bg-red-600 hover:bg-red-700 text-white text-xs uppercase rounded-lg"
              >
                {saving ? 'Saving...' : 'Save Payment'}
              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  )
}

export default PaymentsTable
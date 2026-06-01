
// import { useState, useEffect } from 'react'
// import API from '../../utils/api'
// import toast from 'react-hot-toast'

// const statusColors = {
//   active:    'bg-green-500/10 text-green-400 border-green-500/20',
//   nonActive: 'bg-red-500/10 text-red-400 border-red-500/20',
// }

// const MembersTable = () => {
//   const [members, setMembers]       = useState([])
//   const [plans, setPlans]           = useState([])
//   const [loading, setLoading]       = useState(true)
//   const [search, setSearch]         = useState('')
//   const [selected, setSelected]     = useState(null)
//   const [showModal, setShowModal]   = useState(false)
//   const [selectedPlan, setSelectedPlan] = useState('')
//   const [assigning, setAssigning]   = useState(false)

//   // Fetch members
//   const fetchMembers = async () => {
//     try {
//       setLoading(true)
//       const { data } = await API.get('/member/getAll')
//       setMembers(data.data)
//     } catch {
//       toast.error('Members load nahi hue!')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Fetch plans
//   const fetchPlans = async () => {
//     try {
//       const { data } = await API.get('/plan/getAll')
//       setPlans(data.plan || [])
//     } catch {}
//   }

//   useEffect(() => {
//     fetchMembers()
//     fetchPlans()
//   }, [])

//   // Delete member
//   const handleDelete = async (id) => {
//     if (!window.confirm('Kya aap sure hain? Yeh member delete ho jayega!')) return
//     try {
//       await API.delete(`/member/deleteMember/${id}`)
//       toast.success('Member deleted!')
//       fetchMembers()
//     } catch {
//       toast.error('Delete nahi hua!')
//     }
//   }

//   // Update status
//   const handleStatusUpdate = async (id, newStatus) => {
//     try {
//       await API.put(`/member/updateMember/${id}`, {
//         membershipStatus: newStatus
//       })
//       toast.success('Status updated!')
//       fetchMembers()
//       setShowModal(false)
//     } catch {
//       toast.error('Update nahi hua!')
//     }
//   }

//   // Assign plan
//  const handleAssignPlan = async (memberId) => {
//   if (!selectedPlan) {
//     toast.error('Plan select karo!')
//     return
//   }

//   try {
//     setAssigning(true)

//     const { data } = await API.patch(
//       `/member/assignPlan/${memberId}`,
//       {
//         planId: selectedPlan
//       }
//     )

//     toast.success('Plan assign ho gaya!')

//     // Updated member set karo
//     setSelected(data.data)

//     // Members table refresh
//     await fetchMembers()

//   } catch (err) {
//     toast.error(
//       err.response?.data?.message || 'Plan assign nahi hua!'
//     )
//   } finally {
//     setAssigning(false)
//   }
// }

//   // Search filter
//   const filteredMembers = members.filter((m) => {
//     if (!search) return true
//     const name  = m.userId?.name?.toLowerCase() || ''
//     const email = m.userId?.email?.toLowerCase() || ''
//     return name.includes(search.toLowerCase()) ||
//            email.includes(search.toLowerCase())
//   })

//   return (
//     <div>

//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//         <div>
//           <h2 className="font-bebas text-2xl tracking-wider text-white">
//             ALL MEMBERS
//           </h2>
//           <p className="text-gray-500 text-xs mt-0.5">
//             {filteredMembers.length} members found
//           </p>
//         </div>
//       </div>

//       {/* FILTERS */}
//       <div className="flex flex-col sm:flex-row gap-3 mb-6">

//         {/* Search */}
//         <div className="relative flex-1">
//           <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
//             width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//             <circle cx="11" cy="11" r="8"/>
//             <line x1="21" y1="21" x2="16.65" y2="16.65"/>
//           </svg>
//           <input
//             type="text"
//             placeholder="Search by name, email..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="
//               w-full bg-[#111] border border-white/10
//               rounded-lg pl-10 pr-4 py-2.5
//               text-white text-sm placeholder-gray-600
//               focus:outline-none focus:border-red-600
//               transition-colors duration-300
//             "
//           />
//         </div>

//         {/* Refresh */}
//         <button
//           onClick={fetchMembers}
//           className="
//             px-4 py-2.5 border border-white/10
//             rounded-lg text-gray-500
//             hover:border-red-600 hover:text-red-600
//             transition-all duration-300
//           "
//         >
//           <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//             <polyline points="23 4 23 10 17 10"/>
//             <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
//           </svg>
//         </button>

//       </div>

//       {/* TABLE */}
//       <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-white/5">
//                 <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-gray-600 font-medium">Member</th>
//                 <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-gray-600 font-medium">Plan</th>
//                 <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-gray-600 font-medium">Status</th>
//                 <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-gray-600 font-medium">Start Date</th>
//                 <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-gray-600 font-medium">End Date</th>
//                 <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-gray-600 font-medium">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 [...Array(5)].map((_, i) => (
//                   <tr key={i} className="border-b border-white/5 animate-pulse">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-9 h-9 rounded-full bg-white/5"/>
//                         <div>
//                           <div className="h-3 bg-white/5 rounded w-24 mb-1"/>
//                           <div className="h-2 bg-white/5 rounded w-32"/>
//                         </div>
//                       </div>
//                     </td>
//                     {[...Array(4)].map((_, j) => (
//                       <td key={j} className="px-6 py-4">
//                         <div className="h-3 bg-white/5 rounded w-16"/>
//                       </td>
//                     ))}
//                     <td className="px-6 py-4">
//                       <div className="h-7 bg-white/5 rounded w-16"/>
//                     </td>
//                   </tr>
//                 ))
//               ) : filteredMembers.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="px-6 py-16 text-center">
//                     <div className="text-4xl mb-3">👥</div>
//                     <div className="text-gray-500 text-sm">Koi member nahi mila</div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredMembers.map((member) => (
//                   <tr
//                     key={member._id}
//                     className="
//                       border-b border-white/5
//                       hover:bg-white/[0.02]
//                       transition-colors duration-200
//                     "
//                   >
//                     {/* Member info */}
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="
//                           w-9 h-9 rounded-full
//                           bg-red-600/20 border border-red-600/30
//                           flex items-center justify-center
//                           text-red-600 font-bebas text-lg shrink-0
//                         ">
//                           {member.userId?.name?.charAt(0).toUpperCase()}
//                         </div>
//                         <div>
//                           <div className="text-white text-sm font-medium">
//                             {member.userId?.name}
//                           </div>
//                           <div className="text-gray-600 text-xs">
//                             {member.userId?.email}
//                           </div>
//                           <div className="text-gray-700 text-xs">
//                             {member.userId?.phone}
//                           </div>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Plan */}
//                     <td className="px-6 py-4">
//                       <span className={`text-sm ${member.planId?.name ? 'text-gray-300' : 'text-gray-600'}`}>
//                         {member.planId?.name || 'No Plan'}
//                       </span>
//                     </td>

//                     {/* Status */}
//                     <td className="px-6 py-4">
//                       <span className={`
//                         text-xs px-2.5 py-1 rounded-full border font-medium capitalize
//                         ${statusColors[member.membershipStatus] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'}
//                       `}>
//                         {member.membershipStatus}
//                       </span>
//                     </td>

//                     {/* Start Date */}
//                     <td className="px-6 py-4">
//                       <span className="text-gray-500 text-xs">
//                         {member.membershipStart || '—'}
//                       </span>
//                     </td>

//                     {/* End Date */}
//                     <td className="px-6 py-4">
//                       <span className="text-gray-500 text-xs">
//                         {member.membershipEnd || '—'}
//                       </span>
//                     </td>

//                     {/* Actions */}
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">

//                         {/* View */}
//                         <button
//                           onClick={() => {
//                             setSelected(member)
//                             setSelectedPlan(member.planId?._id || '')
//                             setShowModal(true)
//                           }}
//                           className="
//                             w-8 h-8 rounded-lg
//                             bg-white/5 hover:bg-red-600/10
//                             text-gray-500 hover:text-red-600
//                             flex items-center justify-center
//                             transition-all duration-200
//                           "
//                         >
//                           <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                             <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
//                             <circle cx="12" cy="12" r="3"/>
//                           </svg>
//                         </button>

//                         {/* Delete */}
//                         <button
//                           onClick={() => handleDelete(member._id)}
//                           className="
//                             w-8 h-8 rounded-lg
//                             bg-white/5 hover:bg-red-500/10
//                             text-gray-500 hover:text-red-400
//                             flex items-center justify-center
//                             transition-all duration-200
//                           "
//                         >
//                           <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                             <polyline points="3 6 5 6 21 6"/>
//                             <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
//                             <path d="M10 11v6M14 11v6"/>
//                             <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
//                           </svg>
//                         </button>

//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* MEMBER DETAIL MODAL */}
//       {showModal && selected && (
//         <div
//           className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
//           onClick={() => setShowModal(false)}
//         >
//           <div
//             className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >

//             {/* Modal header */}
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="font-bebas text-xl tracking-wider text-white">
//                 MEMBER DETAILS
//               </h3>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-gray-500 hover:text-white transition-colors"
//               >
//                 <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                   <line x1="18" y1="6" x2="6" y2="18"/>
//                   <line x1="6" y1="6" x2="18" y2="18"/>
//                 </svg>
//               </button>
//             </div>

//             {/* Member info */}
//             <div className="flex items-center gap-4 mb-6 p-4 bg-[#0d0d0d] rounded-xl">
//               <div className="
//                 w-14 h-14 rounded-full
//                 bg-red-600/20 border-2 border-red-600/30
//                 flex items-center justify-center
//                 text-red-600 font-bebas text-2xl
//               ">
//                 {selected.userId?.name?.charAt(0).toUpperCase()}
//               </div>
//               <div>
//                 <div className="text-white font-medium">
//                   {selected.userId?.name}
//                 </div>
//                 <div className="text-gray-500 text-sm">
//                   {selected.userId?.email}
//                 </div>
//                 <div className="text-gray-600 text-xs mt-0.5">
//                   {selected.userId?.phone || 'No phone'}
//                 </div>
//               </div>
//             </div>

//             {/* Details grid */}
//             <div className="grid grid-cols-2 gap-3 mb-6">
//               {[
//                 { label: 'Plan',       value: selected.planId?.name || 'No Plan' },
//                 { label: 'Status',     value: selected.membershipStatus },
//                 { label: 'Start Date', value: selected.membershipStart || '—' },
//                 { label: 'End Date',   value: selected.membershipEnd   || '—' },
//               ].map((item) => (
//                 <div key={item.label} className="bg-[#0d0d0d] rounded-lg p-3">
//                   <div className="text-gray-600 text-xs tracking-wider uppercase mb-1">
//                     {item.label}
//                   </div>
//                   <div className="text-white text-sm capitalize">
//                     {item.value}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Assign Plan */}
//             <div className="mb-5">
//               <div className="text-gray-500 text-xs tracking-wider uppercase mb-2">
//                 Assign Plan
//               </div>
//               <div className="flex gap-2">
//                 <select
//                   value={selectedPlan}
//                   onChange={(e) => setSelectedPlan(e.target.value)}
//                   className="
//                     flex-1 bg-[#0d0d0d] border border-white/10
//                     rounded-lg px-3 py-2.5
//                     text-gray-400 text-sm
//                     focus:outline-none focus:border-red-600
//                     transition-colors duration-300
//                   "
//                 >
//                   <option value="">Plan select karo...</option>
//                   {plans.map((p) => (
//                     <option key={p._id} value={p._id} className="bg-[#111]">
//                       {p.name} — ₹{p.price} ({p.duration} month)
//                     </option>
//                   ))}
//                 </select>
//                 <button
//                   onClick={() => handleAssignPlan(selected._id)}
//                   disabled={assigning}
//                   className="
//                     px-4 py-2.5 text-xs tracking-wider uppercase
//                     bg-red-600 hover:bg-Replace: red-700

//                     text-white rounded-lg
//                     transition-all duration-200
//                     disabled:opacity-50
//                   "
//                 >
//                   {assigning ? '...' : 'Assign'}
//                 </button>
//               </div>
//             </div>

//             {/* Update Status */}
//             <div>
//               <div className="text-gray-500 text-xs tracking-wider uppercase mb-2">
//                 Update Status
//               </div>
//               <div className="grid grid-cols-2 gap-2">
//                 {['active', 'nonActive'].map((s) => (
//                   <button
//                     key={s}
//                     onClick={() => handleStatusUpdate(selected._id, s)}
//                     className={`
//                       py-2 rounded-lg text-xs tracking-wider uppercase
//                       border transition-all duration-200 capitalize
//                       ${selected.membershipStatus === s
//                         ? 'bg-red-600 border-red-600 text-white'
//                         : 'border-white/10 text-gray-500 hover:border-red-600/50 hover:text-red-600'
//                       }
//                     `}
//                   >
//                     {s}
//                   </button>
//                 ))}
//               </div>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   )
// }

// export default MembersTable

import { useState, useEffect } from 'react'
import API from '../../utils/api'
import toast from 'react-hot-toast'

const statusColors = {
  active: 'bg-green-500/10 text-green-400 border-green-500/20',
  nonActive: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const MembersTable = () => {
  const [members, setMembers] = useState([])
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')
  const [assigning, setAssigning] = useState(false)

  const [membershipStart, setMembershipStart] = useState('')
  const [membershipEnd, setMembershipEnd] = useState('')

  // Fetch members
  const fetchMembers = async () => {
    try {
      setLoading(true)

      const { data } = await API.get('/member/getAll')

      setMembers(data.data)
    } catch {
      toast.error('Members load nahi hue!')
    } finally {
      setLoading(false)
    }
  }

  // Fetch plans
  const fetchPlans = async () => {
    try {
      const { data } = await API.get('/plan/getAll')

      setPlans(data.plan || [])
    } catch {}
  }

  useEffect(() => {
    fetchMembers()
    fetchPlans()
  }, [])

  // Delete member
  const handleDelete = async (id) => {
    if (
      !window.confirm(
        'Kya aap sure hain? Yeh member delete ho jayega!',
      )
    )
      return

    try {
      await API.delete(`/member/deleteMember/${id}`)

      toast.success('Member deleted!')

      fetchMembers()
    } catch {
      toast.error('Delete nahi hua!')
    }
  }

  // Update status
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await API.put(`/member/updateMember/${id}`, {
        membershipStatus: newStatus,
        membershipStart,
        membershipEnd,
      })

      toast.success('Status updated!')

      fetchMembers()

      setShowModal(false)
    } catch {
      toast.error('Update nahi hua!')
    }
  }

  // Assign plan
  const handleAssignPlan = async (memberId) => {
    if (!selectedPlan) {
      toast.error('Plan select karo!')
      return
    }

    try {
      setAssigning(true)

      const { data } = await API.patch(
        `/member/assignPlan/${memberId}`,
        {
          planId: selectedPlan,
          membershipStart,
          membershipEnd,
        },
      )

      toast.success('Plan assign ho gaya!')

      setSelected(data.data)

      await fetchMembers()
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          'Plan assign nahi hua!',
      )
    } finally {
      setAssigning(false)
    }
  }

  // Search filter
  const filteredMembers = members.filter((m) => {
    if (!search) return true

    const name =
      m.userId?.name?.toLowerCase() || ''

    const email =
      m.userId?.email?.toLowerCase() || ''

    return (
      name.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase())
    )
  })

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-bebas text-2xl tracking-wider text-white">
            ALL MEMBERS
          </h2>

          <p className="text-gray-500 text-xs mt-0.5">
            {filteredMembers.length} members found
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />

            <line
              x1="21"
              y1="21"
              x2="16.65"
              y2="16.65"
            />
          </svg>

          <input
            type="text"
            placeholder="Search by name, email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full bg-[#111] border border-white/10
              rounded-lg pl-10 pr-4 py-2.5
              text-white text-sm placeholder-gray-600
              focus:outline-none focus:border-red-600
              transition-colors duration-300
            "
          />
        </div>

        {/* Refresh */}
        <button
          onClick={fetchMembers}
          className="
            px-4 py-2.5 border border-white/10
            rounded-lg text-gray-500
            hover:border-red-600 hover:text-red-600
            transition-all duration-300
          "
        >
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <polyline points="23 4 23 10 17 10" />

            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-gray-600 font-medium">
                  Member
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-gray-600 font-medium">
                  Plan
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-gray-600 font-medium">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-gray-600 font-medium">
                  Start Date
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-gray-600 font-medium">
                  End Date
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-gray-600 font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 animate-pulse"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-white/5" />

                        <div>
                          <div className="h-3 bg-white/5 rounded w-24 mb-1" />

                          <div className="h-2 bg-white/5 rounded w-32" />
                        </div>
                      </div>
                    </td>

                    {[...Array(4)].map((_, j) => (
                      <td
                        key={j}
                        className="px-6 py-4"
                      >
                        <div className="h-3 bg-white/5 rounded w-16" />
                      </td>
                    ))}

                    <td className="px-6 py-4">
                      <div className="h-7 bg-white/5 rounded w-16" />
                    </td>
                  </tr>
                ))
              ) : filteredMembers.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center"
                  >
                    <div className="text-4xl mb-3">
                      👥
                    </div>

                    <div className="text-gray-500 text-sm">
                      Koi member nahi mila
                    </div>
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr
                    key={member._id}
                    className="
                      border-b border-white/5
                      hover:bg-white/[0.02]
                      transition-colors duration-200
                    "
                  >
                    {/* Member info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                          w-9 h-9 rounded-full
                          bg-red-600/20 border border-red-600/30
                          flex items-center justify-center
                          text-red-600 font-bebas text-lg shrink-0
                        "
                        >
                          {member.userId?.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <div className="text-white text-sm font-medium">
                            {member.userId?.name}
                          </div>

                          <div className="text-gray-600 text-xs">
                            {member.userId?.email}
                          </div>

                          <div className="text-gray-700 text-xs">
                            {member.userId?.phone}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm ${
                          member.planId?.name
                            ? 'text-gray-300'
                            : 'text-gray-600'
                        }`}
                      >
                        {member.planId?.name ||
                          'No Plan'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`
                        text-xs px-2.5 py-1 rounded-full border font-medium capitalize
                        ${
                          statusColors[
                            member.membershipStatus
                          ] ||
                          'bg-gray-500/10 text-gray-400 border-gray-500/20'
                        }
                      `}
                      >
                        {member.membershipStatus}
                      </span>
                    </td>

                    {/* Start Date */}
                    <td className="px-6 py-4">
                      <span className="text-gray-500 text-xs">
                        {member.membershipStart ||
                          '—'}
                      </span>
                    </td>

                    {/* End Date */}
                    <td className="px-6 py-4">
                      <span className="text-gray-500 text-xs">
                        {member.membershipEnd ||
                          '—'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {/* View */}
                        <button
                          onClick={() => {
                            setSelected(member)

                            setSelectedPlan(
                              member.planId?._id || '',
                            )

                            setMembershipStart(
                              member.membershipStart ||
                                '',
                            )

                            setMembershipEnd(
                              member.membershipEnd ||
                                '',
                            )

                            setShowModal(true)
                          }}
                          className="
                            w-8 h-8 rounded-lg
                            bg-white/5 hover:bg-red-600/10
                            text-gray-500 hover:text-red-600
                            flex items-center justify-center
                            transition-all duration-200
                          "
                        >
                          <svg
                            width="14"
                            height="14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />

                            <circle
                              cx="12"
                              cy="12"
                              r="3"
                            />
                          </svg>
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() =>
                            handleDelete(member._id)
                          }
                          className="
                            w-8 h-8 rounded-lg
                            bg-white/5 hover:bg-red-500/10
                            text-gray-500 hover:text-red-400
                            flex items-center justify-center
                            transition-all duration-200
                          "
                        >
                          <svg
                            width="14"
                            height="14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <polyline points="3 6 5 6 21 6" />

                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />

                            <path d="M10 11v6M14 11v6" />

                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
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

      {/* MEMBER DETAIL MODAL */}
      {showModal && selected && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* Modal header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bebas text-xl tracking-wider text-white">
                MEMBER DETAILS
              </h3>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="text-gray-500 hover:text-white transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <line
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                  />

                  <line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                  />
                </svg>
              </button>
            </div>

            {/* Member info */}
            <div className="flex items-center gap-4 mb-6 p-4 bg-[#0d0d0d] rounded-xl">
              <div
                className="
                w-14 h-14 rounded-full
                bg-red-600/20 border-2 border-red-600/30
                flex items-center justify-center
                text-red-600 font-bebas text-2xl
              "
              >
                {selected.userId?.name
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <div className="text-white font-medium">
                  {selected.userId?.name}
                </div>

                <div className="text-gray-500 text-sm">
                  {selected.userId?.email}
                </div>

                <div className="text-gray-600 text-xs mt-0.5">
                  {selected.userId?.phone ||
                    'No phone'}
                </div>
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                {
                  label: 'Plan',
                  value:
                    selected.planId?.name ||
                    'No Plan',
                },
                {
                  label: 'Status',
                  value:
                    selected.membershipStatus,
                },
                {
                  label: 'Start Date',
                  value:
                    selected.membershipStart ||
                    '—',
                },
                {
                  label: 'End Date',
                  value:
                    selected.membershipEnd ||
                    '—',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[#0d0d0d] rounded-lg p-3"
                >
                  <div className="text-gray-600 text-xs tracking-wider uppercase mb-1">
                    {item.label}
                  </div>

                  <div className="text-white text-sm capitalize">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Date Inputs */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <div className="text-gray-500 text-xs tracking-wider uppercase mb-2">
                  Start Date
                </div>

                <input
                  type="date"
                  value={membershipStart}
                  onChange={(e) =>
                    setMembershipStart(
                      e.target.value,
                    )
                  }
                  className="
                    w-full bg-[#0d0d0d]
                    border border-white/10
                    rounded-lg px-3 py-2.5
                    text-gray-400 text-sm
                    focus:outline-none focus:border-red-600
                  "
                />
              </div>

              <div>
                <div className="text-gray-500 text-xs tracking-wider uppercase mb-2">
                  End Date
                </div>

                <input
                  type="date"
                  value={membershipEnd}
                  onChange={(e) =>
                    setMembershipEnd(
                      e.target.value,
                    )
                  }
                  className="
                    w-full bg-[#0d0d0d]
                    border border-white/10
                    rounded-lg px-3 py-2.5
                    text-gray-400 text-sm
                    focus:outline-none focus:border-red-600
                  "
                />
              </div>
            </div>

            {/* Assign Plan */}
            <div className="mb-5">
              <div className="text-gray-500 text-xs tracking-wider uppercase mb-2">
                Assign Plan
              </div>

              <div className="flex gap-2">
                <select
                  value={selectedPlan}
                  onChange={(e) =>
                    setSelectedPlan(
                      e.target.value,
                    )
                  }
                  className="
                    flex-1 bg-[#0d0d0d] border border-white/10
                    rounded-lg px-3 py-2.5
                    text-gray-400 text-sm
                    focus:outline-none focus:border-red-600
                    transition-colors duration-300
                  "
                >
                  <option value="">
                    Plan select karo...
                  </option>

                  {plans.map((p) => (
                    <option
                      key={p._id}
                      value={p._id}
                      className="bg-[#111]"
                    >
                      {p.name} — ₹{p.price} (
                      {p.duration} month)
                    </option>
                  ))}
                </select>

                <button
                  onClick={() =>
                    handleAssignPlan(
                      selected._id,
                    )
                  }
                  disabled={assigning}
                  className="
                    px-4 py-2.5 text-xs tracking-wider uppercase
                    bg-red-600 hover:bg-red-700
                    text-white rounded-lg
                    transition-all duration-200
                    disabled:opacity-50
                  "
                >
                  {assigning
                    ? '...'
                    : 'Assign'}
                </button>
              </div>
            </div>

            {/* Update Status */}
            <div>
              <div className="text-gray-500 text-xs tracking-wider uppercase mb-2">
                Update Status
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  'active',
                  'nonActive',
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() =>
                      handleStatusUpdate(
                        selected._id,
                        s,
                      )
                    }
                    className={`
                      py-2 rounded-lg text-xs tracking-wider uppercase
                      border transition-all duration-200 capitalize
                      ${
                        selected.membershipStatus ===
                        s
                          ? 'bg-red-600 border-red-600 text-white'
                          : 'border-white/10 text-gray-500 hover:border-red-600/50 hover:text-red-600'
                      }
                    `}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MembersTable


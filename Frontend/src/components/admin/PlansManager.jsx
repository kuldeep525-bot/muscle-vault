// import { useState, useEffect } from 'react'
// import API from '../../utils/api'
// import toast from 'react-hot-toast'

// const defaultForm = {
//   name: '',
//   duration: '',
//   price: '',
//   description: '',
//   features: '',
//   isPopular: false,
//   isActive: true,
// }

// const PlansManager = () => {
//   const [plans, setPlans]       = useState([])
//   const [loading, setLoading]   = useState(true)
//   const [showModal, setShowModal] = useState(false)
//   const [editingPlan, setEditingPlan] = useState(null)
//   const [form, setForm]         = useState(defaultForm)
//   const [saving, setSaving]     = useState(false)

//   // Fetch plans
//   const fetchPlans = async () => {
//     try {
//       setLoading(true)
//       const { data } = await API.get('/plan/getAll')
//       setPlans(data.plan)
//     } catch {
//       toast.error('Plans load nahi hue!')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchPlans()
//   }, [])

//   // Open modal for add
//   const handleAdd = () => {
//     setEditingPlan(null)
//     setForm(defaultForm)
//     setShowModal(true)
//   }

//   // Open modal for edit
//   const handleEdit = (plan) => {
//     setEditingPlan(plan)
//     setForm({
//       name:        plan.name,
//       duration:    plan.duration,
//       price:       plan.price,
//       description: plan.description || '',
//       features:    plan.features?.join('\n') || '',
//       isPopular:   plan.isPopular,
//       isActive:    plan.isActive,
//     })
//     setShowModal(true)
//   }

//   // Save plan
//   const handleSave = async (e) => {
//     e.preventDefault()
//     if (!form.name || !form.duration || !form.price) {
//       toast.error('Name, duration aur price required hain!')
//       return
//     }
//     try {
//       setSaving(true)
//       const payload = {
//         ...form,
//         duration: Number(form.duration),
//         price:    Number(form.price),
//         features: form.features
//           .split('\n')
//           .map(f => f.trim())
//           .filter(f => f),
//       }
//       if (editingPlan) {
//         await API.put(`/plan/updatePlan/${editingPlan._id}`, payload)
//         toast.success('Plan updated!')
//       } else {
//         await API.put(`/plan/updatePlan/${editingPlan._id}`, payload)
//         toast.success('Plan created!')
//       }
//       setShowModal(false)
//       fetchPlans()
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Save nahi hua!')
//     } finally {
//       setSaving(false)
//     }
//   }

//   // Delete plan
//   const handleDelete = async (id) => {
//     if (!window.confirm('Yeh plan delete karna chahte ho?')) return
//     try {
//        await API.delete(`/plan/deletePlan/${id}`)
//       toast.success('Plan deleted!')
//       fetchPlans()
//     } catch {
//       toast.error('Delete nahi hua!')
//     }
//   }

//   return (
//     <div>

//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="font-bebas text-2xl tracking-wider text-white">
//             MEMBERSHIP PLANS
//           </h2>
//           <p className="text-gray-500 text-xs mt-0.5">
//             {plans.length} plans total
//           </p>
//         </div>
//         <button
//           onClick={handleAdd}
//           className="
//             flex items-center gap-2
//             px-5 py-2.5
//             bg-orange-500 hover:bg-orange-600
//             text-white text-xs tracking-widest uppercase font-medium
//             rounded-lg transition-all duration-300
//           "
//         >
//           <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//             <line x1="12" y1="5" x2="12" y2="19"/>
//             <line x1="5" y1="12" x2="19" y2="12"/>
//           </svg>
//           Add Plan
//         </button>
//       </div>

//       {/* PLANS GRID */}
//       {loading ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="bg-[#111] border border-white/5 rounded-xl p-6 animate-pulse">
//               <div className="h-5 bg-white/5 rounded w-1/2 mb-4"/>
//               <div className="h-10 bg-white/5 rounded w-1/3 mb-4"/>
//               <div className="space-y-2">
//                 {[...Array(4)].map((_, j) => (
//                   <div key={j} className="h-3 bg-white/5 rounded"/>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : plans.length === 0 ? (
//         <div className="
//           bg-[#111] border border-white/5 rounded-xl
//           p-16 text-center
//         ">
//           <div className="text-4xl mb-3">💰</div>
//           <div className="text-gray-500 text-sm">Koi plan nahi hai abhi</div>
//           <button
//             onClick={handleAdd}
//             className="
//               mt-4 px-6 py-2.5
//               border border-orange-500 text-orange-500
//               hover:bg-orange-500 hover:text-white
//               text-xs tracking-widest uppercase rounded-lg
//               transition-all duration-300
//             "
//           >
//             Pehla Plan Banao
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {plans.map((plan) => (
//             <div
//               key={plan._id}
//               className={`
//                 bg-[#111] rounded-xl border p-6
//                 transition-all duration-300
//                 hover:-translate-y-0.5
//                 ${plan.isPopular
//                   ? 'border-orange-500/40'
//                   : 'border-white/5 hover:border-white/10'
//                 }
//                 ${!plan.isActive ? 'opacity-50' : ''}
//               `}
//             >
//               {/* Top badges */}
//               <div className="flex items-center gap-2 mb-4">
//                 {plan.isPopular && (
//                   <span className="text-xs px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
//                     ⭐ Popular
//                   </span>
//                 )}
//                 <span className={`
//                   text-xs px-2.5 py-1 rounded-full border
//                   ${plan.isActive
//                     ? 'bg-green-500/10 text-green-400 border-green-500/20'
//                     : 'bg-gray-500/10 text-gray-500 border-gray-500/20'
//                   }
//                 `}>
//                   {plan.isActive ? 'Active' : 'Inactive'}
//                 </span>
//               </div>

//               {/* Name */}
//               <h3 className="font-bebas text-2xl tracking-wider text-white mb-1">
//                 {plan.name}
//               </h3>
//               <div className="text-gray-500 text-xs mb-4">
//                 {plan.duration} month{plan.duration > 1 ? 's' : ''} plan
//               </div>

//               {/* Price */}
//               <div className="flex items-end gap-1 mb-4">
//                 <span className="text-gray-500">₹</span>
//                 <span className="font-bebas text-4xl text-orange-500 leading-none tracking-wider">
//                   {plan.price?.toLocaleString()}
//                 </span>
//               </div>

//               {/* Features */}
//               <ul className="flex flex-col gap-2 mb-6">
//                 {plan.features?.slice(0, 4).map((f, i) => (
//                   <li key={i} className="flex items-center gap-2 text-gray-500 text-xs">
//                     <div className="w-4 h-4 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
//                       <svg width="8" height="8" fill="none" stroke="#ff6b00" strokeWidth="2.5" viewBox="0 0 24 24">
//                         <polyline points="20 6 9 17 4 12"/>
//                       </svg>
//                     </div>
//                     {f}
//                   </li>
//                 ))}
//                 {plan.features?.length > 4 && (
//                   <li className="text-gray-700 text-xs pl-6">
//                     +{plan.features.length - 4} more features
//                   </li>
//                 )}
//               </ul>

//               {/* Actions */}
//               <div className="flex gap-2 border-t border-white/5 pt-4">
//                 <button
//                   onClick={() => handleEdit(plan)}
//                   className="
//                     flex-1 py-2 text-xs tracking-wider uppercase
//                     border border-white/10 text-gray-400
//                     hover:border-orange-500 hover:text-orange-500
//                     rounded-lg transition-all duration-200
//                     flex items-center justify-center gap-2
//                   "
//                 >
//                   <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                     <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
//                     <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
//                   </svg>
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(plan._id)}
//                   className="
//                     w-9 h-9 rounded-lg
//                     border border-white/10 text-gray-500
//                     hover:border-red-500/30 hover:text-red-400
//                     flex items-center justify-center
//                     transition-all duration-200
//                   "
//                 >
//                   <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                     <polyline points="3 6 5 6 21 6"/>
//                     <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
//                     <path d="M10 11v6M14 11v6"/>
//                     <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
//                   </svg>
//                 </button>
//               </div>

//             </div>
//           ))}
//         </div>
//       )}

//       {/* ADD/EDIT MODAL */}
//       {showModal && (
//         <div
//           className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
//           onClick={() => setShowModal(false)}
//         >
//           <div
//             className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >

//             {/* Modal header */}
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="font-bebas text-xl tracking-wider text-white">
//                 {editingPlan ? 'EDIT PLAN' : 'ADD NEW PLAN'}
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

//             {/* Form */}
//             <form onSubmit={handleSave} className="flex flex-col gap-4">

//               {/* Name */}
//               <div>
//                 <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
//                   Plan Name *
//                 </label>
//                 <input
//                   type="text"
//                   value={form.name}
//                   onChange={(e) => setForm({ ...form, name: e.target.value })}
//                   placeholder="e.g. STARTER, PRO, ELITE"
//                   className="
//                     w-full bg-[#0d0d0d] border border-white/10
//                     rounded-lg px-4 py-3 text-white text-sm
//                     placeholder-gray-600
//                     focus:outline-none focus:border-orange-500
//                     transition-colors duration-300
//                   "
//                 />
//               </div>

//               {/* Duration + Price */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
//                     Duration (months) *
//                   </label>
//                   <input
//                     type="number"
//                     value={form.duration}
//                     onChange={(e) => setForm({ ...form, duration: e.target.value })}
//                     placeholder="1"
//                     min="1"
//                     className="
//                       w-full bg-[#0d0d0d] border border-white/10
//                       rounded-lg px-4 py-3 text-white text-sm
//                       placeholder-gray-600
//                       focus:outline-none focus:border-orange-500
//                       transition-colors duration-300
//                     "
//                   />
//                 </div>
//                 <div>
//                   <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
//                     Price (₹) *
//                   </label>
//                   <input
//                     type="number"
//                     value={form.price}
//                     onChange={(e) => setForm({ ...form, price: e.target.value })}
//                     placeholder="999"
//                     min="0"
//                     className="
//                       w-full bg-[#0d0d0d] border border-white/10
//                       rounded-lg px-4 py-3 text-white text-sm
//                       placeholder-gray-600
//                       focus:outline-none focus:border-orange-500
//                       transition-colors duration-300
//                     "
//                   />
//                 </div>
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
//                   Description
//                 </label>
//                 <input
//                   type="text"
//                   value={form.description}
//                   onChange={(e) => setForm({ ...form, description: e.target.value })}
//                   placeholder="Plan ka short description"
//                   className="
//                     w-full bg-[#0d0d0d] border border-white/10
//                     rounded-lg px-4 py-3 text-white text-sm
//                     placeholder-gray-600
//                     focus:outline-none focus:border-orange-500
//                     transition-colors duration-300
//                   "
//                 />
//               </div>

//               {/* Features */}
//               <div>
//                 <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
//                   Features (ek line mein ek feature)
//                 </label>
//                 <textarea
//                   value={form.features}
//                   onChange={(e) => setForm({ ...form, features: e.target.value })}
//                   rows={5}
//                   placeholder={`Gym Access (6AM-10PM)\nPersonal Trainer\nDiet Plan\nLocker Room`}
//                   className="
//                     w-full bg-[#0d0d0d] border border-white/10
//                     rounded-lg px-4 py-3 text-white text-sm
//                     placeholder-gray-600
//                     focus:outline-none focus:border-orange-500
//                     transition-colors duration-300
//                     resize-none
//                   "
//                 />
//               </div>

//               {/* Toggles */}
//               <div className="flex gap-6">
//                 {/* Is Popular */}
//                 <label className="flex items-center gap-3 cursor-pointer">
//                   <div
//                     onClick={() => setForm({ ...form, isPopular: !form.isPopular })}
//                     className={`
//                       w-11 h-6 rounded-full relative
//                       transition-colors duration-300 cursor-pointer
//                       ${form.isPopular ? 'bg-orange-500' : 'bg-white/10'}
//                     `}
//                   >
//                     <div className={`
//                       absolute top-1 w-4 h-4 rounded-full bg-white
//                       transition-all duration-300
//                       ${form.isPopular ? 'left-6' : 'left-1'}
//                     `}/>
//                   </div>
//                   <span className="text-gray-400 text-sm">Popular</span>
//                 </label>

//                 {/* Is Active */}
//                 <label className="flex items-center gap-3 cursor-pointer">
//                   <div
//                     onClick={() => setForm({ ...form, isActive: !form.isActive })}
//                     className={`
//                       w-11 h-6 rounded-full relative
//                       transition-colors duration-300 cursor-pointer
//                       ${form.isActive ? 'bg-green-500' : 'bg-white/10'}
//                     `}
//                   >
//                     <div className={`
//                       absolute top-1 w-4 h-4 rounded-full bg-white
//                       transition-all duration-300
//                       ${form.isActive ? 'left-6' : 'left-1'}
//                     `}/>
//                   </div>
//                   <span className="text-gray-400 text-sm">Active</span>
//                 </label>
//               </div>

//               {/* Save button */}
//               <button
//                 type="submit"
//                 disabled={saving}
//                 className="
//                   w-full py-3.5 mt-2
//                   bg-orange-500 hover:bg-orange-600
//                   disabled:opacity-50 disabled:cursor-not-allowed
//                   text-white text-xs tracking-widest uppercase font-medium
//                   rounded-lg transition-all duration-300
//                   flex items-center justify-center gap-2
//                 "
//               >
//                 {saving ? (
//                   <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
//                   </svg>
//                 ) : (
//                   <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                     <polyline points="20 6 9 17 4 12"/>
//                   </svg>
//                 )}
//                 {editingPlan ? 'Update Plan' : 'Create Plan'}
//               </button>

//             </form>
//           </div>
//         </div>
//       )}

//     </div>
//   )
// }

// export default PlansManager


import { useState, useEffect } from 'react'
import API from '../../utils/api'
import toast from 'react-hot-toast'

const defaultForm = {
  name: '',
  duration: '',
  price: '',
  isActive: true,
}

const PlansManager = () => {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPlan, setEditingPlan] = useState(null)
  const [form, setForm] = useState(defaultForm)
  const [saving, setSaving] = useState(false)

  // Fetch plans
  const fetchPlans = async () => {
    try {
      setLoading(true)
      const { data } = await API.get('/plan/getAll')
      setPlans(data.plan)
    } catch {
      toast.error('Plans load nahi hue!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  // Open modal for add
  const handleAdd = () => {
    setEditingPlan(null)
    setForm(defaultForm)
    setShowModal(true)
  }

  // Open modal for edit
  const handleEdit = (plan) => {
    setEditingPlan(plan)

    setForm({
      name: plan.name,
      duration: plan.duration,
      price: plan.price,
      isActive: plan.isActive,
    })

    setShowModal(true)
  }

  // Save plan
  const handleSave = async (e) => {
    e.preventDefault()

    if (!form.name || !form.duration || !form.price) {
      toast.error('Name, duration aur price required hain!')
      return
    }

    try {
      setSaving(true)

      const payload = {
        ...form,
        duration: Number(form.duration),
        price: Number(form.price),
      }

      if (editingPlan) {
        await API.put(`/plan/updatePlan/${editingPlan._id}`, payload)
        toast.success('Plan updated!')
      } else {
        await API.post('/plan/createPlan', payload)
        toast.success('Plan created!')
      }

      setShowModal(false)
      fetchPlans()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save nahi hua!')
    } finally {
      setSaving(false)
    }
  }

  // Delete plan
  const handleDelete = async (id) => {
    if (!window.confirm('Yeh plan delete karna chahte ho?')) return

    try {
      await API.delete(`/plan/deletePlan/${id}`)
      toast.success('Plan deleted!')
      fetchPlans()
    } catch {
      toast.error('Delete nahi hua!')
    }
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bebas text-2xl tracking-wider text-white">
            MEMBERSHIP PLANS
          </h2>

          <p className="text-gray-500 text-xs mt-0.5">
            {plans.length} plans total
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="
            flex items-center gap-2
            px-5 py-2.5
            bg-orange-500 hover:bg-orange-600
            text-white text-xs tracking-widest uppercase font-medium
            rounded-lg transition-all duration-300
          "
        >
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>

          Add Plan
        </button>
      </div>

      {/* PLANS GRID */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-[#111] border border-white/5 rounded-xl p-6 animate-pulse"
            >
              <div className="h-5 bg-white/5 rounded w-1/2 mb-4" />

              <div className="h-10 bg-white/5 rounded w-1/3 mb-4" />

              <div className="space-y-2">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-3 bg-white/5 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : plans.length === 0 ? (
        <div
          className="
          bg-[#111] border border-white/5 rounded-xl
          p-16 text-center
        "
        >
          <div className="text-4xl mb-3">💰</div>

          <div className="text-gray-500 text-sm">
            Koi plan nahi hai abhi
          </div>

          <button
            onClick={handleAdd}
            className="
              mt-4 px-6 py-2.5
              border border-orange-500 text-orange-500
              hover:bg-orange-500 hover:text-white
              text-xs tracking-widest uppercase rounded-lg
              transition-all duration-300
            "
          >
            Pehla Plan Banao
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className={`
                bg-[#111] rounded-xl border p-6
                transition-all duration-300
                hover:-translate-y-0.5
                border-white/5 hover:border-white/10
                ${!plan.isActive ? 'opacity-50' : ''}
              `}
            >
              {/* Top badges */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`
                  text-xs px-2.5 py-1 rounded-full border
                  ${
                    plan.isActive
                      ? 'bg-green-500/10 text-green-400 border-green-500/20'
                      : 'bg-gray-500/10 text-gray-500 border-gray-500/20'
                  }
                `}
                >
                  {plan.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-bebas text-2xl tracking-wider text-white mb-1">
                {plan.name}
              </h3>

              <div className="text-gray-500 text-xs mb-4">
                {plan.duration} month
                {plan.duration > 1 ? 's' : ''} plan
              </div>

              {/* Price */}
              <div className="flex items-end gap-1 mb-6">
                <span className="text-gray-500">₹</span>

                <span className="font-bebas text-4xl text-orange-500 leading-none tracking-wider">
                  {plan.price?.toLocaleString()}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 border-t border-white/5 pt-4">
                <button
                  onClick={() => handleEdit(plan)}
                  className="
                    flex-1 py-2 text-xs tracking-wider uppercase
                    border border-white/10 text-gray-400
                    hover:border-orange-500 hover:text-orange-500
                    rounded-lg transition-all duration-200
                    flex items-center justify-center gap-2
                  "
                >
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />

                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>

                  Edit
                </button>

                <button
                  onClick={() => handleDelete(plan._id)}
                  className="
                    w-9 h-9 rounded-lg
                    border border-white/10 text-gray-500
                    hover:border-red-500/30 hover:text-red-400
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
            </div>
          ))}
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      {showModal && (
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
                {editingPlan ? 'EDIT PLAN' : 'ADD NEW PLAN'}
              </h3>

              <button
                onClick={() => setShowModal(false)}
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
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              {/* Name */}
              <div>
                <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                  Plan Name *
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="e.g. STARTER, PRO, ELITE"
                  className="
                    w-full bg-[#0d0d0d] border border-white/10
                    rounded-lg px-4 py-3 text-white text-sm
                    placeholder-gray-600
                    focus:outline-none focus:border-orange-500
                    transition-colors duration-300
                  "
                />
              </div>

              {/* Duration + Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                    Duration (months) *
                  </label>

                  <input
                    type="number"
                    value={form.duration}
                    onChange={(e) =>
                      setForm({ ...form, duration: e.target.value })
                    }
                    placeholder="1"
                    min="1"
                    className="
                      w-full bg-[#0d0d0d] border border-white/10
                      rounded-lg px-4 py-3 text-white text-sm
                      placeholder-gray-600
                      focus:outline-none focus:border-orange-500
                      transition-colors duration-300
                    "
                  />
                </div>

                <div>
                  <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                    Price (₹) *
                  </label>

                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    placeholder="999"
                    min="0"
                    className="
                      w-full bg-[#0d0d0d] border border-white/10
                      rounded-lg px-4 py-3 text-white text-sm
                      placeholder-gray-600
                      focus:outline-none focus:border-orange-500
                      transition-colors duration-300
                    "
                  />
                </div>
              </div>

              {/* Active Toggle */}
              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() =>
                      setForm({
                        ...form,
                        isActive: !form.isActive,
                      })
                    }
                    className={`
                      w-11 h-6 rounded-full relative
                      transition-colors duration-300 cursor-pointer
                      ${form.isActive ? 'bg-green-500' : 'bg-white/10'}
                    `}
                  >
                    <div
                      className={`
                      absolute top-1 w-4 h-4 rounded-full bg-white
                      transition-all duration-300
                      ${form.isActive ? 'left-6' : 'left-1'}
                    `}
                    />
                  </div>

                  <span className="text-gray-400 text-sm">
                    Active
                  </span>
                </label>
              </div>

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
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                ) : (
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}

                {editingPlan ? 'Update Plan' : 'Create Plan'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlansManager
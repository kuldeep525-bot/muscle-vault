

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../utils/api'

const Plans = () => {
  const [plans, setPlans] = useState([])
  const [hoveredPlan, setHoveredPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data } = await API.get('/plan/getAll')
        setPlans(data.plan || [])
      } catch {
        console.log('Plans load nahi hue')
      } finally {
        setLoading(false)
      }
    }
    fetchPlans()
  }, [])

    const handleGetStarted = () => {
    if (isLoggedIn) {
      // Pehle se logged in hai — contact pe bhejo
      navigate('/#contact')
    } else {
      // Login nahi hai — signup pe bhejo
      navigate('/signup')
    }
  }

  if (loading) return (
    <section id="plans" className="section-padding bg-[#0d0d0d]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-[#111] border border-white/5 rounded-xl p-7 animate-pulse">
              <div className="h-6 bg-white/5 rounded w-1/2 mb-4"/>
              <div className="h-12 bg-white/5 rounded w-1/3 mb-6"/>
              <div className="space-y-3">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="h-4 bg-white/5 rounded"/>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  return (
    <section id="plans" className="section-padding bg-[#0d0d0d] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-red-600/5 blur-[120px]"/>

      <div className="container-custom relative z-10">

        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-red-600"/>
            <span className="text-xs tracking-[4px] uppercase text-red-600 font-medium">
              Membership
            </span>
            <div className="w-8 h-0.5 bg-red-600"/>
          </div>
          <h2 className="font-bebas text-5xl lg:text-6xl tracking-wider text-white leading-none">
            CHOOSE YOUR <span className="text-gradient">PLAN</span>
          </h2>
          <p className="text-gray-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            Har budget aur goal ke liye plan available hai.
            Koi hidden charges nahi — jo dikhta hai wahi dena hai.
          </p>
        </div>

        {/* PLANS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, index) => (
            <div
              key={plan._id}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`
                relative rounded-xl border
                transition-all duration-300
                ${plan.isPopular
                  ? 'bg-[#111] border-red-600 shadow-lg shadow-red-600/10 scale-105'
                  : 'bg-[#111] border-white/5 hover:border-red-600/30'
                }
                ${hoveredPlan === index && !plan.isPopular ? '-translate-y-1' : ''}
              `}
            >
              {plan.isPopular && (
                <div className="
                  absolute -top-4 left-1/2 -translate-x-1/2
                  bg-red-600 text-white
                  text-xs tracking-widest uppercase font-medium
                  px-6 py-1.5 rounded-full whitespace-nowrap
                ">
                  ⭐ Most Popular
                </div>
              )}

              <div className="p-7">
                <div className="mb-5">
                  <h3 className="font-bebas text-2xl tracking-widest text-white">
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">
                    {plan.duration} month{plan.duration > 1 ? 's' : ''} plan
                  </p>
                </div>

                <div className="flex items-end gap-1 mb-1">
                  <span className="text-gray-500 text-lg">₹</span>
                  <span className="font-bebas text-5xl text-red-600 leading-none tracking-wider">
                    {plan.price?.toLocaleString()}
                  </span>
                </div>
                <div className="text-gray-600 text-xs tracking-wider uppercase mb-6">
                  {plan.duration} Month Plan
                </div>

                <div className="border-t border-white/5 mb-6"/>

                <button
                  onClick={() => navigate('/signup')}
                  className={`
                    w-full py-3.5
                    text-xs tracking-widest uppercase font-medium
                    rounded transition-all duration-300
                    ${plan.isPopular
                      ? 'bg-red-600 hover:bg-red-700 text-white hover:shadow-lg hover:shadow-red-600/25'
                      : 'border border-white/10 text-gray-400 hover:border-red-600 hover:text-red-600'
                    }
                  `}
                >
                  Get Started
                </button>

                

              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 text-xs tracking-wider mt-8">
          * Questions? <a href="/#contact" className="text-red-600 hover:underline">Contact us</a>
        </p>

      </div>
    </section>
  )
}

export default Plans


// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import API from '../../utils/api'
// import useAuth from '../../hooks/useAuth'

// const Plans = () => {
//   const [plans, setPlans] = useState([])
//   const [hoveredPlan, setHoveredPlan] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const navigate = useNavigate()
//   const { isLoggedIn } = useAuth()

//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const { data } = await API.get('/plan/getAll')
//         setPlans(data.plan || [])
//       } catch {
//         console.log('Plans load nahi hue')
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchPlans()
//   }, [])

//   const handleGetStarted = () => {
//     if (isLoggedIn) {
//       navigate('/#contact')
//     } else {
//       navigate('/signup')
//     }
//   }

//   if (loading) return (
//     <section id="plans" className="section-padding bg-[#0d0d0d]">
//       <div className="container-custom">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="bg-[#111] border border-white/5 rounded-xl p-7 animate-pulse">
//               <div className="h-6 bg-white/5 rounded w-1/2 mb-4"/>
//               <div className="h-12 bg-white/5 rounded w-1/3 mb-6"/>
//               <div className="space-y-3">
//                 {[...Array(5)].map((_, j) => (
//                   <div key={j} className="h-4 bg-white/5 rounded"/>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )

//   return (
//     <section id="plans" className="section-padding bg-[#0d0d0d] relative overflow-hidden">
//       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-red-600/5 blur-[120px]"/>

//       <div className="container-custom relative z-10">

//         {/* SECTION HEADER */}
//         <div className="text-center mb-16">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="w-8 h-0.5 bg-red-600"/>
//             <span className="text-xs tracking-[4px] uppercase text-red-600 font-medium">
//               Membership
//             </span>
//             <div className="w-8 h-0.5 bg-red-600"/>
//           </div>
//           <h2 className="font-bebas text-5xl lg:text-6xl tracking-wider text-white leading-none">
//             CHOOSE YOUR <span className="text-gradient">PLAN</span>
//           </h2>
//           <p className="text-gray-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
//             Har budget aur goal ke liye plan available hai.
//             Koi hidden charges nahi — jo dikhta hai wahi dena hai.
//           </p>
//         </div>

//         {/* PLANS GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
//           {plans.map((plan, index) => (
//             <div
//               key={plan._id}
//               onMouseEnter={() => setHoveredPlan(index)}
//               onMouseLeave={() => setHoveredPlan(null)}
//               className={`
//                 relative rounded-xl border
//                 transition-all duration-300
//                 ${plan.isPopular
//                   ? 'bg-[#111] border-red-600 shadow-lg shadow-red-600/10 scale-105'
//                   : 'bg-[#111] border-white/5 hover:border-red-600/30'
//                 }
//                 ${hoveredPlan === index && !plan.isPopular ? '-translate-y-1' : ''}
//               `}
//             >
//               {plan.isPopular && (
//                 <div className="
//                   absolute -top-4 left-1/2 -translate-x-1/2
//                   bg-red-600 text-white
//                   text-xs tracking-widest uppercase font-medium
//                   px-6 py-1.5 rounded-full whitespace-nowrap
//                 ">
//                   ⭐ Most Popular
//                 </div>
//               )}

//               <div className="p-7">
//                 <div className="mb-5">
//                   <h3 className="font-bebas text-2xl tracking-widest text-white">
//                     {plan.name}
//                   </h3>
//                   <p className="text-gray-500 text-xs mt-1">
//                     {plan.duration} month{plan.duration > 1 ? 's' : ''} plan
//                   </p>
//                 </div>

//                 <div className="flex items-end gap-1 mb-1">
//                   <span className="text-gray-500 text-lg">₹</span>
//                   <span className="font-bebas text-5xl text-red-600 leading-none tracking-wider">
//                     {plan.price?.toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="text-gray-600 text-xs tracking-wider uppercase mb-6">
//                   {plan.duration} Month Plan
//                 </div>

//                 <div className="border-t border-white/5 mb-6"/>

//                 {/* ✅ Bug fix — navigate + handleGetStarted */}
//                 <button
//                   onClick={handleGetStarted}
//                   className={`
//                     w-full py-3.5
//                     text-xs tracking-widest uppercase font-medium
//                     rounded transition-all duration-300
//                     ${plan.isPopular
//                       ? 'bg-red-600 hover:bg-red-700 text-white hover:shadow-lg hover:shadow-red-600/25'
//                       : 'border border-white/10 text-gray-400 hover:border-red-600 hover:text-red-600'
//                     }
//                   `}
//                 >
//                   {isLoggedIn ? 'Contact Us' : 'Get Started'}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <p className="text-center text-gray-600 text-xs tracking-wider mt-8">
//           * Questions? <a href="/#contact" className="text-red-600 hover:underline">Contact us</a>
//         </p>

//       </div>
//     </section>
//   )
// }

// export default Plans

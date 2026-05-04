// import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

// const Hero = () => {
//   const [loaded, setLoaded] = useState(false)

//   // Animation ke liye — page load hone ke baad
//   useEffect(() => {
//     setTimeout(() => setLoaded(true), 100)
//   }, [])

//   return (
//     <section
//       id="home"
//       className="relative min-h-screen flex items-center overflow-hidden"
//     >

//       {/* ============================================
//           BACKGROUND — Dark gradient + grid pattern
//       ============================================ */}
//       <div className="absolute inset-0 z-0">

//         {/* Grid pattern */}
//         <div className="absolute inset-0 opacity-[0.03]"
//           style={{
//             backgroundImage: `
//               linear-gradient(#ff6b00 1px, transparent 1px),
//               linear-gradient(90deg, #ff6b00 1px, transparent 1px)
//             `,
//             backgroundSize: '60px 60px'
//           }}
//         />

//         {/* Orange glow — right side */}
//         <div className="
//           absolute top-1/2 right-0 -translate-y-1/2
//           w-[600px] h-[600px] rounded-full
//           bg-orange-500/10 blur-[120px]
//         "/>

//         {/* Orange glow — left bottom */}
//         <div className="
//           absolute bottom-0 left-1/4
//           w-[300px] h-[300px] rounded-full
//           bg-orange-500/5 blur-[80px]
//         "/>

//       </div>

//       {/* ============================================
//           MAIN CONTENT
//       ============================================ */}
//       <div className="container-custom relative z-10 pt-24 pb-16">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

//           {/* LEFT SIDE — Text content */}
//           <div className={`
//             transition-all duration-700
//             ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
//           `}>

//             {/* Tag line */}
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-8 h-0.5 bg-orange-500"/>
//               <span className="
//                 text-xs tracking-[4px] uppercase
//                 text-orange-500 font-medium
//               ">
//                 Punjab's #1 Fitness Club
//               </span>
//             </div>

//             {/* Main heading */}
//             <h1 className="font-bebas leading-none mb-6">
//               <span className="
//                 block text-6xl sm:text-7xl lg:text-8xl
//                 text-white tracking-wider
//               ">
//                 FORGE YOUR
//               </span>
//               <span className="
//                 block text-6xl sm:text-7xl lg:text-8xl
//                 text-gradient tracking-wider
//               ">
//                 STRENGTH
//               </span>
//               <span className="
//                 block text-6xl sm:text-7xl lg:text-8xl
//                 text-white tracking-wider
//               ">
//                 HERE
//               </span>
//             </h1>

//             {/* Description */}
//             <p className="
//               text-gray-400 text-base sm:text-lg
//               leading-relaxed max-w-lg mb-8
//             ">
//               State-of-the-art equipment, elite trainers, aur ek community
//               built for champions. Tumhari transformation yahan se shuru hoti hai.
//             </p>

//             {/* BUTTONS */}
//             <div className="flex flex-wrap items-center gap-4 mb-12">
              
//                 href="/#plans"
//                 className="
//                   px-8 py-4 bg-orange-500 hover:bg-orange-600
//                   text-white text-xs tracking-widest uppercase font-medium
//                   rounded transition-all duration-300
//                   hover:shadow-lg hover:shadow-orange-500/25
//                 "
//               >
//                 Join Now
//               </a>
              
//                 href="/#about"
//                 className="
//                   px-8 py-4 border border-white/20
//                   hover:border-orange-500
//                   text-gray-400 hover:text-orange-500
//                   text-xs tracking-widest uppercase font-medium
//                   rounded transition-all duration-300
//                   flex items-center gap-2
//                 "
//               >
//                 Learn More
//                 <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                   <path d="M5 12h14M12 5l7 7-7 7"/>
//                 </svg>
//               </a>
//             </div>

//             {/* STATS */}
//             <div className="
//               grid grid-cols-3 gap-6
//               border-t border-white/5 pt-8
//             ">
//               {[
//                 { number: '500+', label: 'Members' },
//                 { number: '12+',  label: 'Trainers' },
//                 { number: '8',    label: 'Years' },
//               ].map((stat) => (
//                 <div key={stat.label}>
//                   <div className="
//                     font-bebas text-4xl text-orange-500
//                     tracking-wider
//                   ">
//                     {stat.number}
//                   </div>
//                   <div className="
//                     text-xs tracking-widest uppercase
//                     text-gray-500 mt-1
//                   ">
//                     {stat.label}
//                   </div>
//                 </div>
//               ))}
//             </div>

//           </div>

//           {/* RIGHT SIDE — Image box */}
//           <div className={`
//             relative hidden lg:block
//             transition-all duration-700 delay-300
//             ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
//           `}>

//             {/* Main image box */}
//             <div className="
//               relative rounded-lg overflow-hidden
//               border border-white/5
//               aspect-[4/5]
//             ">
//               <img
//                 src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80"
//                 alt="Gym"
//                 className="w-full h-full object-cover opacity-80"
//               />
//               {/* Overlay */}
//               <div className="
//                 absolute inset-0
//                 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent
//               "/>
//             </div>

//             {/* Floating card — top left */}
//             <div className="
//               absolute -left-6 top-12
//               bg-[#111] border border-white/10
//               rounded-lg p-4 backdrop-blur-sm
//             ">
//               <div className="flex items-center gap-3">
//                 <div className="
//                   w-10 h-10 rounded-full bg-orange-500/20
//                   flex items-center justify-center
//                 ">
//                   <svg width="18" height="18" fill="none" stroke="#ff6b00" strokeWidth="2" viewBox="0 0 24 24">
//                     <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
//                   </svg>
//                 </div>
//                 <div>
//                   <div className="text-white text-sm font-medium">Active Today</div>
//                   <div className="text-orange-500 text-xs">47 Members</div>
//                 </div>
//               </div>
//             </div>

//             {/* Floating card — bottom right */}
//             <div className="
//               absolute -right-6 bottom-16
//               bg-[#111] border border-white/10
//               rounded-lg p-4 backdrop-blur-sm
//             ">
//               <div className="text-xs text-gray-500 tracking-wider uppercase mb-1">
//                 Avg Rating
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="font-bebas text-2xl text-orange-500">4.9</span>
//                 <div className="flex gap-0.5">
//                   {[...Array(5)].map((_, i) => (
//                     <svg key={i} width="12" height="12" fill="#ff6b00" viewBox="0 0 24 24">
//                       <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//                     </svg>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Orange border accent */}
//             <div className="
//               absolute -bottom-3 -right-3
//               w-2/3 h-2/3 rounded-lg
//               border border-orange-500/20 -z-10
//             "/>

//           </div>

//         </div>
//       </div>

//       // {/* SCROLL INDICATOR */}
//       <div className="
//         absolute bottom-8 left-1/2 -translate-x-1/2
//         flex flex-col items-center gap-2
//         animate-bounce
//       ">
//         <span className="text-xs tracking-widest uppercase text-gray-600">
//           Scroll
//         </span>
//         <svg width="16" height="16" fill="none" stroke="#666" strokeWidth="2" viewBox="0 0 24 24">
//           <path d="M12 5v14M5 12l7 7 7-7"/>
//         </svg>
//       </div>

//     </section>
//   )
// }

// export default Hero


import { useEffect, useState } from 'react'

const Hero = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(#ff6b00 1px, transparent 1px),
              linear-gradient(90deg, #ff6b00 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[120px]"/>
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-orange-500/5 blur-[80px]"/>
      </div>

      {/* MAIN CONTENT */}
      <div className="container-custom relative z-10 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div className={`
            transition-all duration-700
            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}>

            {/* Tag line */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-orange-500"/>
              <span className="text-xs tracking-[4px] uppercase text-orange-500 font-medium">
                Punjab's #1 Fitness Club
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-bebas leading-none mb-6">
              <span className="block text-6xl sm:text-7xl lg:text-8xl text-white tracking-wider">
                FORGE YOUR
              </span>
              <span className="block text-6xl sm:text-7xl lg:text-8xl text-gradient tracking-wider">
                STRENGTH
              </span>
              <span className="block text-6xl sm:text-7xl lg:text-8xl text-white tracking-wider">
                HERE
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg mb-8">
              State-of-the-art equipment, elite trainers, aur ek community
              built for champions. Tumhari transformation yahan se shuru hoti hai.
            </p>

            {/* BUTTONS — BUG FIX: <a tag sahi kiya */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="/#plans"
                className="
                  px-8 py-4 bg-orange-500 hover:bg-orange-600
                  text-white text-xs tracking-widest uppercase font-medium
                  rounded transition-all duration-300
                  hover:shadow-lg hover:shadow-orange-500/25
                "
              >
                Join Now
              </a>
              <a
                href="/#about"
                className="
                  px-8 py-4 border border-white/20
                  hover:border-orange-500
                  text-gray-400 hover:text-orange-500
                  text-xs tracking-widest uppercase font-medium
                  rounded transition-all duration-300
                  flex items-center gap-2
                "
              >
                Learn More
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 border-t border-white/5 pt-8">
              {[
                { number: '500+', label: 'Members' },
                { number: '12+',  label: 'Trainers' },
                { number: '8',    label: 'Years' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-bebas text-4xl text-orange-500 tracking-wider">
                    {stat.number}
                  </div>
                  <div className="text-xs tracking-widest uppercase text-gray-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT SIDE — Image */}
          <div className={`
            relative hidden lg:block
            transition-all duration-700 delay-300
            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}>

            <div className="relative rounded-lg overflow-hidden border border-white/5 aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80"
                alt="Gym"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"/>
            </div>

            {/* Floating card — top left */}
            <div className="absolute -left-6 top-12 bg-[#111] border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <svg width="18" height="18" fill="none" stroke="#ff6b00" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Active Today</div>
                  <div className="text-orange-500 text-xs">47 Members</div>
                </div>
              </div>
            </div>

            {/* Floating card — bottom right */}
            <div className="absolute -right-6 bottom-16 bg-[#111] border border-white/10 rounded-lg p-4">
              <div className="text-xs text-gray-500 tracking-wider uppercase mb-1">Avg Rating</div>
              <div className="flex items-center gap-2">
                <span className="font-bebas text-2xl text-orange-500">4.9</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="12" height="12" fill="#ff6b00" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -bottom-3 -right-3 w-2/3 h-2/3 rounded-lg border border-orange-500/20 -z-10"/>

          </div>

        </div>
      </div>


      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs tracking-widest uppercase text-gray-600">Scroll</span>
        <svg width="16" height="16" fill="none" stroke="#666" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>

    </section>
  )
}

export default Hero
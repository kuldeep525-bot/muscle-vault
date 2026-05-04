const features = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#ff6b00" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    title: 'MODERN EQUIPMENT',
    desc: '100+ premium machines including cardio, strength, and functional training zones. Updated every 2 years.',
    stat: '100+',
    statLabel: 'Machines',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#ff6b00" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'EXPERT TRAINERS',
    desc: 'NSCA, ACE aur ISSA certified coaches jo tumhare specific goals ke liye personalized plans banate hain.',
    stat: '12+',
    statLabel: 'Trainers',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#ff6b00" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'SAFE ENVIRONMENT',
    desc: '24/7 CCTV surveillance, daily sanitized equipment aur trained staff jo tumhari safety ensure kare.',
    stat: '24/7',
    statLabel: 'Security',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#ff6b00" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'DIET & NUTRITION',
    desc: 'In-house nutritionist se free consultation aur customized diet plans jo tumhare fitness goals se match karein.',
    stat: 'Free',
    statLabel: 'Consultation',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#ff6b00" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'FLEXIBLE TIMINGS',
    desc: 'Mon-Sat 6AM se 10PM tak aur Sunday 7AM se 8PM. Apni schedule ke hisaab se aao.',
    stat: '16h',
    statLabel: 'Daily Open',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#ff6b00" strokeWidth="1.5" viewBox="0 0 24 24">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'PROGRESS TRACKING',
    desc: 'Monthly body assessments, progress photos aur detailed reports taaki tum apni growth clearly dekh sako.',
    stat: '100%',
    statLabel: 'Tracked',
  },
]

const Features = () => {
  return (
    <section id="features" className="section-padding bg-[#0a0a0a] relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-[120px]"/>

      <div className="container-custom relative z-10">

        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-orange-500"/>
            <span className="text-xs tracking-[4px] uppercase text-orange-500 font-medium">
              Why Choose Us
            </span>
            <div className="w-8 h-0.5 bg-orange-500"/>
          </div>
          <h2 className="font-bebas text-5xl lg:text-6xl tracking-wider text-white leading-none">
            WORLD CLASS <span className="text-gradient">FACILITIES</span>
          </h2>
          <p className="text-gray-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            Hamare paas sab kuch hai jo tumhari fitness journey ko successful banane ke liye chahiye.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                group relative
                bg-[#111] border border-white/5
                rounded-lg p-6
                hover:border-orange-500/30
                transition-all duration-300
                hover:-translate-y-1
                overflow-hidden
              "
            >
              {/* Hover glow */}
              <div className="
                absolute inset-0 opacity-0 group-hover:opacity-100
                transition-opacity duration-300
                bg-gradient-to-br from-orange-500/5 to-transparent
              "/>

              {/* Left orange border */}
              <div className="
                absolute left-0 top-0 bottom-0 w-0.5
                bg-gradient-to-b from-orange-500 to-transparent
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
              "/>

              {/* Top row — icon + stat */}
              <div className="flex items-start justify-between mb-5 relative z-10">

                {/* Icon box */}
                <div className="
                  w-14 h-14 rounded-lg
                  bg-orange-500/10
                  group-hover:bg-orange-500/20
                  flex items-center justify-center
                  transition-all duration-300
                ">
                  {feature.icon}
                </div>

                {/* Stat */}
                <div className="text-right">
                  <div className="font-bebas text-2xl text-orange-500 tracking-wider">
                    {feature.stat}
                  </div>
                  <div className="text-xs text-gray-600 tracking-wider uppercase">
                    {feature.statLabel}
                  </div>
                </div>

              </div>

              {/* Title */}
              <h3 className="
                font-bebas text-xl tracking-wider text-white
                mb-3 relative z-10
              ">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed relative z-10 group-hover:text-gray-400 transition-colors duration-300">
                {feature.desc}
              </p>

            </div>
          ))}
        </div>

        {/* BOTTOM STRIP */}
        <div className="
          mt-16 p-6 rounded-lg
          bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent
          border border-orange-500/20
          flex flex-col sm:flex-row items-center justify-between gap-4
        ">
          <div>
            <h3 className="font-bebas text-2xl tracking-wider text-white">
              FREE TRIAL CLASS AVAILABLE
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Pehle aao, dekho, phir decide karo — koi commitment nahi!
            </p>
          </div>
          <a
            href="/#contact"
            className="
              shrink-0 px-8 py-3
              bg-orange-500 hover:bg-orange-600
              text-white text-xs tracking-widest uppercase font-medium
              rounded transition-all duration-300
              hover:shadow-lg hover:shadow-orange-500/25
            "
          >
            Book Free Trial
          </a>
        </div>

      </div>

    </section>
  )
}

export default Features
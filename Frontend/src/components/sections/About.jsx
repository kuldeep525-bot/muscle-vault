const About = () => {
  return (
    <section id="about" className="section-padding bg-[#0d0d0d] relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-red-600/5 blur-[100px]"/>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE — Images */}
          <div className="relative">

            {/* Main image */}
            <div className="relative rounded-lg overflow-hidden aspect-[4/3] border border-white/5">
              <img
                src="/images/img6.jpeg"
                alt="Gym Interior"
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-transparent to-transparent"/>
            </div>

            {/* Small image — bottom right */}
            {/* <div className="
              absolute -bottom-8 -right-4
              w-48 h-48 rounded-lg overflow-hidden
              border-2 border-[#0d0d0d]
            ">
              <img
                // src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&q=80"
                alt="Training"
                className="w-full h-full object-cover opacity-80"
              />
            </div> */}

            {/* Experience badge */}
            {/* <div className="
              absolute -left-4 top-8
              bg-red-600 rounded-lg p-4
              flex flex-col items-center justify-center
              w-24 h-24
            ">
              <span className="font-bebas text-4xl text-white leading-none">8+</span>
              <span className="text-white text-xs tracking-wider text-center leading-tight mt-1">
                Years of Excellence
              </span>
            </div> */}

          </div>

          {/* RIGHT SIDE — Content */}
          <div className="lg:pl-8">

            {/* Section label */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-red-600"/>
              <span className="text-xs tracking-[4px] uppercase text-red-600 font-medium">
                About Us
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-bebas text-5xl lg:text-6xl tracking-wider text-white leading-none mb-6">
              MORE THAN JUST <br/>
              <span className="text-gradient">A GYM</span>
            </h2>

            {/* Description */}
        <p className="text-gray-400 text-base leading-relaxed mb-4">
  Muscle Vault is more than just a gym — it's a fitness community dedicated to
  helping people achieve their goals. Established in 2017, it has grown into
  one of Punjab's most trusted fitness centers. With world-class equipment and
  certified trainers, we are committed to delivering results that matter.
</p>

<p className="text-gray-500 text-sm leading-relaxed mb-8">
  Whether you're a beginner starting your fitness journey or an experienced
  athlete aiming for peak performance, we offer customized training programs
  for every level. From personalized nutrition plans to competition
  preparation, everything you need is available under one roof.
</p>

            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: '🏋️', text: '20+ Premium Machines' },
                { icon: '👨‍💼', text: 'Certified Expert Trainers' },
                { icon: '🥗', text: 'Diet & Nutrition Plans' },
                { icon: '🚿', text: 'Modern Plan' },
                { icon: '📱', text: 'Online Member Portal' },
                { icon: '🅿️', text: 'Free Parking Available' },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 group"
                >
                  <div className="
                    w-8 h-8 rounded bg-red-600/10
                    flex items-center justify-center
                    group-hover:bg-red-600/20
                    transition-all duration-300
                    shrink-0 text-sm
                  ">
                    {item.icon}
                  </div>
                  <span className="text-gray-400 text-sm group-hover:text-white transition-colors duration-300">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="/#plans"
              className="
                inline-flex items-center gap-3
                px-8 py-4 bg-red-600 hover:bg-Replace: red-700

                text-white text-xs tracking-widest uppercase font-medium
                rounded transition-all duration-300
                hover:shadow-lg hover:shadow-red-600/25
              "
            >
              Start Your Journey
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

          </div>
        </div>
      </div>

    </section>
  )
}

export default About

const trainers = [
  {
    name: 'RAJVEER SINGH',
    role: 'Head Trainer',
    specialty: 'Strength & Powerlifting',
    experience: '8 Years',
    certifications: ['NSCA Certified', 'Powerlifting Coach'],
    bio: 'Former national-level powerlifter dedicated to helping members achieve exceptional strength and performance results.',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&q=80',
    initials: 'RS',
    rating: 5,
    members: 45,
  },
  {
    name: 'PRIYA KAUR',
    role: 'Fitness Coach',
    specialty: 'Yoga & Functional Fitness',
    experience: '5 Years',
    certifications: ['ACE Certified', 'Yoga Alliance RYT'],
    bio: 'Focused on holistic fitness, combining strength, flexibility, and wellness to create lasting transformations.',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&q=80',
    initials: 'PK',
    rating: 5,
    members: 38,
  },
]
const Trainers = () => {
  return (
    <section id="trainers" className="section-padding bg-[#0a0a0a] relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-red-600/5 blur-[100px]"/>

      <div className="container-custom relative z-10">

        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-red-600"/>
            <span className="text-xs tracking-[4px] uppercase text-red-600 font-medium">
              Our Team
            </span>
            <div className="w-8 h-0.5 bg-red-600"/>
          </div>
          <h2 className="font-bebas text-5xl lg:text-6xl tracking-wider text-white leading-none">
            MEET THE <span className="text-gradient">TRAINERS</span>
          </h2>
          <p className="text-gray-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
  Our certified trainers are here to guide and support you throughout your fitness journey — from beginner to champion.
</p>
        </div>

        {/* TRAINERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className="
                group relative bg-[#111]
                border border-white/5
                rounded-xl overflow-hidden
                hover:border-red-600/30
                transition-all duration-300
                hover:-translate-y-1
              "
            >

              {/* IMAGE */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="
                    w-full h-full object-cover
                    opacity-70 group-hover:opacity-90
                    group-hover:scale-105
                    transition-all duration-500
                  "
                />

                {/* Gradient overlay */}
                <div className="
                  absolute inset-0
                  bg-gradient-to-t from-[#111] via-[#111]/20 to-transparent
                "/>

                {/* Experience badge */}
                <div className="
                  absolute top-3 right-3
                  bg-red-600/90 text-white
                  text-xs tracking-wider px-2.5 py-1 rounded
                ">
                  {trainer.experience}
                </div>

              </div>

              {/* CONTENT */}
              <div className="p-5">

                {/* Name + Role */}
                <h3 className="font-bebas text-lg tracking-wider text-white leading-tight">
                  {trainer.name}
                </h3>
                <div className="text-red-600 text-xs tracking-widest uppercase mt-0.5 mb-3">
                  {trainer.specialty}
                </div>

                {/* Bio */}
                <p className="text-gray-500 text-xs leading-relaxed mb-4">
                  {trainer.bio}
                </p>

                {/* Certifications */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {trainer.certifications.map((cert, i) => (
                    <span
                      key={i}
                      className="
                        text-xs text-gray-500
                        border border-white/10
                        px-2 py-0.5 rounded
                      "
                    >
                      {cert}
                    </span>
                  ))}
                </div>

                {/* Bottom row — rating + members */}
                <div className="
                  flex items-center justify-between
                  border-t border-white/5 pt-4
                ">

                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {[...Array(trainer.rating)].map((_, i) => (
                      <svg key={i} width="12" height="12" fill="#dc2626" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>

                  {/* Members count */}
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" fill="none" stroke="#666" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    <span className="text-xs text-gray-600">
                      {trainer.members} members
                    </span>
                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">
  Looking for the right trainer to achieve your fitness goals?
</p>
          <a
            href="/#contact"
            className="
              inline-flex items-center gap-2
              px-8 py-3.5
              border border-red-600 text-red-600
              hover:bg-red-600 hover:text-white
              text-xs tracking-widest uppercase font-medium
              rounded transition-all duration-300
            "
          >
            Book a Free Consultation
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

      </div>

    </section>
  )
}

export default Trainers

import { useState } from 'react'

const testimonials = [
  {
    name: 'HARPREET KAUR',
    initials: 'HK',
    location: 'Ludhiana',
    plan: 'Pro Member',
    result: '-18kg in 4 months',
    review:
      'Muscle Vault completely transformed my lifestyle. With expert training and a personalized nutrition plan, I achieved my weight-loss goals faster than I imagined. The supportive community keeps me motivated every day.',
    rating: 5,
    date: 'March 2025',
  },
  {
    name: 'MANPREET SINGH',
    initials: 'MS',
    location: 'Jalandhar',
    plan: 'Elite Member',
    result: '+12kg Muscle in 6 months',
    review:
      'The equipment is top-notch, the trainers are highly knowledgeable, and the facility is always clean and professional. The results I achieved here exceeded all my expectations.',
    rating: 5,
    date: 'February 2025',
  },
  {
    name: 'GURPREET BHATIA',
    initials: 'GB',
    location: 'Ludhiana',
    plan: 'Starter Member',
    result: 'Lost 8kg in 2 months',
    review:
      'As a beginner, I was nervous about joining a gym, but the trainers guided me every step of the way. Within just two months, I started seeing real progress and gained confidence.',
    rating: 5,
    date: 'January 2025',
  },
  {
    name: 'NAVNEET SHARMA',
    initials: 'NS',
    location: 'Ludhiana',
    plan: 'Pro Member',
    result: 'Complete Body Transformation',
    review:
      'A modern facility, expert coaching, and a motivating community make this one of the best fitness experiences I have ever had. Every membership plan delivers excellent value.',
    rating: 5,
    date: 'April 2025',
  },
  {
    name: 'VIKRAM MALHOTRA',
    initials: 'VM',
    location: 'Phagwara',
    plan: 'Elite Member',
    result: 'Marathon Runner Now',
    review:
      'The structured cardio training program helped me complete my first half marathon. The guidance and motivation from the trainers were exceptional throughout the journey.',
    rating: 5,
    date: 'April 2025',
  },
  {
    name: 'RAJAN DEEP',
    initials: 'RD',
    location: 'Ludhiana',
    plan: 'Pro Member',
    result: 'Consistent for 1 Year',
    review:
      'Maintaining consistency became much easier thanks to the friendly staff, positive environment, and well-maintained facilities. Highly recommended for anyone serious about fitness.',
    rating: 5,
    date: 'March 2025',
  },
]

const Testimonials = () => {
  const [active, setActive] = useState(0)

  const prev = () => setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  const next = () => setActive((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))

  return (
    <section id="testimonials" className="section-padding bg-[#0d0d0d] relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-red-600/5 blur-[120px]"/>

      <div className="container-custom relative z-10">

        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-red-600"/>
            <span className="text-xs tracking-[4px] uppercase text-red-600 font-medium">
              Testimonials
            </span>
            <div className="w-8 h-0.5 bg-red-600"/>
          </div>
          <h2 className="font-bebas text-5xl lg:text-6xl tracking-wider text-white leading-none">
            WHAT MEMBERS <span className="text-gradient">SAY</span>
          </h2>
          <p className="text-gray-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            Real members, real results. Yeh sirf words nahi —
            yeh transformations hain jo yahan hue.
          </p>
        </div>

        {/* FEATURED TESTIMONIAL — Large */}
        <div className="
          relative bg-[#111] border border-white/5
          rounded-2xl p-8 lg:p-12 mb-8
          overflow-hidden
        ">

          {/* Big quote mark */}
          <div className="
            absolute top-6 right-8
            font-bebas text-[120px] leading-none
            text-red-600/5 select-none
          ">
            "
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">

            {/* Left — Profile */}
            <div className="flex flex-col items-center lg:items-start gap-4">

              {/* Avatar */}
              {/* Featured Avatar - Replace old image avatar code with this */}

<div className="relative">
  <div
    className="
      w-20 h-20 rounded-full
      border-2 border-red-600
      bg-red-600/10
      flex items-center justify-center
    "
  >
    <span className="font-bebas text-2xl tracking-wider text-red-600">
      {testimonials[active].initials}
    </span>
  </div>

  {/* Online dot */}
  <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#111]" />
</div>

              {/* Name + info */}
              <div className="text-center lg:text-left">
                <h4 className="font-bebas text-xl tracking-wider text-white">
                  {testimonials[active].name}
                </h4>
                <div className="text-red-600 text-xs tracking-wider mt-0.5">
                  {testimonials[active].plan}
                </div>
                <div className="text-gray-600 text-xs mt-0.5">
                  {testimonials[active].location} · {testimonials[active].date}
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <svg key={i} width="14" height="14" fill="#dc2626" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              {/* Result badge */}
              <div className="
                bg-red-600/10 border border-red-600/20
                rounded-lg px-4 py-2 text-center
              ">
                <div className="text-red-600 font-bebas text-lg tracking-wider">
                  {testimonials[active].result}
                </div>
                <div className="text-gray-500 text-xs">Result</div>
              </div>

            </div>

            {/* Right — Review text */}
            <div className="lg:col-span-2">
              <p className="
                text-gray-300 text-base lg:text-lg
                leading-relaxed italic
              ">
                "{testimonials[active].review}"
              </p>

              {/* Navigation */}
              <div className="flex items-center gap-4 mt-8">
                <button
                  onClick={prev}
                  className="
                    w-10 h-10 rounded-full
                    border border-white/10
                    hover:border-red-600 hover:text-red-600
                    text-gray-500
                    flex items-center justify-center
                    transition-all duration-300
                  "
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`
                        rounded-full transition-all duration-300
                        ${active === i
                          ? 'w-6 h-2 bg-red-600'
                          : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                        }
                      `}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="
                    w-10 h-10 rounded-full
                    border border-white/10
                    hover:border-red-600 hover:text-red-600
                    text-gray-500
                    flex items-center justify-center
                    transition-all duration-300
                  "
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>

              </div>
            </div>

          </div>
        </div>

        {/* SMALL CARDS — Bottom row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.slice(0, 3).map((t, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className={`
                cursor-pointer
                bg-[#111] border rounded-xl p-5
                transition-all duration-300
                ${active === i
                  ? 'border-red-600/50 bg-red-600/5'
                  : 'border-white/5 hover:border-white/10'
                }
              `}
            >
              <div className="flex items-center gap-3 mb-3">
  <div
    className="
      w-10 h-10 rounded-full
      border border-red-600/30
      bg-red-600/10
      flex items-center justify-center
    "
  >
    <span className="font-bebas text-sm tracking-wider text-red-600">
      {t.initials}
    </span>
  </div>

  <div>
    <div className="text-white text-xs font-medium tracking-wider">
      {t.name}
    </div>
    <div className="text-red-600 text-xs">
      {t.result}
    </div>
  </div>
</div>
              <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                {t.review}
              </p>
            </div>
          ))}
        </div>

      </div>

    </section>
  )
}

export default Testimonials

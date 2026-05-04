import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const plans = [
  {
    name: 'STARTER',
    duration: '1 Month',
    price: 999,
    desc: 'Beginners ke liye perfect starting point',
    color: 'gray',
    isPopular: false,
    features: [
      { text: 'Gym Access (6AM – 10PM)', included: true },
      { text: 'Locker Room Access', included: true },
      { text: 'All Basic Equipment', included: true },
      { text: '1 Free Consultation', included: true },
      { text: 'Personal Trainer', included: false },
      { text: 'Diet Plan', included: false },
      { text: 'Guest Pass', included: false },
    ],
  },
  {
    name: 'PRO',
    duration: '3 Months',
    price: 2499,
    desc: 'Most popular — serious results ke liye',
    color: 'orange',
    isPopular: true,
    features: [
      { text: 'Gym Access (6AM – 10PM)', included: true },
      { text: 'Locker Room Access', included: true },
      { text: 'All Equipment Access', included: true },
      { text: 'Personal Trainer (2x/week)', included: true },
      { text: 'Custom Diet Plan', included: true },
      { text: 'Progress Tracking', included: true },
      { text: 'Guest Pass (1/month)', included: false },
    ],
  },
  {
    name: 'ELITE',
    duration: '12 Months',
    price: 7999,
    desc: 'Serious athletes ke liye ultimate package',
    color: 'gray',
    isPopular: false,
    features: [
      { text: 'Gym Access (6AM – 10PM)', included: true },
      { text: 'Locker Room Access', included: true },
      { text: 'All Equipment Access', included: true },
      { text: 'Unlimited PT Sessions', included: true },
      { text: 'Nutrition Coaching', included: true },
      { text: 'Body Composition Test', included: true },
      { text: 'Guest Pass (2/month)', included: true },
    ],
  },
]

const Plans = () => {
  const [hoveredPlan, setHoveredPlan] = useState(null)
  const navigate = useNavigate()

  return (
    <section id="plans" className="section-padding bg-[#0d0d0d] relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-orange-500/5 blur-[120px]"/>

      <div className="container-custom relative z-10">

        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-orange-500"/>
            <span className="text-xs tracking-[4px] uppercase text-orange-500 font-medium">
              Membership
            </span>
            <div className="w-8 h-0.5 bg-orange-500"/>
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
              key={index}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`
                relative rounded-xl border
                transition-all duration-300
                ${plan.isPopular
                  ? 'bg-[#111] border-orange-500 shadow-lg shadow-orange-500/10 scale-105'
                  : 'bg-[#111] border-white/5 hover:border-orange-500/30'
                }
                ${hoveredPlan === index && !plan.isPopular ? '-translate-y-1' : ''}
              `}
            >

              {/* Popular badge */}
              {plan.isPopular && (
                <div className="
                  absolute -top-4 left-1/2 -translate-x-1/2
                  bg-orange-500 text-white
                  text-xs tracking-widest uppercase font-medium
                  px-6 py-1.5 rounded-full
                  whitespace-nowrap
                ">
                  ⭐ Most Popular
                </div>
              )}

              <div className="p-7">

                {/* Plan name + duration */}
                <div className="mb-5">
                  <h3 className="font-bebas text-2xl tracking-widest text-white">
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">{plan.desc}</p>
                </div>

                {/* Price */}
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-gray-500 text-lg">₹</span>
                  <span className="font-bebas text-5xl text-orange-500 leading-none tracking-wider">
                    {plan.price.toLocaleString()}
                  </span>
                </div>
                <div className="text-gray-600 text-xs tracking-wider uppercase mb-6">
                  {plan.duration} Plan
                </div>

                {/* Divider */}
                <div className="border-t border-white/5 mb-6"/>

                {/* Features list */}
                <ul className="flex flex-col gap-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">

                      {/* Check / Cross icon */}
                      {feature.included ? (
                        <div className="
                          w-5 h-5 rounded-full
                          bg-orange-500/20
                          flex items-center justify-center
                          shrink-0
                        ">
                          <svg width="10" height="10" fill="none" stroke="#ff6b00" strokeWidth="2.5" viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </div>
                      ) : (
                        <div className="
                          w-5 h-5 rounded-full
                          bg-white/5
                          flex items-center justify-center
                          shrink-0
                        ">
                          <svg width="10" height="10" fill="none" stroke="#555" strokeWidth="2.5" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </div>
                      )}

                      <span className={`text-sm ${feature.included ? 'text-gray-300' : 'text-gray-600'}`}>
                        {feature.text}
                      </span>

                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => navigate('/signup')}
                  className={`
                    w-full py-3.5
                    text-xs tracking-widest uppercase font-medium
                    rounded transition-all duration-300
                    ${plan.isPopular
                      ? 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/25'
                      : 'border border-white/10 text-gray-400 hover:border-orange-500 hover:text-orange-500'
                    }
                  `}
                >
                  Get Started
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM NOTE */}
        <p className="text-center text-gray-600 text-xs tracking-wider mt-8">
          * Saare plans mein free locker, parking aur WiFi included hai.
          Questions? <a href="/#contact" className="text-orange-500 hover:underline">Contact us</a>
        </p>

      </div>

    </section>
  )
}

export default Plans
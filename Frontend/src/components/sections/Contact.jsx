import { useState } from 'react'
import API from '../../utils/api'
import toast from 'react-hot-toast'

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (!form.name || !form.email || !form.subject || !form.message) {
    toast.error('Saare fields fill karo!')
    return
  }

  try {
    setLoading(true)

    const { data } = await API.post(
      '/inquiry/create',
      form
    )

    toast.success(data.message)

    setForm({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    })

  } catch (err) {

    toast.error(
      err.response?.data?.message || 'Kuch problem aayi, dobara try karo.'
    )

  } finally {
    setLoading(false)
  }
}

  return (
    <section id="contact" className="section-padding bg-[#0d0d0d] relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[100px]"/>

      <div className="container-custom relative z-10">

        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-orange-500"/>
            <span className="text-xs tracking-[4px] uppercase text-orange-500 font-medium">
              Get In Touch
            </span>
            <div className="w-8 h-0.5 bg-orange-500"/>
          </div>
          <h2 className="font-bebas text-5xl lg:text-6xl tracking-wider text-white leading-none">
            CONTACT <span className="text-gradient">US</span>
          </h2>
          <p className="text-gray-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            Koi bhi question ho, free trial book karna ho ya
            membership ke baare mein jaanna ho — hum yahan hain!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* LEFT — Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Info cards */}
            {[
              {
                icon: (
                  <svg width="20" height="20" fill="none" stroke="#ff6b00" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                ),
                label: 'Location',
                value: 'Model Town, Ludhiana',
                sub: 'Punjab, India — 141002',
              },
              {
                icon: (
                  <svg width="20" height="20" fill="none" stroke="#ff6b00" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                ),
                label: 'Phone',
                value: '+91 98765 43210',
                sub: 'Mon–Sat, 6AM – 10PM',
              },
              {
                icon: (
                  <svg width="20" height="20" fill="none" stroke="#ff6b00" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                ),
                label: 'Email',
                value: 'info@musclevault.in',
                sub: 'Reply within 24 hours',
              },
              {
                icon: (
                  <svg width="20" height="20" fill="none" stroke="#ff6b00" strokeWidth="1.5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                ),
                label: 'Timings',
                value: 'Mon–Sat: 6AM – 10PM',
                sub: 'Sunday: 7AM – 8PM',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="
                  flex items-start gap-4
                  bg-[#111] border border-white/5
                  rounded-xl p-5
                  hover:border-orange-500/20
                  transition-all duration-300
                  group
                "
              >
                <div className="
                  w-12 h-12 rounded-lg
                  bg-orange-500/10
                  group-hover:bg-orange-500/20
                  flex items-center justify-center
                  shrink-0
                  transition-all duration-300
                ">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs tracking-widest uppercase text-orange-500 mb-1">
                    {item.label}
                  </div>
                  <div className="text-white text-sm font-medium">
                    {item.value}
                  </div>
                  <div className="text-gray-500 text-xs mt-0.5">
                    {item.sub}
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* RIGHT — Contact Form */}
          <div className="lg:col-span-3">
            <div className="
              bg-[#111] border border-white/5
              rounded-xl p-8
            ">
              <h3 className="font-bebas text-2xl tracking-wider text-white mb-6">
                SEND US A MESSAGE
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Harpreet Singh"
                      className="
                        w-full bg-[#0a0a0a] border border-white/10
                        rounded-lg px-4 py-3
                        text-white text-sm placeholder-gray-600
                        focus:outline-none focus:border-orange-500
                        transition-colors duration-300
                      "
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="
                        w-full bg-[#0a0a0a] border border-white/10
                        rounded-lg px-4 py-3
                        text-white text-sm placeholder-gray-600
                        focus:outline-none focus:border-orange-500
                        transition-colors duration-300
                      "
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="harpreet@gmail.com"
                    className="
                      w-full bg-[#0a0a0a] border border-white/10
                      rounded-lg px-4 py-3
                      text-white text-sm placeholder-gray-600
                      focus:outline-none focus:border-orange-500
                      transition-colors duration-300
                    "
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="
                      w-full bg-[#0a0a0a] border border-white/10
                      rounded-lg px-4 py-3
                      text-sm
                      focus:outline-none focus:border-orange-500
                      transition-colors duration-300
                      text-gray-400
                    "
                  >
                    <option value="" className="bg-[#111]">Select subject...</option>
                    <option value="Membership Inquiry" className="bg-[#111]">Membership Inquiry</option>
                    <option value="Free Trial" className="bg-[#111]">Free Trial Booking</option>
                    <option value="Personal Training" className="bg-[#111]">Personal Training</option>
                    <option value="Diet Plan" className="bg-[#111]">Diet Plan</option>
                    <option value="Other" className="bg-[#111]">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Apna message yahan likhein..."
                    className="
                      w-full bg-[#0a0a0a] border border-white/10
                      rounded-lg px-4 py-3
                      text-white text-sm placeholder-gray-600
                      focus:outline-none focus:border-orange-500
                      transition-colors duration-300
                      resize-none
                    "
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full py-4
                    bg-orange-500 hover:bg-orange-600
                    disabled:opacity-50 disabled:cursor-not-allowed
                    text-white text-xs tracking-widest uppercase font-medium
                    rounded-lg transition-all duration-300
                    hover:shadow-lg hover:shadow-orange-500/25
                    flex items-center justify-center gap-2
                  "
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact
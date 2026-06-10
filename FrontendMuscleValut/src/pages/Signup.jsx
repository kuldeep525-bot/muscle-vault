import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import API from '../utils/api'
import toast from 'react-hot-toast'

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill in all required fields!')
      return
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters long!')
      return
    }
    

    try {
      setLoading(true)
      const { data } = await API.post('/auth/register', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      })
      login(data.user, data.token)
      toast.success(`Welcome to Muscle Vault, ${data.user.name}! 💪`)
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed!')
    } finally {
      setLoading(false)
    }
  }

  // Password strength checker
  const getPasswordStrength = () => {
    const pwd = form.password
    if (!pwd) return null
    if (pwd.length < 6) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/4' }
    if (pwd.length < 8) return { label: 'Fair', color: 'bg-yellow-500', width: 'w-2/4' }
    if (pwd.length < 10) return { label: 'Good', color: 'bg-blue-500', width: 'w-3/4' }
    return { label: 'Strong', color: 'bg-green-500', width: 'w-full' }
  }

  const strength = getPasswordStrength()

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">

      {/* LEFT SIDE — Image (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80"
          alt="Gym Training"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 to-[#0a0a0a]"/>

        <div className="absolute inset-0 flex flex-col justify-between p-12">

          {/* Logo */}
          <Link to="/" className="font-bebas text-2xl tracking-widest text-white">
            MUSCLE <span className="text-red-600">VAULT</span>
          </Link>

          {/* Quote */}
          <div>
            <div className="w-12 h-0.5 bg-red-600 mb-6"/>
            <h2 className="font-bebas text-5xl tracking-wider text-white leading-tight mb-4">
              START YOUR<br/>
              <span className="text-gradient">TRANSFORMATION</span><br/>
              TODAY
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Join Muscle Vault and begin your fitness journey today.
  The first step is always the most important.
            </p>
          </div>

          {/* Benefits */}
          <div className="flex flex-col gap-3">
            {[
              'Free first consultation',
              'Access to all equipment',
              'Expert trainer guidance',
              'Track your progress',
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-red-600/20 flex items-center justify-center shrink-0">
                  <svg width="10" height="10" fill="none" stroke="#dc2626" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span className="text-gray-400 text-sm">{benefit}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* RIGHT SIDE — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md py-8">

          {/* Mobile logo */}
          <Link to="/" className="lg:hidden font-bebas text-2xl tracking-widest text-white block mb-10">
            MUSCLE <span className="text-red-600">VAULT</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-0.5 bg-red-600"/>
              <span className="text-xs tracking-[4px] uppercase text-red-600">
                New Member
              </span>
            </div>
            <h1 className="font-bebas text-4xl tracking-wider text-white">
              CREATE YOUR<br/>ACCOUNT
            </h1>
            <p className="text-gray-500 text-sm mt-2">
  Already have an account?{' '}
  <Link to="/login" className="text-red-600 hover:underline">
    Log In
  </Link>
</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Name */}
            <div>
              <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Harpreet Singh"
                className="
                  w-full bg-[#111] border border-white/10
                  rounded-lg px-4 py-3.5
                  text-white text-sm placeholder-gray-600
                  focus:outline-none focus:border-red-600
                  transition-colors duration-300
                "
              />
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@gmail.com"
                  className="
                    w-full bg-[#111] border border-white/10
                    rounded-lg px-4 py-3.5
                    text-white text-sm placeholder-gray-600
                    focus:outline-none focus:border-red-600
                    transition-colors duration-300
                  "
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="
                    w-full bg-[#111] border border-white/10
                    rounded-lg px-4 py-3.5
                    text-white text-sm placeholder-gray-600
                    focus:outline-none focus:border-red-600
                    transition-colors duration-300
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="
                    w-full bg-[#111] border border-white/10
                    rounded-lg px-4 py-3.5 pr-12
                    text-white text-sm placeholder-gray-600
                    focus:outline-none focus:border-red-600
                    transition-colors duration-300
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 transition-colors duration-300"
                >
                  {showPassword ? (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* Password strength bar */}
              {strength && (
                <div className="mt-2">
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`}/>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Password strength: <span className="text-white">{strength.label}</span>
                  </div>
                </div>
              )}
            </div>


            {/* Terms */}
            <p className="text-gray-600 text-xs leading-relaxed">
  By creating an account, you agree to our{' '}
  <span className="text-red-600 cursor-pointer">Terms of Service</span>
  {' '}and{' '}
  <span className="text-red-600 cursor-pointer">Privacy Policy</span>.
</p>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-4
              bg-red-600 hover:bg-red-700

                disabled:opacity-50 disabled:cursor-not-allowed
                text-white text-xs tracking-widest uppercase font-medium
                rounded-lg transition-all duration-300
                hover:shadow-lg hover:shadow-red-600/25
                flex items-center justify-center gap-2
              "
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="8.5" cy="7" r="4"/>
                    <line x1="20" y1="8" x2="20" y2="14"/>
                    <line x1="23" y1="11" x2="17" y2="11"/>
                  </svg>
                </>
              )}
            </button>

          </form>

          {/* Back to home */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="
                text-xs text-gray-600 hover:text-gray-400
                tracking-wider transition-colors duration-300
                flex items-center justify-center gap-2
              "
            >
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Home
            </Link>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Signup

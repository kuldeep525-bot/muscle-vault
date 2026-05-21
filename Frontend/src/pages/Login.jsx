import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import API from '../utils/api'
import toast from 'react-hot-toast'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.email || !form.password) {
      toast.error('Email aur password dono bharo!')
      return
    }

    try {
      setLoading(true)
      const { data } = await API.post('/auth/login', form)
      login(data.user, data.token)
      toast.success(`Welcome back, ${data.user.name}!`)
      if (data.user.role === 'admin') {
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Kuch galat hua!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">

      {/* LEFT SIDE — Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
          alt="Gym"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 to-[#0a0a0a]"/>
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          <Link to="/" className="font-bebas text-2xl tracking-widest text-white">
            MUSCLE <span className="text-orange-500">VAULT</span>
          </Link>
          <div>
            <div className="w-12 h-0.5 bg-orange-500 mb-6"/>
            <h2 className="font-bebas text-5xl tracking-wider text-white leading-tight mb-4">
              YOUR STRENGTH<br/>
              <span className="text-gradient">JOURNEY</span><br/>
              AWAITS
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Login karke apni membership, attendance aur
              progress track karo — sab ek jagah.
            </p>
          </div>
          <div className="flex gap-8">
            {[
              { num: '500+', label: 'Members' },
              { num: '12+',  label: 'Trainers' },
              { num: '4.9',  label: 'Rating' },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-bebas text-3xl text-orange-500 tracking-wider">{s.num}</div>
                <div className="text-xs text-gray-500 tracking-wider uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link to="/" className="lg:hidden font-bebas text-2xl tracking-widest text-white block mb-10">
            MUSCLE <span className="text-orange-500">VAULT</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-0.5 bg-orange-500"/>
              <span className="text-xs tracking-[4px] uppercase text-orange-500">
                Welcome Back
              </span>
            </div>
            <h1 className="font-bebas text-4xl tracking-wider text-white">
              LOGIN TO YOUR<br/>ACCOUNT
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Account nahi hai?{' '}
              <Link to="/signup" className="text-orange-500 hover:underline">
                Sign up karo
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div>
              <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="harpreet@gmail.com"
                className="
                  w-full bg-[#111] border border-white/10
                  rounded-lg px-4 py-3.5
                  text-white text-sm placeholder-gray-600
                  focus:outline-none focus:border-orange-500
                  transition-colors duration-300
                "
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                Password
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
                    focus:outline-none focus:border-orange-500
                    transition-colors duration-300
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute right-4 top-1/2 -translate-y-1/2
                    text-gray-500 hover:text-orange-500
                    transition-colors duration-300
                  "
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
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-4 mt-2
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
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10 17 15 12 10 7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
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

export default Login
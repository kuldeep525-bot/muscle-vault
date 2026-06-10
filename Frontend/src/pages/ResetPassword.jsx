import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import API from '../utils/api'
import toast from 'react-hot-toast'

const ResetPassword = () => {
  const [form, setForm] = useState({
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || ''
  const otp   = location.state?.otp   || ''

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.password || !form.confirmPassword) {
      toast.error('Saare fields bharo!')
      return
    }
    if (form.password.length < 6) {
      toast.error('Password minimum 6 characters!')
      return
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords match nahi kar rahe!')
      return
    }

    try {
      setLoading(true)
      await API.post('/auth/reset-password', {
        email,
        otp,
        password: form.password,
        confirmPassword: form.confirmPassword,
      })
      toast.success('Password reset ho gaya! Login karo.')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Kuch galat hua!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        {/* Logo */}
        <Link to="/" className="font-bebas text-2xl tracking-widest text-white block mb-10 text-center">
          MUSCLE <span className="text-red-600">VAULT</span>
        </Link>

        <div className="bg-[#111] border border-white/10 rounded-2xl p-8">

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-0.5 bg-red-600"/>
              <span className="text-xs tracking-[4px] uppercase text-red-600">
                New Password
              </span>
            </div>
            <h1 className="font-bebas text-3xl tracking-wider text-white">
              SET NEW PASSWORD
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Create a strong new password
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* New Password */}
            <div>
              <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="
                    w-full bg-[#0a0a0a] border border-white/10
                    rounded-lg px-4 py-3.5 pr-12
                    text-white text-sm placeholder-gray-600
                    focus:outline-none focus:border-red-600
                    transition-colors duration-300
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 transition-colors"
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

            {/* Confirm Password */}
            <div>
              <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                Confirm Password
              </label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className={`
                  w-full bg-[#0a0a0a] border rounded-lg px-4 py-3.5
                  text-white text-sm placeholder-gray-600
                  focus:outline-none transition-colors duration-300
                  ${form.confirmPassword && form.password !== form.confirmPassword
                    ? 'border-red-500/50 focus:border-red-500'
                    : 'border-white/10 focus:border-red-600'
                  }
                `}
              />
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">Passwords match nahi kar rahe!</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-4
                bg-red-600 hover:bg-red-700
                disabled:opacity-50 disabled:cursor-not-allowed
                text-white text-xs tracking-widest uppercase font-medium
                rounded-lg transition-all duration-300
                flex items-center justify-center gap-2
              "
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : 'Reset Password'}
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default ResetPassword
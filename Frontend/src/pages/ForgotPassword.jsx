import { useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../utils/api'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error('Email daalo!')
      return
    }
    try {
      setLoading(true)
      await API.post('/auth/forgot-password', { email })
      setSent(true)
      toast.success('OTP send to the email!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'server error!')
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

          {!sent ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-0.5 bg-red-600"/>
                  <span className="text-xs tracking-[4px] uppercase text-red-600">
                    Forgot Password
                  </span>
                </div>
                <h1 className="font-bebas text-3xl tracking-wider text-white">
                  RESET YOUR PASSWORD
                </h1>
                <p className="text-gray-500 text-sm mt-2">
                  Enter your email — we'll send you an OTP
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="
                      w-full bg-[#0a0a0a] border border-white/10
                      rounded-lg px-4 py-3.5
                      text-white text-sm placeholder-gray-600
                      focus:outline-none focus:border-red-600
                      transition-colors duration-300
                    "
                  />
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
                  ) : 'Send OTP'}
                </button>
              </form>
            </>
          ) : (
            /* OTP Sent success */
            <div className="text-center py-4">
              <div className="text-5xl mb-4">📧</div>
              <h2 className="font-bebas text-2xl tracking-wider text-white mb-2">
                OTP SENT!
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Check your email <span className="text-white">{email}</span> for OTP
              </p>
              <Link
                to="/verify-otp"
                state={{ email }}
                className="
                  inline-block w-full py-4
                  bg-red-600 hover:bg-red-700
                  text-white text-xs tracking-widest uppercase font-medium
                  rounded-lg transition-all duration-300 text-center
                "
              >
                Enter OTP
              </Link>
            </div>
          )}

          {/* Back to login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-xs text-gray-600 hover:text-gray-400 tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
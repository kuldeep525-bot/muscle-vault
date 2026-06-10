import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import API from '../utils/api'
import toast from 'react-hot-toast'

const VerifyOtp = () => {
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!otp) {
      toast.error('OTP daalo!')
      return
    }
    try {
      setLoading(true)
      await API.post('/auth/verify-otp', { email, otp })
      toast.success('OTP verified!')
      navigate('/reset-password', { state: { email, otp } })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP!')
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
                Verify OTP
              </span>
            </div>
            <h1 className="font-bebas text-3xl tracking-wider text-white">
              ENTER YOUR OTP
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              OTP sent to <span className="text-white">{email}</span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div>
              <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 4 digit OTP"
                maxLength={4}
                className="
                  w-full bg-[#0a0a0a] border border-white/10
                  rounded-lg px-4 py-3.5
                  text-white text-sm placeholder-gray-600
                  focus:outline-none focus:border-red-600
                  transition-colors duration-300
                  text-center text-2xl tracking-[1rem]
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
              ) : 'Verify OTP'}
            </button>

          </form>

          {/* Resend */}
          <div className="mt-6 text-center">
            <Link
              to="/forgot-password"
              className="text-xs text-gray-600 hover:text-red-600 tracking-wider transition-colors"
            >
              Resend OTP
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default VerifyOtp
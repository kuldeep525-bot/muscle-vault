import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

// Pages import kar rahe hain
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Members from './pages/Members'
import Attendance from './pages/Attendance'
import Plans from './pages/Plans'
import Trainers from './pages/Trainers'
import Inquiries from './pages/Inquiries'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// =============================================
// PROTECTED ROUTE — Security Guard ki tarah hai
// Agar token nahi hai → Login pe bhejo
// Agar admin nahi hai → Home pe bhejo
// Agar sab theek hai → Page dikhao
// =============================================
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (!token) return <Navigate to="/login" replace />
  if (user.role !== 'admin') return <Navigate to="/" replace />

  return children
}

// =============================================
// APP — Yahan saare routes define hote hain
// Route = ek URL ka address
// element = us URL pe kaunsa page dikhana hai
// =============================================
function App() {
  return (
    <AuthProvider>  {/* Login state poori app mein available */}
    <Navbar/>
      <Routes>

        {/* PUBLIC ROUTES — koi bhi dekh sakta hai */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ADMIN ROUTES — sirf admin dekh sakta hai */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/members" element={
          <ProtectedRoute>
            <Members />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/attendance" element={
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/plans" element={
          <ProtectedRoute>
            <Plans />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/trainers" element={
          <ProtectedRoute>
            <Trainers />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/inquiries" element={
          <ProtectedRoute>
            <Inquiries />
          </ProtectedRoute>
        } />

        {/* Koi bhi unknown URL → Home pe bhejo */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </AuthProvider>
  )
}

export default App
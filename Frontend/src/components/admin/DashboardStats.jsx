import { useState, useEffect } from 'react'
import API from '../../utils/api'
import {
  AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts'

// Dummy data — baad mein API se aayega
const monthlyData = [
  { month: 'Jan', members: 45, revenue: 44955 },
  { month: 'Feb', members: 52, revenue: 51948 },
  { month: 'Mar', members: 61, revenue: 60939 },
  { month: 'Apr', members: 58, revenue: 57942 },
  { month: 'May', members: 70, revenue: 69930 },
  { month: 'Jun', members: 78, revenue: 77922 },
  { month: 'Jul', members: 85, revenue: 84915 },
  { month: 'Aug', members: 90, revenue: 89910 },
  { month: 'Sep', members: 88, revenue: 87912 },
  { month: 'Oct', members: 95, revenue: 94905 },
  { month: 'Nov', members: 100, revenue: 99900 },
  { month: 'Dec', members: 110, revenue: 109890 },
]

const attendanceData = [
  { day: 'Mon', count: 42 },
  { day: 'Tue', count: 38 },
  { day: 'Wed', count: 55 },
  { day: 'Thu', count: 48 },
  { day: 'Fri', count: 62 },
  { day: 'Sat', count: 70 },
  { day: 'Sun', count: 35 },
]

// Custom Tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-3">
        <p className="text-gray-400 text-xs mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-white text-sm font-medium">
            {p.name === 'revenue' ? `₹${p.value.toLocaleString()}` : p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    todayAttendance: 0,
    totalInquiries: 0,
    newInquiries: 0,
    totalTrainers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get('/dashboard/stats')
        setStats(data.data)
      } catch (err) {
        // Use dummy data if API fails
        setStats({
          totalMembers: 100,
          activeMembers: 78,
          todayAttendance: 42,
          totalInquiries: 24,
          newInquiries: 5,
          totalTrainers: 4,
        })
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    {
      label: 'Total Members',
      value: stats.totalMembers,
      icon: (
        <svg width="20" height="20" fill="none" stroke="#ff6b00" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      change: '+12%',
      changeType: 'up',
      sub: 'This month',
      color: 'orange',
    },
    {
      label: 'Active Members',
      value: stats.activeMembers,
      icon: (
        <svg width="20" height="20" fill="none" stroke="#22c55e" strokeWidth="1.5" viewBox="0 0 24 24">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
      change: '+5%',
      changeType: 'up',
      sub: 'Active memberships',
      color: 'green',
    },
    {
      label: "Today's Attendance",
      value: stats.todayAttendance,
      icon: (
        <svg width="20" height="20" fill="none" stroke="#3b82f6" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <polyline points="16 11 18 13 22 9"/>
        </svg>
      ),
      change: 'Live',
      changeType: 'live',
      sub: 'Checked in today',
      color: 'blue',
    },
    {
      label: 'New Inquiries',
      value: stats.newInquiries,
      icon: (
        <svg width="20" height="20" fill="none" stroke="#a855f7" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      change: 'Unread',
      changeType: 'warning',
      sub: 'Pending replies',
      color: 'purple',
    },
  ]

  const colorMap = {
    orange: 'bg-orange-500/10 border-orange-500/20',
    green:  'bg-green-500/10 border-green-500/20',
    blue:   'bg-blue-500/10 border-blue-500/20',
    purple: 'bg-purple-500/10 border-purple-500/20',
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-[#111] border border-white/5 rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-white/5 rounded mb-4 w-2/3"/>
            <div className="h-8 bg-white/5 rounded mb-2 w-1/3"/>
            <div className="h-3 bg-white/5 rounded w-1/2"/>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((card, i) => (
          <div
            key={i}
            className={`
              bg-[#111] border rounded-xl p-6
              hover:-translate-y-0.5 transition-all duration-300
              ${colorMap[card.color]}
            `}
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-4">
              <div className={`
                w-11 h-11 rounded-lg flex items-center justify-center
                ${colorMap[card.color]}
              `}>
                {card.icon}
              </div>

              {/* Change badge */}
              <span className={`
                text-xs px-2 py-1 rounded-full font-medium
                ${card.changeType === 'up'      ? 'bg-green-500/10 text-green-400' : ''}
                ${card.changeType === 'live'    ? 'bg-blue-500/10 text-blue-400 animate-pulse' : ''}
                ${card.changeType === 'warning' ? 'bg-orange-500/10 text-orange-400' : ''}
              `}>
                {card.change}
              </span>
            </div>

            {/* Value */}
            <div className="font-bebas text-4xl tracking-wider text-white mb-1">
              {card.value}
            </div>

            {/* Label */}
            <div className="text-gray-500 text-xs tracking-wider">
              {card.label}
            </div>
            <div className="text-gray-700 text-xs mt-0.5">
              {card.sub}
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* Members Growth — Area Chart */}
        <div className="lg:col-span-2 bg-[#111] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white text-sm font-medium tracking-wider">
                Members Growth
              </h3>
              <p className="text-gray-600 text-xs mt-0.5">Last 12 months</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"/>
              <span className="text-gray-500 text-xs">Members</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="membersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff6b00" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#ff6b00" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a"/>
              <XAxis dataKey="month" tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false}/>
              <Tooltip content={<CustomTooltip />}/>
              <Area
                type="monotone"
                dataKey="members"
                stroke="#ff6b00"
                strokeWidth={2}
                fill="url(#membersGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Attendance — Bar Chart */}
        <div className="bg-[#111] border border-white/5 rounded-xl p-6">
          <div className="mb-6">
            <h3 className="text-white text-sm font-medium tracking-wider">
              Weekly Attendance
            </h3>
            <p className="text-gray-600 text-xs mt-0.5">This week</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={attendanceData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false}/>
              <XAxis dataKey="day" tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false}/>
              <Tooltip content={<CustomTooltip />}/>
              <Bar dataKey="count" fill="#ff6b00" radius={[4, 4, 0, 0]} opacity={0.8}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* QUICK STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          {
            label: 'Total Trainers',
            value: stats.totalTrainers,
            icon: '💪',
            sub: 'Active staff',
          },
          {
            label: 'Total Inquiries',
            value: stats.totalInquiries,
            icon: '📩',
            sub: 'All time',
          },
          {
            label: 'Expiring Soon',
            value: '8',
            icon: '⚠️',
            sub: 'Next 7 days',
          },
        ].map((item, i) => (
          <div
            key={i}
            className="
              bg-[#111] border border-white/5
              rounded-xl p-5
              flex items-center gap-4
              hover:border-white/10
              transition-all duration-300
            "
          >
            <div className="text-2xl">{item.icon}</div>
            <div>
              <div className="font-bebas text-3xl text-white tracking-wider">
                {item.value}
              </div>
              <div className="text-gray-500 text-xs">{item.label}</div>
              <div className="text-gray-700 text-xs">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default DashboardStats
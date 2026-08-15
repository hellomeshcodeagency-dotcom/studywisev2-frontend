import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { Menu, X, LogOut, Search } from 'lucide-react'
import toast from 'react-hot-toast'

const NAV = [
  { to: '/dashboard',      icon: '🏠', label: 'Dashboard' },
  { to: '/courses',        icon: '📖', label: 'My Courses' },
  { to: '/tutor',          icon: '🤖', label: 'AI Tutor' },
  { to: '/past-questions', icon: '📋', label: 'Past Questions' },
  { to: '/upload',         icon: '⬆️', label: 'Upload' },
  { to: '/gpa',            icon: '📊', label: 'GPA Calculator' },
  { to: '/profile',        icon: '👤', label: 'Profile' },
]

export default function AppShell({ children }) {
  const { user, logout, isAdmin } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen]     = useState(false)
  const [search, setSearch] = useState('')

  function handleLogout() { logout(); navigate('/'); toast.success('Logged out') }

  function handleSearch(e) {
    e.preventDefault()
    if (search.trim().length < 2) return
    navigate(`/courses?search=${encodeURIComponent(search.trim())}`)
    setSearch('')
  }

  const active = NAV.find(n => location.pathname === n.to)?.label || ''

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/8 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2.5 no-underline" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="Studiwise" style={{ height:44, width:'auto', background:'#fff', borderRadius:10, padding:5, objectFit:'contain', display:'block' }}/>
          <div>
            <div className="font-black text-white text-base leading-tight">Studiwise</div>
            <div className="text-[0.6rem] text-blue-400 font-semibold">FUT Minna</div>
          </div>
        </Link>
        <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setOpen(false)}><X size={18}/></button>
      </div>

      {/* Student info */}
      <div className="mx-4 mt-4 px-3 py-3 rounded-xl" style={{ background:'rgba(26,86,219,0.12)', border:'1px solid rgba(26,86,219,0.25)' }}>
        <div className="text-xs font-bold text-blue-400 truncate">{user?.name}</div>
        <div className="text-[0.65rem] text-slate-400 mt-0.5">
          {user?.department_short || 'Physics'} · {user?.level_name || '100L'}
        </div>
        {user?.matric_no && <div className="text-[0.62rem] text-slate-500 mt-0.5">{user.matric_no}</div>}
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="px-4 mt-3">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search courses, notes…"
            className="input-field pl-8 py-2 text-xs"/>
        </div>
      </form>

      {/* Nav */}
      <nav className="flex-1 px-3 mt-4 flex flex-col gap-1">
        {NAV.map(n => {
          const isActive = location.pathname === n.to
          return (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium no-underline transition-all ${isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              style={isActive ? { background:'rgba(26,86,219,0.2)', color:'#fff' } : {}}>
              <span className="text-base">{n.icon}</span>
              {n.label}
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400"/>}
            </Link>
          )
        })}
        {isAdmin() && (
          <Link to="/admin" onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium no-underline transition-all mt-2 ${location.pathname === '/admin' ? 'text-white' : 'text-amber-400 hover:bg-amber-500/10'}`}
            style={location.pathname === '/admin' ? { background:'rgba(245,158,11,0.15)' } : {}}>
            <span>⚙️</span> Admin Panel
          </Link>
        )}
      </nav>

      {/* Streak */}
      {user?.study_streak > 0 && (
        <div className="mx-4 mb-3 px-3 py-2 rounded-xl flex items-center gap-2" style={{ background:'rgba(249,115,22,0.1)', border:'1px solid rgba(249,115,22,0.2)' }}>
          <span className="text-lg">🔥</span>
          <div>
            <div className="text-xs font-bold text-orange-400">{user.study_streak}-day streak!</div>
            <div className="text-[0.6rem] text-slate-500">Keep it up</div>
          </div>
        </div>
      )}

      {/* User footer */}
      <div className="px-4 py-4 border-t border-white/8 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
               style={{ background:'linear-gradient(135deg,#1A56DB,#F97316)' }}>
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-white truncate">{user?.name}</div>
            <div className="text-[0.62rem] text-slate-500 truncate">{user?.email}</div>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.25)', color:'#F87171' }}
          onMouseEnter={e => { e.currentTarget.style.background='rgba(239,68,68,0.2)' }}
          onMouseLeave={e => { e.currentTarget.style.background='rgba(239,68,68,0.1)' }}>
          <LogOut size={14}/> Log Out
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen" style={{ background:'#020817' }}>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col z-40 border-r border-white/8"
             style={{ background:'#0A0F1E' }}>
        <SidebarContent/>
      </aside>

      {/* Mobile topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 flex items-center justify-between px-4 border-b border-white/8"
           style={{ background:'rgba(10,15,30,0.97)', backdropFilter:'blur(20px)' }}>
        <Link to="/dashboard" className="flex items-center gap-2 no-underline">
          <img src="/logo.png" alt="Studiwise" style={{ height:38, width:'auto', background:'#fff', borderRadius:8, padding:4, objectFit:'contain', display:'block' }}/>
          <span className="font-black text-white text-base">Studiwise</span>
        </Link>
        <button onClick={() => setOpen(true)} className="text-slate-400 hover:text-white p-1"><Menu size={22}/></button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setOpen(false)}/>
          <aside className="relative flex flex-col w-72 h-full border-r border-white/8 z-10 overflow-y-auto"
                 style={{ background:'#0A0F1E' }}>
            <SidebarContent/>
          </aside>
        </div>
      )}

      {/* Page content */}
      <div className="md:ml-64 pt-14 md:pt-0 pb-20 md:pb-0 min-h-screen">
        {children}
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/8 h-16"
           style={{ background:'rgba(10,15,30,0.98)', backdropFilter:'blur(20px)' }}>
        <div className="flex items-center justify-around h-full">
          {[
            { to:'/dashboard',      icon:'🏠', label:'Home' },
            { to:'/courses',        icon:'📖', label:'Courses' },
            { to:'/tutor',          icon:'🤖', label:'Tutor' },
            { to:'/past-questions', icon:'📋', label:'Past Q' },
            { to:'/gpa',            icon:'📊', label:'GPA' },
          ].map(n => {
            const isActive = location.pathname === n.to
            return (
              <Link key={n.to} to={n.to} className="flex flex-col items-center gap-0.5 no-underline py-1 px-2">
                <span className={`text-xl transition-all ${isActive ? 'scale-110' : 'opacity-50'}`}>{n.icon}</span>
                <span className={`text-[0.58rem] font-semibold ${isActive ? 'text-blue-400' : 'text-slate-500'}`}>{n.label}</span>
                {isActive && <div className="w-1 h-1 rounded-full bg-blue-400"/>}
              </Link>
            )
          })}
        </div>
      </div>

    </div>
  )
}

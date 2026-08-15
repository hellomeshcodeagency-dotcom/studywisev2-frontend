import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import AppShell from '../components/layout/AppShell.jsx'
import api from '../api/axios.js'
import toast from 'react-hot-toast'
import { BookOpen, Bot, FileQuestion, Upload, Calculator, ChevronRight } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats]     = useState(null)
  const [courses, setCourses] = useState([])
  const [convos, setConvos]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/profile/stats'),
      api.get('/courses'),
      api.get('/tutor/conversations'),
    ]).then(([s, c, cv]) => {
      setStats(s.data)
      setCourses(c.data.courses.slice(0, 4))
      setConvos(cv.data.conversations.slice(0, 3))
    }).catch(() => toast.error('Failed to load dashboard'))
    .finally(() => setLoading(false))
  }, [])

  const quickLinks = [
    { to:'/tutor',          icon:<Bot size={20}/>,          label:'Ask AI Tutor',      desc:'Get instant help',        color:'rgba(26,86,219,0.15)',  border:'rgba(26,86,219,0.3)' },
    { to:'/past-questions', icon:<FileQuestion size={20}/>, label:'Past Questions',    desc:'Browse & download',       color:'rgba(16,185,129,0.12)', border:'rgba(16,185,129,0.3)' },
    { to:'/courses',        icon:<BookOpen size={20}/>,     label:'My Courses',        desc:'View course materials',   color:'rgba(249,115,22,0.12)', border:'rgba(249,115,22,0.3)' },
    { to:'/upload',         icon:<Upload size={20}/>,       label:'Upload Material',   desc:'Share with classmates',   color:'rgba(139,92,246,0.12)', border:'rgba(139,92,246,0.3)' },
    { to:'/gpa',            icon:<Calculator size={20}/>,   label:'GPA Calculator',    desc:'Calculate your GPA',      color:'rgba(236,72,153,0.12)', border:'rgba(236,72,153,0.3)' },
  ]

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-8">

        {/* Header */}
        <div className="mb-7">
          <h1 className="font-black text-2xl md:text-3xl text-white mb-1">
            {greeting}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-slate-400 text-sm">
            {user?.department_short || 'Physics'} · {user?.level_name || '100L'} · {user?.university_short || 'FUT Minna'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-7">
          {loading ? [1,2,3,4].map(i => (
            <div key={i} className="card h-24 animate-pulse" style={{ background:'rgba(255,255,255,.03)' }}/>
          )) : [
            { icon:'🔥', value:stats?.study_streak||0, label:'Day Streak' },
            { icon:'🤖', value:stats?.conversations||0, label:'AI Chats' },
            { icon:'📤', value:stats?.uploads||0,       label:'Uploads' },
            { icon:'🔖', value:stats?.bookmarks||0,     label:'Bookmarks' },
          ].map(s => (
            <div key={s.label} className="card p-4 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-black text-xl text-white">{s.value}</div>
              <div className="text-[0.65rem] text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h2 className="font-bold text-white text-base mb-3">Quick Access</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickLinks.map(q => (
                <Link key={q.to} to={q.to}
                  className="card p-4 flex items-center gap-4 no-underline hover:scale-[1.01] transition-all group"
                  style={{ background:`rgba(255,255,255,0.03)` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                       style={{ background:q.color, border:`1px solid ${q.border}`, color:'#fff' }}>
                    {q.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-white">{q.label}</div>
                    <div className="text-xs text-slate-500">{q.desc}</div>
                  </div>
                  <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 flex-shrink-0"/>
                </Link>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">

            {/* My courses */}
            <div className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white text-sm">My Courses</h3>
                <Link to="/courses" className="text-xs text-blue-400 no-underline hover:text-blue-300">View all</Link>
              </div>
              {loading ? (
                <div className="space-y-2">
                  {[1,2,3].map(i => <div key={i} className="h-10 rounded-lg animate-pulse" style={{ background:'rgba(255,255,255,.04)' }}/>)}
                </div>
              ) : courses.length > 0 ? (
                <div className="space-y-1.5">
                  {courses.map(c => (
                    <Link key={c.id} to={`/courses/${c.id}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl no-underline hover:bg-white/5 transition-colors">
                      <div className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0"
                           style={{ background:'rgba(26,86,219,0.15)', color:'#60A5FA' }}>
                        {c.code}
                      </div>
                      <div className="text-xs text-slate-400 truncate flex-1">{c.title.split('(')[0].trim()}</div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 text-center py-3">No courses found</p>
              )}
            </div>

            {/* Recent AI chats */}
            {convos.length > 0 && (
              <div className="card p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-white text-sm">Recent AI Chats</h3>
                  <Link to="/tutor" className="text-xs text-blue-400 no-underline">Open tutor</Link>
                </div>
                <div className="space-y-1.5">
                  {convos.map(c => (
                    <Link key={c.id} to="/tutor"
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl no-underline hover:bg-white/5 transition-colors">
                      <span className="text-sm">💬</span>
                      <div className="min-w-0">
                        <div className="text-xs text-white truncate">{c.title}</div>
                        {c.course_code && <div className="text-[0.62rem] text-slate-500">{c.course_code}</div>}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Study tip */}
            <div className="rounded-xl p-4" style={{ background:'rgba(26,86,219,0.08)', border:'1px solid rgba(26,86,219,0.2)' }}>
              <div className="text-sm font-bold text-blue-400 mb-1">💡 Study Tip</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ask the AI Tutor to explain any PHY 101 concept you find difficult. It knows the FUT Minna syllabus!
              </p>
            </div>

          </div>
        </div>
      </div>
    </AppShell>
  )
}

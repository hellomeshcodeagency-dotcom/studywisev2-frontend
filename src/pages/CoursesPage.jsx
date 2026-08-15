import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import AppShell from '../components/layout/AppShell.jsx'
import api from '../api/axios.js'
import toast from 'react-hot-toast'
import { Search, BookOpen, ChevronRight } from 'lucide-react'

function CourseCard({ course }) {
  const semColor = course.semester === 1 ? 'rgba(26,86,219,0.15)' : 'rgba(16,185,129,0.12)'
  const semBorder = course.semester === 1 ? 'rgba(26,86,219,0.3)' : 'rgba(16,185,129,0.3)'
  const semText = course.semester === 1 ? '#60A5FA' : '#34D399'

  return (
    <Link to={`/courses/${course.id}`} className="card p-5 no-underline hover:border-blue-500/30 hover:scale-[1.01] transition-all block group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-xs font-bold px-2.5 py-1 rounded-full mb-2 inline-block"
               style={{ background:semColor, border:`1px solid ${semBorder}`, color:semText }}>
            {course.code}
          </div>
          <h3 className="font-bold text-white text-sm leading-snug">{course.title}</h3>
        </div>
        <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 flex-shrink-0 mt-1"/>
      </div>
      {course.description && (
        <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{course.description}</p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[0.65rem] text-slate-500">
          <span>{course.credit_units} unit{course.credit_units!==1?'s':''}</span>
          <span>·</span>
          <span>Semester {course.semester}</span>
          {course.lecturer && <><span>·</span><span>{course.lecturer}</span></>}
        </div>
        <div className="flex items-center gap-2 text-[0.65rem] text-slate-600">
          {parseInt(course.resource_count) > 0 && <span>📄 {course.resource_count}</span>}
          {parseInt(course.past_question_count) > 0 && <span>📋 {course.past_question_count}</span>}
        </div>
      </div>
    </Link>
  )
}

export default function CoursesPage() {
  const [courses, setCourses]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [semester, setSemester]   = useState('')
  const [searchParams]            = useSearchParams()

  useEffect(() => {
    const q = searchParams.get('search')
    if (q) setSearch(q)
  }, [searchParams])

  useEffect(() => {
    setLoading(true)
    const params = {}
    if (semester) params.semester = semester
    api.get('/courses', { params })
      .then(r => setCourses(r.data.courses))
      .catch(() => toast.error('Failed to load courses'))
      .finally(() => setLoading(false))
  }, [semester])

  const filtered = courses.filter(c =>
    !search || c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.title.toLowerCase().includes(search.toLowerCase())
  )

  const sem1 = filtered.filter(c => c.semester === 1)
  const sem2 = filtered.filter(c => c.semester === 2)

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="font-black text-2xl md:text-3xl text-white mb-1">My Courses 📖</h1>
            <p className="text-slate-400 text-sm">100-Level Physics — FUT Minna</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search courses…" className="input-field pl-9 text-sm"/>
          </div>
          <div className="flex gap-2">
            {['','1','2'].map(s => (
              <button key={s} onClick={() => setSemester(s)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${semester===s?'text-white':'text-slate-400 hover:text-white'}`}
                style={semester===s?{background:'rgba(26,86,219,0.3)',border:'1px solid rgba(26,86,219,0.5)'}:{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)'}}>
                {s===''?'All':'Sem '+ s}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1,2,3,4,5,6].map(i => <div key={i} className="card h-36 animate-pulse" style={{ background:'rgba(255,255,255,.03)' }}/>)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card p-16 text-center">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="font-bold text-white text-lg mb-2">No courses found</h3>
            <p className="text-slate-400 text-sm">Try a different search</p>
          </div>
        ) : (
          <div>
            {(!semester || semester==='1') && sem1.length > 0 && (
              <div className="mb-7">
                <h2 className="font-bold text-white text-base mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400"/>First Semester
                  <span className="text-slate-500 font-normal text-sm">({sem1.length} courses)</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sem1.map(c => <CourseCard key={c.id} course={c}/>)}
                </div>
              </div>
            )}
            {(!semester || semester==='2') && sem2.length > 0 && (
              <div>
                <h2 className="font-bold text-white text-base mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"/>Second Semester
                  <span className="text-slate-500 font-normal text-sm">({sem2.length} courses)</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sem2.map(c => <CourseCard key={c.id} course={c}/>)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  )
}

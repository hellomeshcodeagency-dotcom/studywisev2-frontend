import { useState, useEffect } from 'react'
import AppShell from '../components/layout/AppShell.jsx'
import api from '../api/axios.js'
import toast from 'react-hot-toast'
import { Download, Bot, Search, Filter } from 'lucide-react'

export default function PastQuestionsPage() {
  const [pqs, setPqs]         = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ course_id:'', semester:'', session:'' })
  const [search, setSearch]   = useState('')
  const [solving, setSolving] = useState(null)
  const [solution, setSolution] = useState({})

  useEffect(() => {
    Promise.all([
      api.get('/uploads/approved', { params:{ type:'past_question' } }),
      api.get('/courses'),
    ]).then(([pqRes, cRes]) => {
      setPqs(pqRes.data.uploads)
      setCourses(cRes.data.courses)
    }).catch(() => toast.error('Failed to load'))
    .finally(() => setLoading(false))
  }, [])

  async function handleDownload(pq) {
    await api.patch(`/uploads/${pq.id}/download`).catch(() => {})
    window.open(pq.file_url, '_blank')
  }

  async function getAISolution(pq) {
    if (solution[pq.id]) return // already solved
    setSolving(pq.id)
    try {
      const res = await api.post('/tutor/solve', {
        question_text: `${pq.title}\n${pq.description || ''}`,
        course_id: pq.course_id,
      })
      setSolution(s => ({ ...s, [pq.id]: res.data.solution }))
    } catch { toast.error('AI error. Try again.') }
    finally { setSolving(null) }
  }

  const filtered = pqs.filter(pq => {
    if (filters.course_id && pq.course_id !== filters.course_id) return false
    if (filters.semester && String(pq.semester) !== filters.semester) return false
    if (filters.session && !pq.session?.includes(filters.session)) return false
    if (search && !pq.title.toLowerCase().includes(search.toLowerCase()) &&
        !pq.course_code?.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="mb-6">
          <h1 className="font-black text-2xl md:text-3xl text-white mb-1">Past Questions 📋</h1>
          <p className="text-slate-400 text-sm">Browse and download past exam questions. Get AI-generated solutions.</p>
        </div>

        {/* Filters */}
        <div className="card p-4 mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search…" className="input-field pl-8 text-sm py-2"/>
            </div>
            <select value={filters.course_id} onChange={e => setFilters(f=>({...f,course_id:e.target.value}))}
              className="input-field text-sm py-2">
              <option value="">All courses</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.code} — {c.title.split('(')[0].trim()}</option>)}
            </select>
            <select value={filters.semester} onChange={e => setFilters(f=>({...f,semester:e.target.value}))}
              className="input-field text-sm py-2">
              <option value="">All semesters</option>
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
            </select>
            <input value={filters.session} onChange={e => setFilters(f=>({...f,session:e.target.value}))}
              placeholder="Session e.g. 2023/2024" className="input-field text-sm py-2"/>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1,2,3,4].map(i => <div key={i} className="card h-24 animate-pulse" style={{ background:'rgba(255,255,255,.03)' }}/>)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card p-16 text-center">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="font-bold text-white text-lg mb-2">No past questions found</h3>
            <p className="text-slate-400 text-sm">Be the first to upload one!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(pq => (
              <div key={pq.id} className="card p-5">
                <div className="flex items-start gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      {pq.course_code && (
                        <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full"
                              style={{ background:'rgba(26,86,219,0.15)', color:'#60A5FA' }}>
                          {pq.course_code}
                        </span>
                      )}
                      {pq.session && <span className="text-[0.65rem] text-slate-500">{pq.session}</span>}
                      {pq.semester && <span className="text-[0.65rem] text-slate-500">· Sem {pq.semester}</span>}
                    </div>
                    <h3 className="font-bold text-white text-sm">{pq.title}</h3>
                    {pq.description && <p className="text-xs text-slate-400 mt-1">{pq.description}</p>}
                    <div className="flex items-center gap-3 mt-1.5 text-[0.65rem] text-slate-600">
                      <span>📤 {pq.uploader_name}</span>
                      <span>⬇️ {pq.downloads} downloads</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => handleDownload(pq)} className="btn-ghost text-xs py-2 px-3 flex items-center gap-1.5">
                      <Download size={13}/> Download
                    </button>
                    <button onClick={() => getAISolution(pq)} disabled={solving===pq.id}
                      className="btn-primary text-xs py-2 px-3 flex items-center gap-1.5">
                      {solving===pq.id
                        ? <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin"/>
                        : <Bot size={13}/>
                      }
                      {solution[pq.id] ? 'View Solution' : 'AI Solution'}
                    </button>
                  </div>
                </div>

                {/* AI Solution */}
                {solution[pq.id] && (
                  <div className="mt-4 pt-4 border-t border-white/8">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot size={13} className="text-blue-400"/>
                      <span className="text-xs font-bold text-blue-400">AI-Generated Solution</span>
                    </div>
                    <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap rounded-xl p-4"
                         style={{ background:'rgba(26,86,219,0.08)', border:'1px solid rgba(26,86,219,0.2)' }}>
                      {solution[pq.id]}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}

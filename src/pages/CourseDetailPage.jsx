import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import AppShell from '../components/layout/AppShell.jsx'
import api from '../api/axios.js'
import toast from 'react-hot-toast'
import { Bot, Download, ChevronLeft, BookOpen, FileText, FileQuestion } from 'lucide-react'

export default function CourseDetailPage() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab]         = useState('overview')

  useEffect(() => {
    api.get(`/courses/${id}`)
      .then(r => setData(r.data))
      .catch(() => { toast.error('Course not found'); navigate('/courses') })
      .finally(() => setLoading(false))
  }, [id])

  function handleDownload(upload) {
    const token = localStorage.getItem('sw_token')
    const base = import.meta.env.VITE_API_URL
    window.open(`${base}/uploads/${upload.id}/download?token=${token}`, '_blank')
  }

  if (loading) return (
    <AppShell>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"/>
      </div>
    </AppShell>
  )

  const { course, resources, past_questions } = data
  const notes    = resources.filter(r => r.type === 'notes')
  const summaries= resources.filter(r => r.type === 'summary')
  const textbooks= resources.filter(r => r.type === 'textbook')

  const tabs = [
    { id:'overview',    label:'Overview' },
    { id:'materials',   label:`Materials (${resources.length})` },
    { id:'past-q',      label:`Past Q (${past_questions.length})` },
  ]

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-8">

        {/* Back */}
        <button onClick={() => navigate('/courses')} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white mb-5 transition-colors">
          <ChevronLeft size={16}/> All Courses
        </button>

        {/* Header */}
        <div className="card p-6 mb-5">
          <div className="flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold px-2.5 py-1 rounded-full inline-block mb-3"
                   style={{ background:'rgba(26,86,219,0.15)', border:'1px solid rgba(26,86,219,0.3)', color:'#60A5FA' }}>
                {course.code} · Semester {course.semester} · {course.credit_units} Unit{course.credit_units!==1?'s':''}
              </div>
              <h1 className="font-black text-xl md:text-2xl text-white mb-2 leading-tight">{course.title}</h1>
              {course.lecturer && <p className="text-sm text-slate-400">👨‍🏫 {course.lecturer}</p>}
              {course.description && <p className="text-sm text-slate-400 mt-2 leading-relaxed">{course.description}</p>}
            </div>
            <Link to={`/tutor?course=${id}`} className="btn-primary text-sm py-2.5 px-4 flex-shrink-0 flex items-center gap-2">
              <Bot size={15}/> Ask AI Tutor
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${tab===t.id?'text-white':'text-slate-400 hover:text-white'}`}
              style={tab===t.id?{background:'rgba(26,86,219,0.3)',border:'1px solid rgba(26,86,219,0.5)'}:{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)'}}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div className="space-y-4">
            {course.objectives?.length > 0 && (
              <div className="card p-5">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2"><BookOpen size={16}/> Learning Objectives</h3>
                <ul className="space-y-2">
                  {course.objectives.map((o, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
                      <span className="text-blue-400 font-bold flex-shrink-0 mt-0.5">{i+1}.</span>{o}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {course.outline?.length > 0 && (
              <div className="card p-5">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">📋 Course Outline</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {course.outline.map((o, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-slate-400 py-1.5 border-b border-white/5">
                      <span className="text-xs font-bold text-slate-600 w-5">{i+1}</span>{o}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {course.textbooks?.length > 0 && (
              <div className="card p-5">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">📚 Recommended Textbooks</h3>
                <ul className="space-y-2">
                  {course.textbooks.map((t, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
                      <span className="text-amber-400 flex-shrink-0">•</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Materials */}
        {tab === 'materials' && (
          <div className="space-y-4">
            {resources.length === 0 ? (
              <div className="card p-12 text-center">
                <div className="text-4xl mb-3">📭</div>
                <h3 className="font-bold text-white mb-2">No materials yet</h3>
                <p className="text-slate-400 text-sm mb-4">Be the first to upload notes for {course.code}!</p>
                <Link to="/upload" className="btn-primary text-sm">Upload Material</Link>
              </div>
            ) : (
              <>
                {[
                  ['📝 Notes', notes],
                  ['📋 Summaries', summaries],
                  ['📚 Textbooks', textbooks],
                  ['📋 Past Questions', resources.filter(r => r.type === 'past_question')]
                ].map(([label, items]) =>
                  items.length > 0 && (
                    <div key={label} className="card p-5">
                      <h3 className="font-bold text-white mb-3 text-sm">{label}</h3>
                      <div className="space-y-2">
                        {items.map(r => (
                          <div key={r.id} className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">
                            <FileText size={16} className="text-slate-500 flex-shrink-0"/>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-white truncate">{r.title}</div>
                              <div className="text-xs text-slate-500">{r.uploader_name} · {r.downloads} downloads</div>
                            </div>
                            <button onClick={() => handleDownload(r)} className="btn-ghost text-xs py-1.5 px-3 flex items-center gap-1">
                              <Download size={12}/> Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </>
            )}
          </div>
        )}

        {/* Past Questions */}
        {tab === 'past-q' && (
          <div className="space-y-3">
            {past_questions.length === 0 && resources.filter(r => r.type === 'past_question').length === 0 ? (
              <div className="card p-12 text-center">
                <div className="text-4xl mb-3">📋</div>
                <h3 className="font-bold text-white mb-2">No past questions yet</h3>
                <p className="text-slate-400 text-sm mb-4">Upload past questions to help your classmates!</p>
                <Link to="/upload" className="btn-primary text-sm">Upload Past Question</Link>
              </div>
            ) : [...past_questions, ...resources.filter(r => r.type === 'past_question' && !past_questions.find(pq => pq.upload_id === r.id))].map(pq => (
              <div key={pq.id} className="card p-5 flex items-center gap-4 flex-wrap">
                <FileQuestion size={18} className="text-blue-400 flex-shrink-0"/>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate">{pq.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {pq.session} · Semester {pq.semester} · {pq.uploader_name}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => window.open(pq.file_url, '_blank')} className="btn-ghost text-xs py-1.5 px-3 flex items-center gap-1">
                    <Download size={12}/> Download
                  </button>
                  {pq.has_ai_solution && (
                    <Link to={`/tutor`} className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1">
                      <Bot size={12}/> AI Solution
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}

import { useState, useEffect } from 'react'
import AppShell from '../components/layout/AppShell.jsx'
import api from '../api/axios.js'
import toast from 'react-hot-toast'
import { Plus, Trash2, Save } from 'lucide-react'

const GRADES   = ['A','B','C','D','E','F']
const GP_MAP   = { A:5, B:4, C:3, D:2, E:1, F:0 }

// FUT Minna 100L first semester courses
const PRESET_S1 = [
  { code:'PHY 101', title:'General Physics I',             credit_units:3 },
  { code:'PHY 107', title:'General Practical Physics I',   credit_units:1 },
  { code:'MTH 101', title:'Elementary Mathematics I',      credit_units:3 },
  { code:'CHM 101', title:'General Chemistry I',           credit_units:3 },
  { code:'COS 101', title:'Introduction to Computing',     credit_units:2 },
  { code:'GST 101', title:'Use of English I',              credit_units:2 },
  { code:'GST 103', title:'Nigerian Peoples and Culture',  credit_units:2 },
]
const PRESET_S2 = [
  { code:'PHY 102', title:'General Physics II',            credit_units:3 },
  { code:'PHY 103', title:'General Physics III',           credit_units:2 },
  { code:'PHY 108', title:'General Practical Physics II',  credit_units:1 },
  { code:'MTH 102', title:'Elementary Mathematics II',     credit_units:3 },
  { code:'CHM 102', title:'General Chemistry II',          credit_units:3 },
  { code:'COS 102', title:'Introduction to Problem Solving',credit_units:2 },
  { code:'GST 102', title:'Use of English II',             credit_units:2 },
  { code:'GST 107', title:'History and Philosophy of Science',credit_units:2 },
]

function calcGPA(courses) {
  let pts = 0, units = 0
  for (const c of courses) {
    if (!c.grade) continue
    pts += (GP_MAP[c.grade]||0) * c.credit_units
    units += c.credit_units
  }
  return units ? (pts/units).toFixed(2) : '—'
}

export default function GpaPage() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [semester, setSemester] = useState('1')
  const [session, setSession]   = useState('2024/2025')
  const [courses, setCourses]   = useState(PRESET_S1.map(c => ({...c, grade:''})))
  const [saving, setSaving]     = useState(false)
  const [activeTab, setActiveTab] = useState('calculator')

  useEffect(() => {
    api.get('/gpa').then(r => setRecords(r.data.records)).catch(() => {})
    .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const preset = semester === '1' ? PRESET_S1 : PRESET_S2
    setCourses(preset.map(c => ({...c, grade:''})))
  }, [semester])

  function setGrade(i, grade) {
    setCourses(c => c.map((x, idx) => idx===i ? {...x, grade} : x))
  }

  async function save() {
    const filled = courses.filter(c => c.grade)
    if (filled.length === 0) { toast.error('Enter at least one grade'); return }
    setSaving(true)
    try {
      const res = await api.post('/gpa', { semester: parseInt(semester), session, level:'100L', courses: filled })
      toast.success(`GPA: ${res.data.gpa} · CGPA: ${res.data.cgpa}`)
      setRecords(r => {
        const existing = r.findIndex(x => x.semester===parseInt(semester) && x.session===session)
        if (existing >= 0) { const n=[...r]; n[existing]=res.data.record; return n }
        return [res.data.record, ...r]
      })
      setActiveTab('history')
    } catch { toast.error('Failed to save. Try again.') }
    finally { setSaving(false) }
  }

  async function deleteRecord(id) {
    await api.delete(`/gpa/${id}`).catch(() => {})
    setRecords(r => r.filter(x => x.id !== id))
  }

  const gpa = calcGPA(courses)

  const gradeBg = (g) => {
    if (g==='A') return 'rgba(16,185,129,0.15)'
    if (g==='B') return 'rgba(59,130,246,0.15)'
    if (g==='C') return 'rgba(245,158,11,0.12)'
    if (g==='D') return 'rgba(249,115,22,0.12)'
    if (g==='F') return 'rgba(239,68,68,0.12)'
    return 'rgba(255,255,255,0.04)'
  }

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="mb-6">
          <h1 className="font-black text-2xl md:text-3xl text-white mb-1">GPA Calculator 📊</h1>
          <p className="text-slate-400 text-sm">Calculate your semester GPA and CGPA using FUT Minna's 5.0 grading scale</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[['calculator','Calculator'],['history','History']].map(([id,label]) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab===id?'text-white':'text-slate-400 hover:text-white'}`}
              style={activeTab===id?{background:'rgba(26,86,219,0.3)',border:'1px solid rgba(26,86,219,0.5)'}:{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)'}}>
              {label}
            </button>
          ))}
        </div>

        {/* Grade reference */}
        <div className="card p-4 mb-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">FUT Minna Grade Points (5.0 Scale)</p>
          <div className="flex gap-3 flex-wrap">
            {Object.entries(GP_MAP).map(([g,p]) => (
              <div key={g} className="flex items-center gap-1.5 text-xs">
                <span className="w-6 h-6 rounded-md flex items-center justify-center font-bold text-white"
                      style={{ background:gradeBg(g) }}>{g}</span>
                <span className="text-slate-500">= {p}.0</span>
              </div>
            ))}
          </div>
        </div>

        {activeTab === 'calculator' && (
          <div>
            {/* Session + Semester */}
            <div className="flex gap-3 mb-5 flex-wrap">
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Session</label>
                <input value={session} onChange={e => setSession(e.target.value)}
                  placeholder="2024/2025" className="input-field"/>
              </div>
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Semester</label>
                <select value={semester} onChange={e => setSemester(e.target.value)} className="input-field">
                  <option value="1">1st Semester</option>
                  <option value="2">2nd Semester</option>
                </select>
              </div>
            </div>

            {/* Course table */}
            <div className="card overflow-hidden mb-5">
              <div className="grid text-[0.7rem] font-bold uppercase tracking-wider text-slate-500 px-5 py-3 border-b border-white/8"
                   style={{ gridTemplateColumns:'1fr 3fr 80px 90px' }}>
                <span>Code</span><span>Course</span><span>Units</span><span>Grade</span>
              </div>
              {courses.map((c, i) => (
                <div key={c.code} className="grid items-center px-5 py-3 border-b border-white/5 last:border-0 gap-2"
                     style={{ gridTemplateColumns:'1fr 3fr 80px 90px' }}>
                  <div className="text-xs font-bold text-blue-400">{c.code}</div>
                  <div className="text-xs text-slate-400 truncate pr-2">{c.title}</div>
                  <div className="text-xs text-white font-semibold">{c.credit_units}</div>
                  <select value={c.grade} onChange={e => setGrade(i, e.target.value)}
                    className="text-xs rounded-lg px-2 py-1.5 outline-none font-bold transition-all"
                    style={{ background:gradeBg(c.grade), border:'1px solid rgba(255,255,255,0.1)', color:'#fff' }}>
                    <option value="">—</option>
                    {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              ))}
            </div>

            {/* GPA display */}
            <div className="card p-5 mb-5 flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="text-slate-400 text-xs mb-1">Semester GPA</div>
                <div className="font-black text-4xl text-white">{gpa}</div>
                <div className="text-xs text-slate-500 mt-1">out of 5.0</div>
              </div>
              {records.length > 0 && (
                <div>
                  <div className="text-slate-400 text-xs mb-1">Current CGPA</div>
                  <div className="font-black text-4xl" style={{ color:'#1A56DB' }}>
                    {records[0]?.cgpa || '—'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">cumulative</div>
                </div>
              )}
              <button onClick={save} disabled={saving} className="btn-primary py-3 px-6">
                {saving
                  ? <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"/>
                  : <><Save size={15}/>Save Record</>
                }
              </button>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            {loading ? (
              <div className="space-y-3">
                {[1,2].map(i => <div key={i} className="card h-32 animate-pulse" style={{ background:'rgba(255,255,255,.03)' }}/>)}
              </div>
            ) : records.length === 0 ? (
              <div className="card p-12 text-center">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="font-bold text-white mb-2">No records yet</h3>
                <p className="text-slate-400 text-sm">Calculate and save your GPA to see your history</p>
                <button onClick={() => setActiveTab('calculator')} className="btn-primary mt-4 text-sm">Open Calculator</button>
              </div>
            ) : records.map(r => (
              <div key={r.id} className="card p-5 mb-3">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-bold text-white">{r.session} · Semester {r.semester}</div>
                    <div className="text-xs text-slate-500">{r.level} · {r.courses.length} courses</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-black text-2xl text-white">{r.gpa}</div>
                      <div className="text-[0.6rem] text-slate-500">GPA</div>
                    </div>
                    <div className="text-center">
                      <div className="font-black text-2xl" style={{ color:'#1A56DB' }}>{r.cgpa}</div>
                      <div className="text-[0.6rem] text-slate-500">CGPA</div>
                    </div>
                    <button onClick={() => deleteRecord(r.id)} className="text-slate-600 hover:text-rose-400 transition-colors p-1">
                      <Trash2 size={15}/>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {r.courses.map(c => (
                    <div key={c.code} className="flex items-center justify-between px-3 py-2 rounded-lg text-xs"
                         style={{ background:'rgba(255,255,255,.04)' }}>
                      <span className="text-slate-400 truncate">{c.code}</span>
                      <span className="font-bold ml-2 flex-shrink-0"
                            style={{ color:c.grade==='A'?'#10B981':c.grade==='B'?'#3B82F6':c.grade==='F'?'#EF4444':'#F59E0B' }}>
                        {c.grade}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}

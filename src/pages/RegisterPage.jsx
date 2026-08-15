import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../api/axios.js'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{label}</label>
      {children}
    </div>
  )
}

export default function RegisterPage() {
  const [form, setForm]     = useState({ name:'', email:'', password:'', matric_no:'', university_id:'', faculty_id:'', department_id:'', level_id:'' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [setup, setSetup]   = useState({ universities:[], faculties:[], departments:[], levels:[] })
  const [filtered, setFiltered] = useState({ faculties:[], departments:[], levels:[] })
  const { login }           = useAuth()
  const navigate            = useNavigate()

  useEffect(() => {
    api.get('/auth/setup').then(r => {
      setSetup(r.data)
      // If only one university, auto-select
      if (r.data.universities.length === 1) {
        setForm(f => ({...f, university_id: r.data.universities[0].id}))
        setFiltered(fi => ({...fi, faculties: r.data.faculties.filter(x => x.university_id === r.data.universities[0].id)}))
      }
    }).catch(() => toast.error('Failed to load setup data'))
  }, [])

  function handleUni(id) {
    setForm(f => ({...f, university_id:id, faculty_id:'', department_id:'', level_id:''}))
    setFiltered(fi => ({...fi, faculties:setup.faculties.filter(x => x.university_id===id), departments:[], levels:[]}))
  }
  function handleFac(id) {
    setForm(f => ({...f, faculty_id:id, department_id:'', level_id:''}))
    setFiltered(fi => ({...fi, departments:setup.departments.filter(x => x.faculty_id===id), levels:[]}))
  }
  function handleDept(id) {
    setForm(f => ({...f, department_id:id, level_id:''}))
    setFiltered(fi => ({...fi, levels:setup.levels.filter(x => x.department_id===id)}))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) { toast.error('Name, email and password required'); return }
    if (!form.university_id || !form.faculty_id || !form.department_id || !form.level_id) {
      toast.error('Please select your university, faculty, department and level'); return
    }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      const res = await api.post('/auth/register', form)
      login(res.data.token, res.data.user)
      toast.success(`Welcome to Studiwise, ${res.data.user.name.split(' ')[0]}! 🎉`)
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background:'#020817' }}>
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 no-underline mb-6">
            <img src="/logo.png" alt="Studiwise" style={{ height:64, width:'auto', background:'#fff', borderRadius:14, padding:7, objectFit:'contain', display:'block' }}/>
          </Link>
          <h1 className="font-black text-2xl text-white mb-2">Create your account</h1>
          <p className="text-slate-400 text-sm">Join Studiwise. Universities Academic Portal</p>
        </div>

        <div className="card p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name">
                <input type="text" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))}
                  placeholder="e.g. Amina Ibrahim" className="input-field" required/>
              </Field>
              <Field label="Matric Number (optional)">
                <input type="text" value={form.matric_no} onChange={e => setForm(f=>({...f,matric_no:e.target.value}))}
                  placeholder="e.g. FUT/SPS/24/001" className="input-field"/>
              </Field>
            </div>

            <Field label="Email Address">
              <input type="email" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))}
                placeholder="your.email@gmail.com" className="input-field" required/>
            </Field>

            <Field label="Password">
              <div className="relative">
                <input type={showPw?'text':'password'} value={form.password}
                  onChange={e => setForm(f=>({...f,password:e.target.value}))}
                  placeholder="Minimum 6 characters" className="input-field pr-11" required/>
                <button type="button" onClick={() => setShowPw(s=>!s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </Field>

            <div className="border-t border-white/8 pt-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Academic Information</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="University">
                  <select value={form.university_id} onChange={e => handleUni(e.target.value)} className="input-field" required>
                    <option value="">Select university</option>
                    {setup.universities.map(u => <option key={u.id} value={u.id}>{u.short_name}</option>)}
                  </select>
                </Field>
                <Field label="Faculty / School">
                  <select value={form.faculty_id} onChange={e => handleFac(e.target.value)} className="input-field" required disabled={!form.university_id}>
                    <option value="">Select faculty</option>
                    {filtered.faculties.map(f => <option key={f.id} value={f.id}>{f.short_name}</option>)}
                  </select>
                </Field>
                <Field label="Department">
                  <select value={form.department_id} onChange={e => handleDept(e.target.value)} className="input-field" required disabled={!form.faculty_id}>
                    <option value="">Select department</option>
                    {filtered.departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </Field>
                <Field label="Level">
                  <select value={form.level_id} onChange={e => setForm(f=>({...f,level_id:e.target.value}))} className="input-field" required disabled={!form.department_id}>
                    <option value="">Select level</option>
                    {filtered.levels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                  </select>
                </Field>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 mt-2">
              {loading
                ? <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"/>
                : '🎓 Create Account'
              }
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 font-semibold no-underline hover:text-blue-300">Log in</Link>
        </p>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../api/axios.js'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [form, setForm]     = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login }           = useAuth()
  const navigate            = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.email || !form.password) { toast.error('All fields required'); return }
    setLoading(true)
    try {
      const res = await api.post('/auth/login', form)
      login(res.data.token, res.data.user)
      toast.success(`Welcome back, ${res.data.user.name.split(' ')[0]}!`)
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background:'#020817' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 no-underline mb-6">
            <img src="/logo.png" alt="Studiwise" className="w-10 h-10 rounded-xl object-contain"/>
          </Link>
          <h1 className="font-black text-2xl text-white mb-2">Welcome back</h1>
          <p className="text-slate-400 text-sm">Log in to your Studiwise account</p>
        </div>

        <div className="card p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                placeholder="you@student.futminna.edu.ng" className="input-field" required/>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm(f => ({...f, password: e.target.value}))}
                  placeholder="Your password" className="input-field pr-11" required/>
                <button type="button" onClick={() => setShowPw(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 mt-2">
              {loading ? <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"/> : 'Log In'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 font-semibold no-underline hover:text-blue-300">Create one</Link>
        </p>
      </div>
    </div>
  )
}

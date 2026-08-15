import { useState, useEffect, useRef } from 'react'
import AppShell from '../components/layout/AppShell.jsx'
import api from '../api/axios.js'
import toast from 'react-hot-toast'
import { Upload, CheckCircle, Clock, XCircle, FileText, Trash2 } from 'lucide-react'

const TYPE_LABELS = { past_question:'Past Question', notes:'Lecture Notes', summary:'Summary', textbook:'Textbook' }
const STATUS_ICONS = { pending:<Clock size={13} className="text-amber-400"/>, approved:<CheckCircle size={13} className="text-emerald-400"/>, rejected:<XCircle size={13} className="text-rose-400"/> }

export default function UploadPage() {
  const [courses, setCourses]       = useState([])
  const [myUploads, setMyUploads]   = useState([])
  const [loading, setLoading]       = useState(true)
  const [uploading, setUploading]   = useState(false)
  const [file, setFile]             = useState(null)
  const [form, setForm]             = useState({ course_id:'', type:'past_question', title:'', description:'', semester:'', session:'' })
  const fileRef = useRef(null)

  useEffect(() => {
    Promise.all([api.get('/courses'), api.get('/uploads/mine')])
      .then(([c, u]) => { setCourses(c.data.courses); setMyUploads(u.data.uploads) })
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  function handleFile(f) {
    if (!f) return
    const ext = f.name.split('.').pop().toLowerCase()
    if (!['pdf','doc','docx','pptx','txt'].includes(ext)) { toast.error('Only PDF, Word, PowerPoint and TXT files allowed'); return }
    if (f.size > 20*1024*1024) { toast.error('File too large. Max 20MB'); return }
    setFile(f)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!file) { toast.error('Please select a file'); return }
    if (!form.title.trim()) { toast.error('Title is required'); return }
    if (!form.type) { toast.error('Select upload type'); return }

    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      Object.entries(form).forEach(([k, v]) => { if (v) fd.append(k, v) })
      const res = await api.post('/uploads', fd, { headers:{ 'Content-Type':'multipart/form-data' } })
      setMyUploads(u => [res.data.upload, ...u])
      setFile(null); setForm({ course_id:'', type:'past_question', title:'', description:'', semester:'', session:'' })
      toast.success('Uploaded! Pending admin review.')
    } catch (e) {
      toast.error(e.response?.data?.error || 'Upload failed. Try again.')
    } finally { setUploading(false) }
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="mb-6">
          <h1 className="font-black text-2xl md:text-3xl text-white mb-1">Upload Material ⬆️</h1>
          <p className="text-slate-400 text-sm">Share lecture notes, past questions and summaries with your classmates. Uploads are reviewed before going live.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Upload form */}
          <div className="lg:col-span-3">
            <div className="card p-6">
              <h2 className="font-bold text-white mb-5">New Upload</h2>
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* File drop */}
                <div onClick={() => fileRef.current?.click()} onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]) }}
                  className="rounded-xl border-2 border-dashed p-7 text-center cursor-pointer transition-all"
                  style={{ borderColor:file?'rgba(26,86,219,0.5)':'rgba(255,255,255,0.12)', background:file?'rgba(26,86,219,0.06)':'rgba(255,255,255,0.02)' }}>
                  {file ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText size={20} className="text-blue-400"/>
                      <div className="text-left">
                        <div className="text-sm font-semibold text-white">{file.name}</div>
                        <div className="text-xs text-slate-500">{(file.size/1024).toFixed(0)} KB</div>
                      </div>
                      <button type="button" onClick={e => { e.stopPropagation(); setFile(null) }}
                        className="text-slate-500 hover:text-rose-400 ml-2"><XCircle size={16}/></button>
                    </div>
                  ) : (
                    <>
                      <Upload size={24} className="text-slate-600 mx-auto mb-2"/>
                      <p className="text-sm font-semibold text-white mb-1">Drop file or click to upload</p>
                      <p className="text-xs text-slate-500">PDF · Word · PowerPoint · TXT · max 20MB</p>
                    </>
                  )}
                  <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.pptx,.txt" className="hidden"
                    onChange={e => handleFile(e.target.files[0])}/>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Upload Type</label>
                  <select value={form.type} onChange={e => setForm(f=>({...f,type:e.target.value}))} className="input-field">
                    {Object.entries(TYPE_LABELS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Title *</label>
                  <input type="text" value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))}
                    placeholder="e.g. PHY 101 Past Questions 2023/2024" className="input-field" required/>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Course (optional)</label>
                  <select value={form.course_id} onChange={e => setForm(f=>({...f,course_id:e.target.value}))} className="input-field">
                    <option value="">Select course</option>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.code} — {c.title.split('(')[0].trim()}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Semester</label>
                    <select value={form.semester} onChange={e => setForm(f=>({...f,semester:e.target.value}))} className="input-field">
                      <option value="">Any</option>
                      <option value="1">1st Semester</option>
                      <option value="2">2nd Semester</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Session</label>
                    <input type="text" value={form.session} onChange={e => setForm(f=>({...f,session:e.target.value}))}
                      placeholder="e.g. 2023/2024" className="input-field"/>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description (optional)</label>
                  <textarea value={form.description} onChange={e => setForm(f=>({...f,description:e.target.value}))}
                    placeholder="Brief description of the content…" rows={3} className="input-field resize-none text-sm"/>
                </div>

                <button type="submit" disabled={uploading} className="btn-primary w-full justify-center py-3">
                  {uploading
                    ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"/>Uploading…</>
                    : <><Upload size={15}/>Submit for Review</>
                  }
                </button>

                <p className="text-xs text-slate-600 text-center">
                  All uploads are reviewed by admin before becoming visible to other students.
                </p>
              </form>
            </div>
          </div>

          {/* My uploads */}
          <div className="lg:col-span-2">
            <div className="card p-5">
              <h3 className="font-bold text-white mb-4 text-sm">My Uploads ({myUploads.length})</h3>
              {loading ? (
                <div className="space-y-2">
                  {[1,2,3].map(i => <div key={i} className="h-14 rounded-lg animate-pulse" style={{ background:'rgba(255,255,255,.04)' }}/>)}
                </div>
              ) : myUploads.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">No uploads yet</p>
              ) : (
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {myUploads.map(u => (
                    <div key={u.id} className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
                      <FileText size={14} className="text-slate-500 flex-shrink-0 mt-0.5"/>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-white truncate">{u.title}</div>
                        <div className="text-[0.62rem] text-slate-600">{TYPE_LABELS[u.type]}</div>
                        <div className="flex items-center gap-1.5 mt-1">
                          {STATUS_ICONS[u.status]}
                          <span className={`text-[0.6rem] font-bold capitalize ${u.status==='approved'?'text-emerald-400':u.status==='rejected'?'text-rose-400':'text-amber-400'}`}>
                            {u.status}
                          </span>
                        </div>
                        {u.admin_note && u.status==='rejected' && (
                          <div className="text-[0.62rem] text-rose-400 mt-0.5">{u.admin_note}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

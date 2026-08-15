import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import AppShell from '../components/layout/AppShell.jsx'
import api from '../api/axios.js'
import toast from 'react-hot-toast'
import { Send, Plus, Trash2, Bot } from 'lucide-react'

const SUGGESTIONS = [
  "Explain Newton's First Law of Motion",
  "What is the difference between speed and velocity?",
  "Help me understand PHY 101 — Properties of Matter",
  "Solve: A car accelerates from 0 to 60 km/h in 10 seconds. Find acceleration.",
  "Explain Ohm's Law with an example",
  "What topics are covered in MTH 101?",
  "Summarise the key concepts of CHM 101",
  "What is electromagnetic induction?",
]

export default function TutorPage() {
  const [searchParams]            = useSearchParams()
  const [courses, setCourses]     = useState([])
  const [selectedCourse, setCourse] = useState(searchParams.get('course') || '')
  const [convos, setConvos]       = useState([])
  const [activeConvo, setActive]  = useState(null)
  const [messages, setMessages]   = useState([])
  const [input, setInput]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [loadingConvos, setLoadingConvos] = useState(true)
  const bottomRef = useRef(null)

  useEffect(() => {
    api.get('/courses').then(r => setCourses(r.data.courses)).catch(() => {})
    loadConvos()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function loadConvos() {
    setLoadingConvos(true)
    try {
      const r = await api.get('/tutor/conversations')
      setConvos(r.data.conversations)
    } catch {} finally { setLoadingConvos(false) }
  }

  async function loadConvo(id) {
    try {
      const r = await api.get(`/tutor/conversations/${id}`)
      setActive(id)
      setMessages(r.data.conversation.messages || [])
      if (r.data.conversation.course_id) setCourse(r.data.conversation.course_id)
    } catch { toast.error('Failed to load conversation') }
  }

  function newChat() { setActive(null); setMessages([]); setInput('') }

  async function deleteConvo(id, e) {
    e.stopPropagation()
    await api.delete(`/tutor/conversations/${id}`).catch(() => {})
    setConvos(c => c.filter(x => x.id !== id))
    if (activeConvo === id) newChat()
  }

  async function send(text = input) {
    const msg = text.trim()
    if (!msg || loading) return
    setInput('')
    setLoading(true)
    setMessages(m => [...m, { role: 'user', content: msg }])

    try {
      const res = await api.post('/tutor/chat', {
        message: msg,
        conversation_id: activeConvo,
        course_id: selectedCourse || null,
      })
      setMessages(m => [...m, { role: 'assistant', content: res.data.reply }])
      if (!activeConvo) {
        setActive(res.data.conversation_id)
        loadConvos()
      }
    } catch (e) {
      toast.error(e.response?.data?.error || 'AI error. Try again.')
      setMessages(m => m.slice(0, -1))
    } finally { setLoading(false) }
  }

  return (
    <AppShell>
      <div className="flex h-[calc(100vh-56px)] md:h-screen overflow-hidden">

        {/* Sidebar — conversation history */}
        <aside className="hidden md:flex flex-col w-64 border-r border-white/8 flex-shrink-0" style={{ background:'#0A0F1E' }}>
          <div className="p-4 border-b border-white/8">
            <button onClick={newChat} className="btn-primary w-full justify-center text-sm py-2.5">
              <Plus size={15}/> New Chat
            </button>
          </div>

          {/* Course filter */}
          <div className="px-4 py-3 border-b border-white/8">
            <select value={selectedCourse} onChange={e => setCourse(e.target.value)}
              className="input-field text-xs py-2">
              <option value="">All courses</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.code}</option>)}
            </select>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            {loadingConvos ? (
              <div className="space-y-2 px-3">
                {[1,2,3].map(i => <div key={i} className="h-10 rounded-lg animate-pulse" style={{ background:'rgba(255,255,255,.04)' }}/>)}
              </div>
            ) : convos.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6 px-4">No conversations yet. Start by asking a question!</p>
            ) : convos.map(c => (
              <div key={c.id} onClick={() => loadConvo(c.id)}
                className={`flex items-center gap-2 mx-2 px-3 py-2.5 rounded-xl cursor-pointer group transition-colors ${activeConvo===c.id?'bg-blue-500/20':'hover:bg-white/5'}`}>
                <Bot size={13} className="text-slate-500 flex-shrink-0"/>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-white truncate">{c.title}</div>
                  {c.course_code && <div className="text-[0.6rem] text-slate-500">{c.course_code}</div>}
                </div>
                <button onClick={e => deleteConvo(c.id, e)}
                  className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-rose-400 transition-all">
                  <Trash2 size={12}/>
                </button>
              </div>
            ))}
          </div>
        </AppShell>

        {/* Main chat */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/8 flex-shrink-0"
               style={{ background:'#0A0F1E' }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background:'rgba(26,86,219,0.2)' }}>
                <Bot size={16} className="text-blue-400"/>
              </div>
              <div>
                <div className="text-sm font-bold text-white">StudiWise AI Tutor</div>
                <div className="text-[0.62rem] text-slate-500">Physics · FUT Minna · 100L</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select value={selectedCourse} onChange={e => setCourse(e.target.value)}
                className="input-field text-xs py-1.5 w-auto" style={{ minWidth:'120px' }}>
                <option value="">No course</option>
                {courses.map(c => <option key={c.id} value={c.id}>{c.code}</option>)}
              </select>
              <button onClick={newChat} className="btn-ghost text-xs py-1.5 px-3 md:flex hidden">
                <Plus size={13}/>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-4">
            {messages.length === 0 ? (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8 pt-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background:'rgba(26,86,219,0.15)' }}>
                    <Bot size={28} className="text-blue-400"/>
                  </div>
                  <h2 className="font-black text-white text-xl mb-2">StudiWise AI Tutor</h2>
                  <p className="text-slate-400 text-sm">
                    Ask me anything about your 100L Physics courses at FUT Minna. I only answer academic questions related to your curriculum.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SUGGESTIONS.map(s => (
                    <button key={s} onClick={() => send(s)}
                      className="text-left px-4 py-3 rounded-xl text-sm text-slate-400 hover:text-white transition-all"
                      style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto w-full space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role==='user'?'justify-end':''}`}>
                    {m.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-0.5" style={{ background:'rgba(26,86,219,0.2)' }}>
                        <Bot size={13} className="text-blue-400"/>
                      </div>
                    )}
                    <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${m.role==='user'?'text-white':'text-slate-300'}`}
                      style={m.role==='user'
                        ? { background:'rgba(26,86,219,0.8)' }
                        : { background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)' }}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{ background:'rgba(26,86,219,0.2)' }}>
                      <Bot size={13} className="text-blue-400"/>
                    </div>
                    <div className="px-4 py-3 rounded-2xl" style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)' }}>
                      <div className="flex gap-1.5">
                        {[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay:`${i*0.15}s` }}/>)}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef}/>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-4 md:px-6 py-4 border-t border-white/8 flex-shrink-0" style={{ background:'#0A0F1E' }}>
            <div className="max-w-3xl mx-auto flex gap-3">
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key==='Enter' && !e.shiftKey && send()}
                placeholder="Ask about PHY 101, MTH 102, CHM 101…"
                className="input-field flex-1"/>
              <button onClick={() => send()} disabled={loading || !input.trim()}
                className="btn-primary py-2.5 px-4 flex-shrink-0">
                <Send size={16}/>
              </button>
            </div>
            <p className="text-[0.62rem] text-slate-600 text-center mt-2">
              Only answers academic questions related to your 100L Physics curriculum
            </p>
          </div>

        </div>
      </div>
    </AppShell>
  )
}

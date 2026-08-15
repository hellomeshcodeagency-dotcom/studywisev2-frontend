import { Link } from 'react-router-dom'

export default function LandingPage() {
  const features = [
    { icon:'🤖', title:'AI Physics Tutor', desc:'Ask any question about your courses. Get instant, accurate answers referencing your FUT Minna syllabus.' },
    { icon:'📋', title:'Past Question Library', desc:'Browse and download past exam questions. AI-generated solutions for every question.' },
    { icon:'📖', title:'Course Dashboard', desc:'All 100L Physics courses — outlines, objectives, recommended textbooks in one place.' },
    { icon:'📊', title:'GPA Calculator', desc:'Calculate your semester GPA and cumulative CGPA using FUT Minna\'s 5.0 grading scale.' },
    { icon:'⬆️', title:'Student Uploads', desc:'Share lecture notes, summaries and past questions with your department. Help each other succeed.' },
    { icon:'🔍', title:'Smart Search', desc:'Search across courses, past questions and uploaded materials instantly.' },
  ]

  const stats = [
    { value:'15', label:'Courses Covered' },
    { value:'100L', label:'Physics, FUT Minna' },
    { value:'AI', label:'Powered Tutor' },
    { value:'Free', label:'To Use' },
  ]

  return (
    <div className="min-h-screen" style={{ background:'#020817' }}>

      {/* Navbar */}
      <nav className="border-b border-white/8 sticky top-0 z-50" style={{ background:'rgba(2,8,23,0.95)', backdropFilter:'blur(20px)' }}>
        <div className="page-container flex items-center justify-between py-4">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Studiwise" className="w-8 h-8 rounded-lg object-contain"/>
            <div>
              <div className="font-black text-white text-lg leading-tight">Studiwise</div>
              <div className="text-[0.6rem] text-blue-400 font-semibold -mt-0.5">FUT Minna</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-ghost text-sm py-2 px-4">Log in</Link>
            <Link to="/register" className="btn-primary text-sm py-2 px-4">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="page-container py-20 md:py-28 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
             style={{ background:'rgba(26,86,219,0.15)', border:'1px solid rgba(26,86,219,0.3)', color:'#60A5FA' }}>
          🎓 Built exclusively for FUT Minna Physics Students
        </div>
        <h1 className="font-black text-4xl md:text-6xl text-white leading-tight mb-6" style={{ letterSpacing:'-0.02em' }}>
          Your Academic
          <span className="block" style={{ color:'#1A56DB' }}>Operating System</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Everything a 100-Level Physics student at FUT Minna needs to succeed — AI tutor, past questions, GPA calculator, course materials and more. All in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/register" className="btn-primary text-base py-3.5 px-8">
            🚀 Get Started Free
          </Link>
          <Link to="/login" className="btn-ghost text-base py-3.5 px-8">
            Already have an account
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/8" style={{ background:'#0A0F1E' }}>
        <div className="page-container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(s => (
              <div key={s.label}>
                <div className="font-black text-3xl md:text-4xl text-white mb-1">{s.value}</div>
                <div className="text-sm text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="page-container py-20">
        <div className="text-center mb-12">
          <h2 className="font-black text-3xl md:text-4xl text-white mb-4">Everything you need to excel</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Built specifically for the FUT Minna Physics curriculum. Not a generic study app.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(f => (
            <div key={f.title} className="card p-6 hover:border-blue-500/30 transition-all">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-white text-base mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="page-container pb-20">
        <div className="rounded-2xl p-10 md:p-16 text-center" style={{ background:'rgba(26,86,219,0.1)', border:'1px solid rgba(26,86,219,0.25)' }}>
          <h2 className="font-black text-3xl md:text-4xl text-white mb-4">Ready to study smarter?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">Join your fellow Physics students at FUT Minna. Free to use. No credit card needed.</p>
          <Link to="/register" className="btn-primary text-base py-3.5 px-10 inline-flex">
            🎓 Create Your Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 py-8" style={{ background:'#0A0F1E' }}>
        <div className="page-container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Studiwise" className="w-6 h-6 rounded object-contain"/>
            <span className="font-bold text-white text-sm">Studiwise</span>
            <span className="text-slate-600 text-xs">· FUT Minna Academic Portal</span>
          </div>
          <p className="text-slate-600 text-xs">Built for Physics students. SPS, FUT Minna.</p>
        </div>
      </footer>
    </div>
  )
}

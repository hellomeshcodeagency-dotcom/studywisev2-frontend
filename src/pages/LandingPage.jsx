import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const features = [
  { icon: '📋', title: 'Past Question Bank', desc: 'Browse and download years of past exam questions across all your courses. The easiest way to prepare for exams.' },
  { icon: '📖', title: 'Course Materials', desc: 'All your course outlines, objectives, credit units and recommended textbooks — organized and ready to access.' },
  { icon: '📊', title: 'GPA Calculator', desc: 'Calculate your semester GPA and cumulative CGPA instantly using your school\'s official grading scale.' },
  { icon: '⬆️', title: 'Student Uploads', desc: 'Share lecture notes, summaries and study materials with your department. Learn better together.' },
  { icon: '💬', title: 'Study Assistant', desc: 'Stuck on a topic? Get clear explanations and worked examples for anything in your course syllabus.' },
  { icon: '🔍', title: 'Smart Search', desc: 'Find courses, past questions and study materials instantly — everything in one search.' },
]

const testimonials = [
  { name: 'Amaka O.', dept: 'Physics, 100L', avatar: 'A', quote: 'I downloaded 3 years of past questions for PHY 101 in under 5 minutes. My friends were still looking for them on WhatsApp two days later.' },
  { name: 'Tunde B.', dept: 'Physics, 100L', avatar: 'T', quote: 'The GPA calculator alone saved me. I finally know exactly what grades I need this semester to hit a 4.5 CGPA.' },
  { name: 'Fatima K.', dept: 'Physics, 100L', avatar: 'F', quote: 'I uploaded my MTH 101 notes and my whole class thanked me. This is what we needed — one place for everything.' },
]

const universities = ['FUT Minna', 'UNILAG', 'OAU', 'ABU Zaria', 'UNIBEN', 'UNIPORT']

const gpaPreviews = [
  { code: 'PHY 101', grade: 'A', units: 3, points: 15 },
  { code: 'MTH 101', grade: 'B', units: 3, points: 12 },
  { code: 'CHM 101', grade: 'A', units: 3, points: 15 },
  { code: 'COS 101', grade: 'B', units: 2, points: 8 },
]

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = Math.ceil(target / 60)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 24)
    return () => clearInterval(timer)
  }, [target])
  return <span>{count.toLocaleString()}{suffix}</span>
}

export default function LandingPage() {
  const totalPoints = gpaPreviews.reduce((a, b) => a + b.points, 0)
  const totalUnits = gpaPreviews.reduce((a, b) => a + b.units, 0)
  const gpa = (totalPoints / totalUnits).toFixed(2)

  return (
    <div style={{ minHeight: '100vh', background: '#04050f', color: '#F1F5F9', fontFamily: 'Inter, sans-serif' }}>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(4,5,15,0.9)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="/logo.png" alt="Studiwise" style={{ height: 44, width: 'auto', objectFit: 'contain', background: '#fff', borderRadius: 10, padding: 5 }} />
            <span style={{ fontWeight: 900, fontSize: '1.25rem', color: '#fff', letterSpacing: '-0.02em' }}>Studiwise</span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Link to="/login" style={{ padding: '9px 20px', borderRadius: 10, fontWeight: 600, fontSize: '0.875rem', color: '#94A3B8', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none' }}>Log in</Link>
            <Link to="/register" style={{ padding: '9px 20px', borderRadius: 10, fontWeight: 700, fontSize: '0.875rem', color: '#fff', background: '#1A56DB', textDecoration: 'none', boxShadow: '0 0 24px rgba(26,86,219,0.4)' }}>Get Started Free</Link>
          </div>
        </div>
      </nav>

      {/* FOMO BAR */}
      <div style={{ background: 'rgba(26,86,219,0.15)', borderBottom: '1px solid rgba(26,86,219,0.25)', padding: '10px 24px', textAlign: 'center' }}>
        <span style={{ fontSize: '0.82rem', color: '#93C5FD' }}>
          🔥 <strong style={{ color: '#fff' }}>847 students</strong> from your department joined this week — don't get left behind
        </span>
      </div>

      {/* PROBLEM SECTION */}
      <section style={{ padding: '64px 24px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Sound familiar?</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 32 }}>
            Scattered WhatsApp groups.<br />Missing lecture notes.<br />
            <span style={{ color: '#EF4444' }}>No idea what your GPA is.</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 40, textAlign: 'left' }}>
            {[
              { pain: '"Anyone have PHY 101 past questions?"', icon: '😩' },
              { pain: '"Where do I find the course outline?"', icon: '😕' },
              { pain: '"I don\'t even know my CGPA right now"', icon: '😰' },
              { pain: '"My notes are everywhere — phone, WhatsApp, email..."', icon: '🤯' },
            ].map((p, i) => (
              <div key={i} style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: 8 }}>{p.icon}</div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.55, fontStyle: 'italic' }}>{p.pain}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#60A5FA', marginBottom: 8 }}>That ends today.</div>
          <p style={{ color: '#475569', fontSize: '0.95rem' }}>Studiwise puts everything in one place so you can focus on what matters — actually studying.</p>
        </div>
      </section>

      {/* HERO */}
      <section style={{ padding: '64px 24px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(26,86,219,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 99, marginBottom: 28, background: 'rgba(26,86,219,0.12)', border: '1px solid rgba(26,86,219,0.35)', color: '#60A5FA', fontSize: '0.8rem', fontWeight: 700 }}>
            ✦ The Academic Portal for University Students
          </div>
          <h1 style={{ fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', fontSize: 'clamp(2.8rem, 7vw, 5rem)', marginBottom: 16 }}>
            Everything you need<br />
            <span style={{ background: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 50%, #818CF8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>to ace your exams.</span>
          </h1>
          {/* STRONG CTA HOOK */}
          <div style={{ fontSize: '1.05rem', color: '#F59E0B', fontWeight: 700, marginBottom: 12 }}>
            ⚠️ Your exams are closer than you think. Are you ready?
          </div>
          <p style={{ color: '#64748B', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto 36px' }}>
            Past questions, course materials, GPA tracking and student uploads — all in one place. Free to use. No excuses.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 16 }}>
            <Link to="/register" style={{ padding: '15px 32px', borderRadius: 12, fontWeight: 800, fontSize: '1rem', color: '#fff', background: '#1A56DB', textDecoration: 'none', boxShadow: '0 0 40px rgba(26,86,219,0.45)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              🚀 Start For Free — Takes 30 Seconds
            </Link>
            <Link to="/login" style={{ padding: '15px 32px', borderRadius: 12, fontWeight: 700, fontSize: '1rem', color: '#94A3B8', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none' }}>
              I have an account
            </Link>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#334155' }}>No credit card. No hidden fees. Just sign up and go.</div>
        </div>

        {/* Dashboard mockup */}
        <div style={{ maxWidth: 720, margin: '56px auto 0', background: '#0D1117', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden', boxShadow: '0 60px 120px rgba(0,0,0,0.7)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0A0E1A' }}>
            {['#EF4444','#F59E0B','#10B981'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
            <span style={{ fontSize: '0.72rem', color: '#334155', marginLeft: 8 }}>Studiwise — Dashboard</span>
          </div>
          <div style={{ padding: '24px 20px', textAlign: 'left' }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: '0.75rem', color: '#475569', marginBottom: 4 }}>Good morning 👋</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#F1F5F9' }}>Welcome back, Amaka</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
              {[{ label: 'Courses', value: '7', color: '#1A56DB' }, { label: 'Past Questions', value: '42', color: '#10B981' }, { label: 'Current GPA', value: '4.2', color: '#F59E0B' }].map(s => (
                <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '12px 14px' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: '0.7rem', color: '#475569', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Courses</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[{ code: 'PHY 101', title: 'Mechanics & Properties of Matter', units: 3 }, { code: 'MTH 101', title: 'Elementary Mathematics I', units: 3 }, { code: 'CHM 101', title: 'General Chemistry I', units: 3 }].map(c => (
                <div key={c.code} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#F1F5F9' }}>{c.code}</div>
                    <div style={{ fontSize: '0.68rem', color: '#475569' }}>{c.title}</div>
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#1A56DB', fontWeight: 600, background: 'rgba(26,86,219,0.12)', padding: '3px 8px', borderRadius: 6 }}>{c.units} units</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#080B18', padding: '40px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, textAlign: 'center' }}>
          {[{ target: 10000, suffix: '+', label: 'Students Served' }, { target: 500, suffix: '+', label: 'Past Questions' }, { target: 15, suffix: '+', label: 'Courses Covered' }, { target: 100, suffix: '%', label: 'Free to Start' }].map(s => (
            <div key={s.label}>
              <div style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#fff', marginBottom: 6 }}>
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: '0.8rem', color: '#475569' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* UNIVERSITIES */}
      <section style={{ padding: '48px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: '0.75rem', color: '#334155', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>Trusted by students across Nigerian universities</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {universities.map(u => (
              <div key={u} style={{ padding: '8px 20px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>
                🎓 {u}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', letterSpacing: '-0.03em', marginBottom: 12 }}>Everything in one place</h2>
            <p style={{ color: '#475569', maxWidth: 460, margin: '0 auto' }}>No more switching between apps, WhatsApp groups, and random PDFs.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {features.map((f, i) => (
              <div key={f.title} style={{ background: '#0D1117', border: `1px solid ${i === 0 ? 'rgba(26,86,219,0.5)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 18, padding: '28px 24px', boxShadow: i === 0 ? '0 0 40px rgba(26,86,219,0.08)' : 'none' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 10, color: '#F1F5F9' }}>{f.title}</h3>
                <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE PREVIEWS */}
      <section style={{ padding: '0 24px 80px', background: '#080B18', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', paddingTop: 72 }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', letterSpacing: '-0.03em', marginBottom: 12 }}>See it in action</h2>
            <p style={{ color: '#475569' }}>Real features, not just promises.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>

            {/* GPA Calculator Preview */}
            <div style={{ background: '#0D1117', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0A0E1A', fontSize: '0.72rem', color: '#475569', fontWeight: 600 }}>📊 GPA Calculator</div>
              <div style={{ padding: 18 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                  {gpaPreviews.map(g => (
                    <div key={g.code} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, fontSize: '0.78rem' }}>
                      <span style={{ color: '#94A3B8', fontWeight: 600 }}>{g.code}</span>
                      <span style={{ color: '#10B981', fontWeight: 700 }}>{g.grade}</span>
                      <span style={{ color: '#475569' }}>{g.units} units</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'rgba(26,86,219,0.12)', border: '1px solid rgba(26,86,219,0.25)', borderRadius: 10, padding: '12px 16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748B', marginBottom: 4 }}>Your GPA</div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#60A5FA' }}>{gpa}</div>
                  <div style={{ fontSize: '0.68rem', color: '#475569' }}>out of 5.0</div>
                </div>
              </div>
            </div>

            {/* Past Questions Preview */}
            <div style={{ background: '#0D1117', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0A0E1A', fontSize: '0.72rem', color: '#475569', fontWeight: 600 }}>📋 Past Questions</div>
              <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[{ course: 'PHY 101', year: '2023', type: 'Exam', pages: 4 }, { course: 'MTH 101', year: '2022', type: 'Exam', pages: 6 }, { course: 'CHM 101', year: '2023', type: 'Test', pages: 2 }, { course: 'PHY 101', year: '2021', type: 'Exam', pages: 5 }].map((q, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#F1F5F9' }}>{q.course} — {q.year}</div>
                      <div style={{ fontSize: '0.68rem', color: '#475569' }}>{q.type} · {q.pages} pages</div>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 700, background: 'rgba(16,185,129,0.1)', padding: '4px 10px', borderRadius: 6 }}>↓ PDF</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile mockup */}
            <div style={{ background: '#0D1117', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0A0E1A', fontSize: '0.72rem', color: '#475569', fontWeight: 600 }}>📱 Works on Your Phone</div>
              <div style={{ padding: 18, display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 160, background: '#0A0E1A', borderRadius: 24, border: '4px solid rgba(255,255,255,0.1)', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                  {/* phone notch */}
                  <div style={{ height: 20, background: '#0D1117', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: 40, height: 5, background: 'rgba(255,255,255,0.1)', borderRadius: 99 }} />
                  </div>
                  <div style={{ padding: '12px 10px' }}>
                    <div style={{ fontSize: '0.6rem', color: '#475569', marginBottom: 8 }}>Good morning 👋</div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fff', marginBottom: 12 }}>Hi, Amaka</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 12 }}>
                      {[{ l: 'GPA', v: '4.2', c: '#F59E0B' }, { l: 'Courses', v: '7', c: '#1A56DB' }, { l: 'Uploads', v: '3', c: '#10B981' }, { l: 'Streak', v: '5d', c: '#EF4444' }].map(s => (
                        <div key={s.l} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '8px 6px', textAlign: 'center' }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: 900, color: s.c }}>{s.v}</div>
                          <div style={{ fontSize: '0.5rem', color: '#475569' }}>{s.l}</div>
                        </div>
                      ))}
                    </div>
                    {/* bottom nav */}
                    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '8px 0', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 8 }}>
                      {['🏠','📖','📋','📊'].map((ic, i) => (
                        <div key={i} style={{ fontSize: i === 0 ? '0.9rem' : '0.75rem', opacity: i === 0 ? 1 : 0.4 }}>{ic}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'center', paddingBottom: 16, fontSize: '0.75rem', color: '#334155' }}>Mobile-friendly. Use it anywhere.</div>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', letterSpacing: '-0.03em', marginBottom: 12 }}>Students love it</h2>
            <p style={{ color: '#475569' }}>Don't take our word for it.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: '#0D1117', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '28px 24px' }}>
                <div style={{ fontSize: '1.4rem', color: '#F59E0B', marginBottom: 16, letterSpacing: 2 }}>★★★★★</div>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>"{t.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#1A56DB,#818CF8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#fff', fontSize: '0.9rem', flexShrink: 0 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#F1F5F9' }}>{t.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#475569' }}>{t.dept}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '0 24px 80px', background: '#080B18', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', paddingTop: 72 }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', letterSpacing: '-0.03em', marginBottom: 12 }}>Ready in 30 seconds</h2>
            <p style={{ color: '#475569' }}>No lengthy setup. Create an account and you're in.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 32 }}>
            {[
              { n: '01', title: 'Create your account', desc: 'Sign up with your university details in under a minute. No credit card needed.' },
              { n: '02', title: 'Access your courses', desc: 'Your department courses are pre-loaded — past questions, outlines, everything.' },
              { n: '03', title: 'Study and excel', desc: 'Download past questions, track your GPA, upload notes. Exam season sorted.' },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', gap: 16 }}>
                <div style={{ fontWeight: 900, fontSize: '2.2rem', color: 'rgba(26,86,219,0.35)', lineHeight: 1, flexShrink: 0 }}>{s.n}</div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 8, color: '#F1F5F9' }}>{s.title}</h3>
                  <p style={{ color: '#475569', fontSize: '0.82rem', lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRONG CTA */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ borderRadius: 24, padding: '64px 40px', background: 'linear-gradient(135deg, rgba(26,86,219,0.2) 0%, rgba(99,102,241,0.1) 100%)', border: '1px solid rgba(26,86,219,0.3)', boxShadow: '0 0 80px rgba(26,86,219,0.1)' }}>
            <div style={{ fontSize: '0.8rem', color: '#F59E0B', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>⚠️ Don't wait until the night before</div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', letterSpacing: '-0.03em', marginBottom: 16 }}>
              Your coursemates are already in.<br />Are you?
            </h2>
            <p style={{ color: '#64748B', marginBottom: 36, lineHeight: 1.7 }}>
              Every day without Studiwise is a day your peers are getting ahead. Join free — it only takes 30 seconds.
            </p>
            <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 40px', borderRadius: 12, fontWeight: 800, fontSize: '1.05rem', color: '#fff', background: '#1A56DB', textDecoration: 'none', boxShadow: '0 0 40px rgba(26,86,219,0.5)' }}>
              Join Free Now →
            </Link>
            <div style={{ fontSize: '0.75rem', color: '#1E293B', marginTop: 16 }}>No credit card. No hidden fees. Cancel anytime.</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#080B18', padding: '28px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/logo.png" alt="Studiwise" style={{ height: 36, width: 'auto', objectFit: 'contain', background: '#fff', borderRadius: 8, padding: 4 }} />
            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff' }}>Studiwise</span>
          </div>
          <p style={{ color: '#1E293B', fontSize: '0.8rem' }}>© 2025 Studiwise. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}

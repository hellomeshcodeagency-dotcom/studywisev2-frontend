import { Link } from 'react-router-dom'

const features = [
  {
    icon: '🤖',
    title: 'AI Study Tutor',
    desc: 'Get instant, detailed explanations for any topic in your courses. Your personal tutor available 24/7.',
  },
  {
    icon: '📋',
    title: 'Past Question Bank',
    desc: 'Access years of past exam questions with AI-generated solutions. Study smarter, not harder.',
  },
  {
    icon: '📖',
    title: 'Course Materials',
    desc: 'All your course outlines, objectives, and recommended textbooks organized in one clean dashboard.',
  },
  {
    icon: '📊',
    title: 'GPA Calculator',
    desc: 'Track your academic performance. Calculate semester GPA and cumulative CGPA instantly.',
  },
  {
    icon: '⬆️',
    title: 'Student Uploads',
    desc: 'Share and access lecture notes, summaries and study materials uploaded by your peers.',
  },
  {
    icon: '🔍',
    title: 'Smart Search',
    desc: 'Find anything instantly — courses, past questions, uploaded materials — all in one search.',
  },
]

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#04050f', color: '#F1F5F9', fontFamily: 'Inter, sans-serif' }}>

      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(4,5,15,0.85)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 24px',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="/logo.png" alt="Studiwise" style={{ height: 44, width: 'auto', objectFit: 'contain' }} />
            <span style={{ fontWeight: 900, fontSize: '1.25rem', color: '#fff', letterSpacing: '-0.02em' }}>Studiwise</span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Link to="/login" style={{
              padding: '9px 20px', borderRadius: 10, fontWeight: 600, fontSize: '0.875rem',
              color: '#94A3B8', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
              textDecoration: 'none', transition: 'all 0.15s',
            }}>Log in</Link>
            <Link to="/register" style={{
              padding: '9px 20px', borderRadius: 10, fontWeight: 700, fontSize: '0.875rem',
              color: '#fff', background: '#1A56DB', textDecoration: 'none',
              boxShadow: '0 0 24px rgba(26,86,219,0.4)',
            }}>Get Started Free</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '100px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* glow blobs */}
        <div style={{
          position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 400, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(26,86,219,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          {/* pill badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 16px', borderRadius: 99, marginBottom: 32,
            background: 'rgba(26,86,219,0.12)', border: '1px solid rgba(26,86,219,0.35)',
            color: '#60A5FA', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.02em',
          }}>
            ✦ The Academic Portal for University Students
          </div>

          <h1 style={{
            fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em',
            fontSize: 'clamp(2.8rem, 7vw, 5rem)',
            marginBottom: 24,
          }}>
            Study Smarter.<br />
            <span style={{
              background: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 50%, #818CF8 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Score Higher.</span>
          </h1>

          <p style={{
            color: '#64748B', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            lineHeight: 1.75, maxWidth: 560, margin: '0 auto 44px',
          }}>
            Studiwise gives university students an AI-powered academic edge — past questions, course materials, a 24/7 AI tutor, and GPA tracking, all in one platform.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <Link to="/register" style={{
              padding: '15px 32px', borderRadius: 12, fontWeight: 800, fontSize: '1rem',
              color: '#fff', background: '#1A56DB', textDecoration: 'none',
              boxShadow: '0 0 40px rgba(26,86,219,0.45)', display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              🚀 Start For Free
            </Link>
            <Link to="/login" style={{
              padding: '15px 32px', borderRadius: 12, fontWeight: 700, fontSize: '1rem',
              color: '#94A3B8', background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none',
            }}>
              I have an account
            </Link>
          </div>
        </div>

        {/* Hero mockup card */}
        <div style={{
          maxWidth: 680, margin: '64px auto 0',
          background: '#0D1117', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 60px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)',
        }}>
          {/* window bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0A0E1A' }}>
            {['#EF4444','#F59E0B','#10B981'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
            <span style={{ fontSize: '0.72rem', color: '#334155', marginLeft: 8 }}>AI Tutor · PHY 101 — Mechanics</span>
          </div>
          {/* chat */}
          <div style={{ padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{
                background: '#1A56DB', color: '#fff', borderRadius: '16px 16px 4px 16px',
                padding: '10px 16px', fontSize: '0.85rem', maxWidth: '72%', lineHeight: 1.55,
              }}>
                Explain Newton's Second Law with a real-life example
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg,#1A56DB,#60A5FA)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.7rem', fontWeight: 900, color: '#fff',
              }}>AI</div>
              <div style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px 16px 16px 4px', padding: '12px 16px',
                fontSize: '0.85rem', color: '#CBD5E1', lineHeight: 1.65, maxWidth: '85%',
              }}>
                <strong style={{ color: '#60A5FA' }}>Newton's Second Law</strong> states that Force = Mass × Acceleration (F = ma).<br /><br />
                <span style={{ color: '#94A3B8' }}>
                  Real-life example: When you kick a football, the harder you kick (more force), the faster it accelerates. A heavier ball requires more force to reach the same speed...
                </span>
              </div>
            </div>
            {/* typing indicator */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#1A56DB,#60A5FA)', flexShrink: 0 }} />
              <div style={{ display: 'flex', gap: 5, padding: '10px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#334155', animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#080B18', padding: '40px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, textAlign: 'center' }}>
          {[
            { value: '10,000+', label: 'Students Served' },
            { value: '24/7', label: 'AI Tutor Access' },
            { value: '500+', label: 'Past Questions' },
            { value: '100%', label: 'Free to Start' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#fff', marginBottom: 6 }}>{s.value}</div>
              <div style={{ fontSize: '0.8rem', color: '#475569' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '90px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', letterSpacing: '-0.03em', marginBottom: 14 }}>
              Everything in one place
            </h2>
            <p style={{ color: '#475569', fontSize: '1rem', maxWidth: 460, margin: '0 auto' }}>
              No more switching between apps. Studiwise brings your entire academic life under one roof.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {features.map((f, i) => (
              <div key={f.title} style={{
                background: '#0D1117', border: `1px solid ${i === 0 ? 'rgba(26,86,219,0.5)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 18, padding: '28px 24px',
                boxShadow: i === 0 ? '0 0 40px rgba(26,86,219,0.1)' : 'none',
                transition: 'transform 0.2s, border-color 0.2s',
              }}>
                <div style={{ fontSize: '2.2rem', marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 10, color: '#F1F5F9' }}>{f.title}</h3>
                <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '0 24px 90px', background: '#080B18', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', paddingTop: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', letterSpacing: '-0.03em', marginBottom: 14 }}>
              Ready in seconds
            </h2>
            <p style={{ color: '#475569' }}>No lengthy setup. Create an account and you're in.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 32 }}>
            {[
              { n: '01', title: 'Create your account', desc: 'Sign up with your university details in under a minute.' },
              { n: '02', title: 'Access your courses', desc: 'Your department courses are pre-loaded and ready to explore.' },
              { n: '03', title: 'Ask, study, excel', desc: 'Use the AI tutor, browse past questions, and track your GPA.' },
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

      {/* CTA */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            borderRadius: 24, padding: '64px 40px',
            background: 'linear-gradient(135deg, rgba(26,86,219,0.2) 0%, rgba(99,102,241,0.1) 100%)',
            border: '1px solid rgba(26,86,219,0.3)',
            boxShadow: '0 0 80px rgba(26,86,219,0.1)',
          }}>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', letterSpacing: '-0.03em', marginBottom: 16 }}>
              Your grades will thank you.
            </h2>
            <p style={{ color: '#64748B', marginBottom: 36, lineHeight: 1.7 }}>
              Join thousands of students already using Studiwise to ace their exams.
            </p>
            <Link to="/register" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '15px 36px', borderRadius: 12, fontWeight: 800, fontSize: '1rem',
              color: '#fff', background: '#1A56DB', textDecoration: 'none',
              boxShadow: '0 0 40px rgba(26,86,219,0.5)',
            }}>
              Get Started — It's Free →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#080B18', padding: '28px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/logo.png" alt="Studiwise" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff' }}>Studiwise</span>
          </div>
          <p style={{ color: '#1E293B', fontSize: '0.8rem' }}>© 2025 Studiwise. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}

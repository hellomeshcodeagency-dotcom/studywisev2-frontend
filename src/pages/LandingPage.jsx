import { Link } from 'react-router-dom'

const features = [
  {
    icon: '📋',
    title: 'Past Question Bank',
    desc: 'Browse and download years of past exam questions across all your courses. The easiest way to prepare for exams.',
  },
  {
    icon: '📖',
    title: 'Course Materials',
    desc: 'All your course outlines, objectives, credit units and recommended textbooks — organized and ready to access.',
  },
  {
    icon: '📊',
    title: 'GPA Calculator',
    desc: 'Calculate your semester GPA and cumulative CGPA instantly using your school\'s official grading scale.',
  },
  {
    icon: '⬆️',
    title: 'Student Uploads',
    desc: 'Share lecture notes, summaries and study materials with your department. Learn better together.',
  },
  {
    icon: '💬',
    title: 'Study Assistant',
    desc: 'Stuck on a topic? Get clear explanations and worked examples for anything in your course syllabus.',
  },
  {
    icon: '🔍',
    title: 'Smart Search',
    desc: 'Find courses, past questions and study materials instantly — everything in one search.',
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
            <img src="/logo.png" alt="Studiwise" style={{ height: 44, width: 'auto', objectFit: 'contain', background: '#fff', borderRadius: 10, padding: 5 }} />
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
            Everything you need<br />
            <span style={{
              background: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 50%, #818CF8 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>to ace your exams.</span>
          </h1>

          <p style={{
            color: '#64748B', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            lineHeight: 1.75, maxWidth: 560, margin: '0 auto 44px',
          }}>
            Studiwise is your all-in-one academic portal — past questions, course materials, GPA tracking, and student uploads. Built so you spend less time searching and more time studying.
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

        {/* Hero mockup — dashboard preview */}
        <div style={{
          maxWidth: 720, margin: '64px auto 0',
          background: '#0D1117', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 60px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)',
        }}>
          {/* window bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0A0E1A' }}>
            {['#EF4444','#F59E0B','#10B981'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
            <span style={{ fontSize: '0.72rem', color: '#334155', marginLeft: 8 }}>Studiwise — Dashboard</span>
          </div>
          {/* dashboard content */}
          <div style={{ padding: '24px 20px', textAlign: 'left' }}>
            {/* greeting */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: '0.75rem', color: '#475569', marginBottom: 4 }}>Good morning 👋</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#F1F5F9' }}>Welcome back, Amaka</div>
            </div>
            {/* stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
              {[
                { label: 'Courses', value: '7', color: '#1A56DB' },
                { label: 'Past Questions', value: '42', color: '#10B981' },
                { label: 'Current GPA', value: '4.2', color: '#F59E0B' },
              ].map(s => (
                <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '12px 14px' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: '0.7rem', color: '#475569', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
            {/* recent courses */}
            <div style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Courses</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { code: 'PHY 101', title: 'Mechanics & Properties of Matter', units: 3 },
                { code: 'MTH 101', title: 'Elementary Mathematics I', units: 3 },
                { code: 'CHM 101', title: 'General Chemistry I', units: 3 },
              ].map(c => (
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

      {/* STATS STRIP */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#080B18', padding: '40px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, textAlign: 'center' }}>
          {[
            { value: '10,000+', label: 'Students Served' },
            { value: '500+', label: 'Past Questions' },
            { value: '15+', label: 'Courses Covered' },
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
              Join thousands of students already using Studiwise to organise their studies and ace their exams.
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
            <img src="/logo.png" alt="Studiwise" style={{ height: 36, width: 'auto', objectFit: 'contain', background: '#fff', borderRadius: 8, padding: 4 }} />
            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff' }}>Studiwise</span>
          </div>
          <p style={{ color: '#1E293B', fontSize: '0.8rem' }}>© 2025 Studiwise. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}

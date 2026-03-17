import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="pt-24 min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#4a5a7a', letterSpacing: '0.1em', marginBottom: '16px' }}>// 404</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(80px, 15vw, 160px)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, color: 'rgba(0,98,245,0.15)', marginBottom: '16px' }}>404</h1>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: '#e8eaf0', marginBottom: '12px' }}>Page not found</h2>
        <p style={{ fontSize: '16px', color: '#8b9ab5', marginBottom: '32px' }}>This page has drifted off into the cloud.</p>
        <Link href="/" className="px-6 py-3 rounded-xl text-sm font-medium" style={{ background: '#0062f5', color: '#fff', boxShadow: '0 4px 24px rgba(0,98,245,0.35)' }}>
          Back to home →
        </Link>
      </div>
    </div>
  )
}

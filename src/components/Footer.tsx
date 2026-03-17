'use client'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(0,98,245,0.1)', background: 'rgba(6,9,15,0.9)' }}>
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap gap-2 items-center justify-between">
        <p style={{ fontSize: '13px', color: '#4a5a7a' }}>
          © {new Date().getFullYear()} Cloud Stack. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

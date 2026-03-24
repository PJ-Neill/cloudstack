'use client'
import { useEffect, useRef } from 'react'

export default function Comments() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'PJ-Neill/cloudstack')
    script.setAttribute('data-repo-id', 'R_kgDORpys7Q')
    script.setAttribute('data-category', 'Announcements')
    script.setAttribute('data-category-id', 'DIC_kwDORpys7c4C5Kjr')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', 'preferred_color_scheme')
    script.setAttribute('data-lang', 'en')
    script.setAttribute('data-loading', 'lazy')
    script.crossOrigin = 'anonymous'
    script.async = true
    ref.current.appendChild(script)
  }, [])

  return (
    <div style={{ marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border-card)' }}>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '20px',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '1.5rem',
        letterSpacing: '-0.02em',
      }}>
        Discussion
      </h2>
      <div ref={ref} />
    </div>
  )
}

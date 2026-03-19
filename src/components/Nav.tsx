'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '/', label: 'Blog' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'var(--surface-nav)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-nav)' }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Cloud<span style={{ color: '#0062f5' }}>Stack</span>
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-faint)', marginLeft: '6px', fontWeight: 400 }}>// by PJ Neill</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.href} href={l.href} className={`nav-link ${pathname === l.href ? 'active' : ''}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right side: theme toggle + hamburger */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            <span className="block w-5 h-0.5 rounded-full transition-all" style={{ background: 'var(--text-muted)', transform: open ? 'rotate(45deg) translate(3px, 3px)' : '' }} />
            <span className="block w-5 h-0.5 rounded-full transition-all" style={{ background: 'var(--text-muted)', opacity: open ? 0 : 1 }} />
            <span className="block w-5 h-0.5 rounded-full transition-all" style={{ background: 'var(--text-muted)', transform: open ? 'rotate(-45deg) translate(3px, -3px)' : '' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4" style={{ borderTop: '1px solid var(--border-nav)', background: 'var(--surface-nav)', backdropFilter: 'blur(16px)' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} className="nav-link" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

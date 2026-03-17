import type { Metadata } from 'next'
import BlogGrid from '@/components/BlogGrid'

export const metadata: Metadata = {
  title: 'Cloud Stack — Azure & Microsoft Cloud Insights',
  description: 'Azure, Microsoft 365 and cloud operations articles from Cloud Stack.',
}

export default function Home() {
  return (
    <div className="pt-24 max-w-6xl mx-auto px-6 pb-24">
      <div className="flex items-center gap-12 mb-10">
        <div>
          <p style={{ fontSize: '17px', color: 'var(--text-muted)', maxWidth: '500px', lineHeight: 1.7 }}>
            Hands-on Azure and AI-driven solutions, architectural insights, and practical walkthroughs, focused on building and optimising modern cloud infrastructure.
          </p>
        </div>

        <div className="hidden md:flex flex-col items-center gap-3 flex-shrink-0">
          <div className="w-40 h-40 rounded-full overflow-hidden" style={{ border: '3px solid rgba(0,120,212,0.5)', boxShadow: '0 0 32px rgba(0,98,245,0.3)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/avatar.png" alt="PJ Neill" width={160} height={160} style={{ objectFit: 'cover', objectPosition: 'top', width: '100%', height: '100%' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-faint)' }}>// by PJ Neill</span>
        </div>
      </div>
      <BlogGrid />
    </div>
  )
}

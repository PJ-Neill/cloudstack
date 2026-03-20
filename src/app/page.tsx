'use client'
import BlogGrid from '@/components/BlogGrid'

export default function Home() {
  return (
    <div className="pt-24 max-w-6xl mx-auto px-6 pb-24">
      <div className="flex items-center gap-12 mb-10">
        <div>
          <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>
            Hi, I&apos;m PJ<span style={{ color: '#f97316' }}>.</span>
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '20px' }}>
            A fully certified Microsoft Solutions Architect with a passion for sharing knowledge and practical expertise in Azure, DevOps, and modern application architecture. This blog focuses on actionable tips, in-depth explorations, and real-world experiences across cloud technologies. I also enjoy tinkering with AI, experimenting with new tools, and exploring how intelligent systems can enhance real-world solutions.
          </p>
        </div>

      </div>
      <BlogGrid />
    </div>
  )
}

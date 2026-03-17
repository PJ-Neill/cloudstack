import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/data/content'

export default function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block card-hover rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,98,245,0.15)', background: 'rgba(10,16,30,0.8)' }}>
        <div className="relative w-full" style={{ height: '260px' }}>
          <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,9,15,0.95) 0%, rgba(6,9,15,0.3) 60%, transparent 100%)' }} />
          <div className="absolute bottom-0 left-0 p-6">
            <div className="flex gap-2 mb-3">
              {post.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, lineHeight: 1.3, color: '#e8eaf0', letterSpacing: '-0.02em' }}>{post.title}</h3>
          </div>
        </div>
        <div className="p-6">
          <p style={{ fontSize: '14px', color: '#8b9ab5', lineHeight: 1.7 }}>{post.excerpt}</p>
          <div className="mt-4 flex items-center justify-between">
            <span style={{ fontSize: '12px', color: '#4a5a7a', fontFamily: 'var(--font-mono)' }}>{post.date} · {post.readTime}</span>
            <span style={{ fontSize: '13px', color: '#0062f5', fontWeight: 500 }}>Read →</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group flex gap-5 card-hover rounded-xl p-4" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,16,30,0.6)' }}>
      <div className="relative flex-shrink-0 rounded-lg overflow-hidden" style={{ width: '80px', height: '80px' }}>
        <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex gap-2 mb-2">
          {post.tags.slice(0, 1).map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <h3 style={{ fontSize: '15px', fontWeight: 500, color: '#d4d8e8', lineHeight: 1.4, fontFamily: 'var(--font-display)' }} className="group-hover:text-white transition-colors line-clamp-2">{post.title}</h3>
        <p style={{ fontSize: '12px', color: '#4a5a7a', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>{post.date} · {post.readTime}</p>
      </div>
    </Link>
  )
}

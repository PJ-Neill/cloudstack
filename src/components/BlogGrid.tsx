'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { posts, placeholderTags } from '@/data/content'

const allTags = ['All', ...Array.from(new Set(posts.flatMap(p => p.tags))), ...placeholderTags]

export default function BlogGrid() {
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('All')

  const filtered = useMemo(() => {
    return posts.filter(p => {
      const matchesTag = activeTag === 'All' || p.tags.includes(activeTag)
      const q = search.toLowerCase()
      const matchesSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q))
      return matchesTag && matchesSearch
    })
  }, [search, activeTag])

  return (
    <>
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-80 px-4 py-2.5 rounded-lg text-sm"
          style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)', outline: 'none' }}
        />
      </div>

      {/* Tag filters */}
      <div className="flex gap-2 flex-wrap mb-8">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className="rounded-full border px-4 py-1.5 text-sm font-medium transition-all"
            style={{
              borderColor: activeTag === tag ? '#0062f5' : 'var(--border-card)',
              background: activeTag === tag ? 'rgba(0,98,245,0.15)' : 'transparent',
              color: activeTag === tag ? '#76afff' : 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div id="post-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(post => (
          <article
            key={post.slug}
            className="rounded-lg overflow-hidden flex flex-col transition-shadow hover:shadow-lg"
            style={{ border: '1px solid var(--border-card)', background: 'var(--surface-card)' }}
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative w-full" style={{ height: '192px' }}>
                <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} />
              </div>
            </Link>

            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0" style={{ border: '1px solid rgba(0,98,245,0.3)' }}>
                  <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH}/avatar.png`} alt="PJ Neill" width={32} height={32} style={{ objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <span style={{ color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                  Cloud Stack · {post.date} · {post.readTime}
                </span>
              </div>

              <Link href={`/blog/${post.slug}`}>
                <h3
                  className="mb-2 hover:text-blue-500 transition-colors"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.4 }}
                >
                  {post.title}
                </h3>
              </Link>

              <p className="flex-1 mb-4" style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontSize: '14px', marginTop: '40px' }}>
          No posts found.
        </p>
      )}
    </>
  )
}

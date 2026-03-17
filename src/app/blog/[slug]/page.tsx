import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { posts } from '@/data/content'

export async function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = posts.find(p => p.slug === params.slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts.find(p => p.slug === params.slug)
  if (!post) notFound()

  const related = posts.filter(p => p.slug !== post.slug && p.tags.some(t => post.tags.includes(t))).slice(0, 2)

  return (
    <div className="pt-24 pb-24">
      {/* Hero */}
      <div className="max-w-3xl mx-auto px-6 mb-10">
        <Link href="/" className="muted-link" style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
          ← Back to blog
        </Link>
        <div className="flex flex-wrap gap-2 mb-5">
          {post.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: '#e8eaf0', marginBottom: '16px' }}>{post.title}</h1>
        <p style={{ fontSize: '17px', color: '#8b9ab5', lineHeight: 1.7, marginBottom: '20px' }}>{post.excerpt}</p>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden" style={{ border: '1px solid rgba(0,98,245,0.3)' }}>
            <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH}/avatar.png`} alt="PJ Neill" width={36} height={36} style={{ objectFit: 'cover', objectPosition: 'top' }} />
          </div>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 500, color: '#d4d8e8' }}>Cloud Stack</p>
            <p style={{ fontSize: '12px', color: '#4a5a7a', fontFamily: 'var(--font-mono)' }}>{post.date} · {post.readTime}</p>
          </div>
        </div>
      </div>

      {/* Cover image */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: '400px', border: '1px solid rgba(0,98,245,0.15)' }}>
          <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} />
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-6">
        <div style={{ color: '#a0aec0', fontSize: '16px', lineHeight: 1.85 }}>
          <p style={{ marginBottom: '20px' }}>
            This is where the full article content would appear. In a production version of this site, you would store article content in MDX files, a CMS like Sanity or Contentful, or a database — and render it here.
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: '#e8eaf0', margin: '36px 0 16px', letterSpacing: '-0.02em' }}>Getting started</h2>
          <p style={{ marginBottom: '20px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <div className="rounded-xl p-5 my-6" style={{ background: 'rgba(0,98,245,0.08)', border: '1px solid rgba(0,98,245,0.2)', borderLeft: '3px solid #0062f5' }}>
            <p style={{ fontSize: '15px', color: '#76afff', margin: 0 }}>
              <strong>Pro tip:</strong> When deploying to production, always validate your Azure Policy assignments against a non-production environment first.
            </p>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: '#e8eaf0', margin: '36px 0 16px', letterSpacing: '-0.02em' }}>Key considerations</h2>
          <p style={{ marginBottom: '20px' }}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <pre style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#76afff', margin: '24px 0' }}>
{`# Example Azure CLI command
az deployment group create \\
  --resource-group myResourceGroup \\
  --template-file main.bicep \\
  --parameters @params.json`}
          </pre>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-10 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {post.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="max-w-3xl mx-auto px-6 mt-16">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: '#e8eaf0', marginBottom: '16px' }}>Related posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {related.map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group card-hover rounded-xl overflow-hidden flex flex-col" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,16,30,0.6)' }}>
                <div className="relative" style={{ height: '140px' }}>
                  <Image src={p.image} alt={p.title} fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#d4d8e8', lineHeight: 1.4 }} className="group-hover:text-white transition-colors">{p.title}</h3>
                  <p style={{ fontSize: '11px', color: '#4a5a7a', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>{p.date} · {p.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

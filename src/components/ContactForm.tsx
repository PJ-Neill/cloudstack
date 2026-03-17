'use client'

export default function ContactForm() {
  return (
    <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-5">
      <div>
        <label style={{ fontSize: '13px', color: '#8b9ab5', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>Name</label>
        <input type="text" placeholder="Your name" className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#e8eaf0', outline: 'none' }} />
      </div>
      <div>
        <label style={{ fontSize: '13px', color: '#8b9ab5', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>Email</label>
        <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#e8eaf0', outline: 'none' }} />
      </div>
      <div>
        <label style={{ fontSize: '13px', color: '#8b9ab5', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>Message</label>
        <textarea rows={6} placeholder="What's on your mind?" className="w-full px-4 py-3 rounded-xl text-sm resize-none" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#e8eaf0', outline: 'none' }} />
      </div>
      <button type="submit" className="px-6 py-3 rounded-xl text-sm font-medium self-start" style={{ background: '#0062f5', color: '#fff', boxShadow: '0 4px 24px rgba(0,98,245,0.35)' }}>
        Send message →
      </button>
    </form>
  )
}

export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  image: string
}

export interface Event {
  slug: string
  title: string
  description: string
  date: string
  time: string
  type: 'in-person' | 'online'
  location: string
  image: string
  registerUrl: string
}

export const posts: Post[] = [
  {
    slug: 'hcx-network-extensions',
    title: 'HCX L2 Network Extensions, L3 Gateway Cutover and MON: What You Need to Know Before You Start',
    excerpt: 'HCX Network Extension lets you stretch your on-premises L2 networks directly into Azure VMware Solution. No re-IP. No downtime. But it comes with a set of constraints that will catch you out if you go in blind.',
    date: 'Mar 23, 2026',
    readTime: '8 min read',
    tags: ['Azure VMware Solution', 'HCX'],
    image: '/hcx-cover.png',
  },
  {
    slug: 'avs-gen1-vs-gen2',
    title: 'Azure VMware Solution: Gen 1 vs Gen 2 - What\'s Actually Changed?',
    excerpt: 'Azure VMware Solution Generation 2 now deploys inside an Azure Virtual Network. Here\'s what\'s changed, what to watch out for, and whether you should move.',
    date: 'Mar 19, 2026',
    readTime: '7 min read',
    tags: ['Azure VMware Solution'],
    image: '/avs-cover.jpg',
  },
]

export const events: Event[] = [
  {
    slug: 'microsoft-build-2026',
    title: 'Microsoft Build 2026',
    description: 'The flagship developer conference from Microsoft. AI, Azure, and the future of the cloud platform.',
    date: 'May 19, 2026',
    time: '09:00',
    type: 'in-person',
    location: 'Seattle Convention Center',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    registerUrl: '#',
  },
  {
    slug: 'azure-community-day-london',
    title: 'Azure Community Day – London',
    description: 'A community-run day of sessions covering Azure architecture, security, and operations. Free to attend.',
    date: 'Apr 3, 2026',
    time: '08:30',
    type: 'in-person',
    location: 'CodeNode, London',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    registerUrl: '#',
  },
  {
    slug: 'zero-trust-webinar',
    title: 'Zero Trust Architecture Webinar',
    description: 'Deep dive into implementing Zero Trust across Microsoft 365 and Azure. Practical patterns for MSPs.',
    date: 'Mar 25, 2026',
    time: '14:00',
    type: 'online',
    location: 'Online',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    registerUrl: '#',
  },
]

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
    slug: 'alz-terraform-accelerator',
    title: 'The ALZ Terraform Accelerator Explained',
    excerpt: "Microsoft's Terraform Accelerator takes you from an empty tenant to a CI/CD-backed Azure Landing Zone without building all the plumbing yourself.",
    date: 'Jul 14, 2026',
    readTime: '5 min read',
    tags: ['Azure Landing Zones', 'Terraform', 'IaC', 'Azure Governance'],
    image: '/alz-terraform-cover.png',
  },
  {
    slug: 'azure-migrate-file-shares',
    title: 'Azure Migrate Now Does File Shares',
    excerpt: 'Azure Migrate can now discover and assess your SMB and NFS file shares, and the Copilot Migration Agent will run the whole migration to Azure Files end to end. Here\'s what\'s changed and what to watch for.',
    date: 'Jun 11, 2026',
    readTime: '7 min read',
    tags: ['Azure Migrate', 'Azure Files', 'Azure Storage', 'Copilot', 'AI', 'Agents'],
    image: '/azure-files-cover.webp',
  },
  {
    slug: 'vwan-vs-hubspoke',
    title: 'To vWAN or Not to vWAN',
    excerpt: 'Every Azure networking design workshop eventually hits the same question: do we go hub-spoke or vWAN? This post works through when each pattern earns its place, what the cost picture actually looks like, and the mistakes architects make going either direction.',
    date: 'May 29, 2026',
    readTime: '15 min read',
    tags: ['vWAN', 'Landing Zones', 'Architecture'],
    image: '/vwan-cover.png',
  },
  {
    slug: 'alz-corp-online-local',
    title: 'Corp, Online, and Now Local',
    excerpt: 'Microsoft has added a new Local management group to the Azure Landing Zone hierarchy. Here\'s what Corp, Online, and Local mean to me.',
    date: 'May 7, 2026',
    readTime: '6 min read',
    tags: ['Azure Landing Zone', 'Azure Governance', 'Azure Local', 'Azure Policy'],
    image: '/alz-img-1.webp',
  },
  {
    slug: 'azure-files-migration',
    title: 'Azure Files Migration While Preserving UNC Paths: The Ultimate Guide',
    excerpt: 'Migrating file shares to Azure Files is the easy part. Keeping your UNC paths intact so nothing breaks is where it gets interesting.',
    date: 'Apr 30, 2026',
    readTime: '15 min read',
    tags: ['Azure Files'],
    image: '/azure-files-cover.webp',
  },
  {
    slug: 'hcx-migration-types',
    title: 'HCX Migration Types: RAV, Bulk, vMotion, Cold and OSAM',
    excerpt: 'HCX gives you five ways to move workloads into Azure VMware Solution. Pick the wrong one and you\'ll either burn your maintenance window or wonder why your migration is crawling at 3am.',
    date: 'Apr 2, 2026',
    readTime: '10 min read',
    tags: ['Azure VMware Solution', 'HCX'],
    image: '/hcx-migration-cover.png',
  },
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

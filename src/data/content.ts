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

export const placeholderTags = ['Azure VMware Solution', 'Microsoft Foundry']

export const posts: Post[] = [
  {
    slug: 'avs-gen1-vs-gen2',
    title: 'Azure VMware Solution: Gen 1 vs Gen 2 - What\'s Actually Changed?',
    excerpt: 'Azure VMware Solution Generation 2 now deploys inside an Azure Virtual Network. Here\'s what\'s changed, what to watch out for, and whether you should move.',
    date: 'Mar 19, 2026',
    readTime: '7 min read',
    tags: ['Azure VMware Solution'],
    image: '/avs-cover.jpg',
  },
  {
    slug: 'azure-landing-zones-enterprise',
    title: 'Azure Landing Zones: A Practical Guide for Enterprise Adoption',
    excerpt: 'Landing zones are the foundation of a scalable Azure environment. Here\'s how to design one that grows with your organisation.',
    date: 'Mar 10, 2026',
    readTime: '8 min read',
    tags: ['Azure Architecture', 'Landing Zones'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  },
  {
    slug: 'defender-for-cloud-msp',
    title: 'Microsoft Defender for Cloud: What MSPs Need to Know in 2026',
    excerpt: 'Managing security posture across dozens of tenants requires the right tooling. Defender for Cloud has matured — here\'s how to use it at scale.',
    date: 'Feb 28, 2026',
    readTime: '6 min read',
    tags: ['Security', 'Defender for Cloud'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
  },
  {
    slug: 'entra-id-conditional-access',
    title: 'Conditional Access Policies That Actually Work: Lessons from the Field',
    excerpt: 'Badly configured Conditional Access breaks users and creates helpdesk tickets. Here are the patterns that work in production.',
    date: 'Feb 14, 2026',
    readTime: '7 min read',
    tags: ['Entra ID', 'Zero Trust'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
  },
  {
    slug: 'avd-networking-deep-dive',
    title: 'Azure Virtual Desktop Networking: Outbound Paths and Private Endpoints',
    excerpt: 'A practical look at improving AVD performance by rethinking outbound routing and profile access architecture.',
    date: 'Jan 30, 2026',
    readTime: '9 min read',
    tags: ['AVD', 'Networking'],
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
  },
  {
    slug: 'copilot-m365-deployment',
    title: 'Deploying Microsoft 365 Copilot: What No One Tells You',
    excerpt: 'Licensing is just the start. Here\'s the full picture — data governance, sensitivity labels, and managing expectations.',
    date: 'Jan 12, 2026',
    readTime: '5 min read',
    tags: ['Microsoft 365', 'Copilot'],
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
  },
  {
    slug: 'azure-cost-optimisation',
    title: 'Azure Cost Optimisation: The Checklist Every MSP Should Run',
    excerpt: 'Runaway Azure spend is avoidable. These are the levers that consistently deliver savings without impacting service quality.',
    date: 'Dec 20, 2025',
    readTime: '6 min read',
    tags: ['FinOps', 'Cost Management'],
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
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

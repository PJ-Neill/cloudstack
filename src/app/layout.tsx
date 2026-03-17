import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Cloud Stack — Azure & Microsoft Cloud Insights',
    template: '%s | Cloud Stack',
  },
  description: 'Practical Azure architecture, Microsoft 365, and cloud operations insights for MSPs and IT teams building scalable, secure solutions.',
  keywords: ['Azure', 'Microsoft Cloud', 'MSP', 'Cloud Architecture', 'Microsoft 365'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

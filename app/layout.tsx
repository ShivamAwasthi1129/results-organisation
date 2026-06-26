import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ContentProvider } from '@/lib/content-context'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'R3sults Foundation | Nonprofit Disaster Response',
  description:
    'R3sults.org is a disaster management nonprofit — preparing communities, managing response, and staying until recovery is complete. 20+ years of experience.',
  keywords: ['disaster relief', 'nonprofit', 'humanitarian', 'emergency response', 'disaster management'],
  openGraph: {
    title: 'R3sults Foundation | Prepared. Present. Committed.',
    description: 'We don\'t just respond to disasters. We prepare communities, manage response, and stay until recovery and rebuilding is complete.',
    url: 'https://r3sults.org',
    siteName: 'R3sults.org',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        <ContentProvider>
          {children}
        </ContentProvider>
        <Analytics />
      </body>
    </html>
  )
}

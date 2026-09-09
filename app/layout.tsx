import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://ali-and-mahsa.noghteh.site'),
  title: 'دعوت‌نامه عروسی | A & M',
  description: 'دعوت‌نامه دیجیتال جشن آغاز زندگی مشترک A و M',
  generator: 'v0.app',
  openGraph: {
    title: 'دعوت‌نامه عروسی | A & M',
    description: 'شما و خانواده محترمتان را به این جشن دعوت مینماییم',
    siteName: 'A & M',
    type: 'website',
    locale: 'fa_IR',
    images: [
      {
        url: '/assets/close front envelop.png',
        width: 1200,
        height: 800,
        alt: 'دعوت‌نامه عروسی A و M',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'دعوت‌نامه عروسی | A & M',
    description: 'شما و خانواده محترمتان را به این جشن دعوت مینماییم',
    images: ['/assets/close front envelop.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#e9e0d4',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className="bg-background">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

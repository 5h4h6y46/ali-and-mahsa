import type { Metadata } from 'next'
import Page from '../page'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://5h4h6y46.github.io/ali-and-mahsa'

export function generateStaticParams() {
  return [
    { guest: 'al' },
    { guest: 'ali' },
    { guest: 'mamad' },
    { guest: 'mamd' },
    { guest: 'mahsa' },
    { guest: 'kk' },
    { guest: 'jjj' },
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ guest: string }> }): Promise<Metadata> {
  const { guest } = await params
  const guestName = decodeURIComponent(guest)

  return {
    title: `دعوت‌نامه ${guestName} | A & M`,
    description: `جناب ${guestName} شما و خانواده محترمتان را به این جشن دعوت مینماییم`,
    openGraph: {
      title: `دعوت‌نامه ${guestName} | A & M`,
      description: `جناب ${guestName} شما و خانواده محترمتان را به این جشن دعوت مینماییم`,
      type: 'website',
      locale: 'fa_IR',
      images: [
        {
          url: `${siteUrl}/assets/close%20front%20envelop.png`,
          width: 1200,
          height: 800,
          alt: `دعوت‌نامه ${guestName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `دعوت‌نامه ${guestName} | A & M`,
      description: `جناب ${guestName} شما و خانواده محترمتان را به این جشن دعوت مینماییم`,
      images: [`${siteUrl}/assets/close%20front%20envelop.png`],
    },
  }
}

export default function GuestPage() {
  return <Page />
}

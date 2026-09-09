import type { Metadata } from 'next'

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
          url: '/assets/close front envelop.png',
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
      images: ['/assets/close front envelop.png'],
    },
  }
}

export { default } from '../page'

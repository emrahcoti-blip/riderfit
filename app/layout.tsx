import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RiderFit — AI Motorcycle Gear Advisor',
  description: 'Tell us how you ride and get a personalised full gear setup recommendation. Helmet, jacket, gloves, boots, and pants — matched to your style, climate, and budget.',
  openGraph: {
    title: 'RiderFit — AI Motorcycle Gear Advisor',
    description: 'Get a personalised motorcycle gear recommendation in seconds.',
    url: 'https://riderfit.net',
    siteName: 'RiderFit',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

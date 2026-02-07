import type { Metadata } from 'next'
import { beauRivage, cormorant } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: "Valentine's Day Quiz",
  description: "Find your perfect Valentine's Day date vibe",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${beauRivage.variable} ${cormorant.variable}`}>
      <body className={cormorant.className}>{children}</body>
    </html>
  )
}

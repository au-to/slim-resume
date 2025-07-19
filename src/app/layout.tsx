import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Slim Resume - 专业简历制作平台',
  description: '使用我们的在线简历制作平台，轻松创建专业简历。支持多种模板、实时编辑、PDF导出和分享功能。',
  keywords: ['简历制作', '在线简历', 'Resume Builder', 'CV制作', '求职'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 
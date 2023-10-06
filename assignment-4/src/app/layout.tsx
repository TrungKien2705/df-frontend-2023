import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React, { Suspense } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import SkeletonTable from '../components/skeleton/SkeletonTable'
import { ThemeProvider } from '../hook/useTheme'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Books Store',
  openGraph: {
    title: {
      template: ' Book Store | %s',
      default: 'Book Store',
    },
    url: 'https://trungkien-assignment-4.vercel.app/',
    siteName: 'Next.js',
    images: [
      {
        url: 'https://trungkien-assignment-4.vercel.app/assets/Assignment-4.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://trungkien-assignment-4.vercel.app/assets/Assignment-4.png',
        width: 1800,
        height: 1600,
        alt: 'assignment - 4',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
    description:
      '  1,List Book: List of books corresponding to the topic.\n' +
      '  2,Search By Book: Search for books based on book title.\n' +
      '  3,CRUD: Add, view ,edit and delete books.\n' +
      '  4,Responsive,Pagination and Light/Dark mode themes.\n' +
      '  5,With Nextjs and Tailwind.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="dark:bg-black flex flex-col h-screen">
            <Header />
            <Suspense fallback={<SkeletonTable />}>
              <main>{children}</main>
            </Suspense>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

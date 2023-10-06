import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bottom-0 mt-auto px-4 divide-y dark:text-gray-100 border-t-2 sticky top-[100vh]">
      <div className="py-6 text-sm text-center dark:text-gray-400">
        Copyright © 2023 |{' '}
        <Link
          href="https://github.com/TrungKien2705"
          rel="noopener noreferrer"
          target="_blank"
        >
          Trung Kien
        </Link>
      </div>
    </footer>
  )
}

export default Footer

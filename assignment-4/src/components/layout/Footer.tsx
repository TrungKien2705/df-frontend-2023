import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="px-4 divide-y dark:bg-gray-800 dark:text-gray-100">
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

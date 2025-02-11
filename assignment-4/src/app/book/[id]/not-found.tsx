import React from 'react'
import Link from 'next/link'
import { headers } from 'next/headers'
import Button from '../../../components/Button'

const NotFound = async () => {
  const headersList = headers()
  const domain = headersList.get('host')
  console.log(domain)
  return (
    <div className="grid px-4 bg-white place-content-center dark:bg-gray-900">
      <div className="text-center">
        <h1 className="font-black text-gray-200 text-9xl dark:text-gray-700">
          404
        </h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500 dark:text-gray-400">
          We cant find that page.
        </p>

        <Link href="/">
          <Button
            className="inline-block px-5 py-3 mt-6"
            label="Go Back Home"
            type="button"
            secondary
            fullWidth={false}
          />
        </Link>
      </div>
    </div>
  )
}

export default NotFound

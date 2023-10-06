import React from 'react'
import Button from './Button'

const NoData = () => {
  return (
    <div className="grid px-4 bg-white place-content-center dark:bg-gray-900">
      <div className="text-center">
        <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500 dark:text-gray-400">
            No books found
        </p>

        <Button
          className="inline-block px-5 py-3 mt-6"
          label="Create Book"
          type="button"
          secondary
          fullWidth={false}
        />
      </div>
    </div>
  )
}

export default NoData

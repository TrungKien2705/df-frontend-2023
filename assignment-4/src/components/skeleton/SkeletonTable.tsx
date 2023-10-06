import React from 'react'

const SkeletonTable = () => {
  return (
    <div className="animate-pulse mx-auto max-w-screen-xl mt-6">
      <div className="h-4 bg-gray-200 mt-3 mb-6 rounded" />
      <div className="h-4 bg-gray-300 mb-6 rounded" />
      <div className="h-4 bg-gray-200 mb-6 rounded" />
      <div className="h-4 bg-gray-300 mb-6 rounded" />
      <div className="h-4 bg-gray-200 mb-6 rounded" />
    </div>
  )
}

export default SkeletonTable

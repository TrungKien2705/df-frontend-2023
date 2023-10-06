'use client'

import React, { useEffect, useMemo } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useRouter } from 'next/navigation'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { Book } from '../types/books'

interface PaginationProps {
  data: Book[]
  itemsPerPage: number
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}
const Pagination: React.FC<PaginationProps> = ({
  data,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const router = useRouter()
  const totalPages = Math.ceil(data.length / itemsPerPage)

  const calculatedCurrentPage = useMemo(() => {
    if (data.length > 0) {
      if (currentPage > 1 && (currentPage - 1) * itemsPerPage >= data.length) {
        return currentPage - 1
      }
    }
    return currentPage
  }, [data, itemsPerPage, currentPage])

  useEffect(() => {
    // console.log('totalPages', totalPages)
    // console.log(currentPage, data.length)
    setCurrentPage(calculatedCurrentPage)
  }, [calculatedCurrentPage])

  const handlePageChange = (page: number) => {
    router.push(`/?page=${page}`)
    setCurrentPage(page)
  }
  const renderPagination = () => {
    const pages: number[] = []
    const displayPageCount = 3
    const pageStart: number = Math.max(
      1,
      currentPage - Math.floor(displayPageCount / 2),
    )
    const pageEnd: number = Math.min(
      totalPages,
      pageStart + displayPageCount - 1,
    )
    for (let i: number = pageStart; i <= pageEnd; i++) {
      pages.push(i)
    }

    const pagination = pages.map((page) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`block h-8 w-8 rounded ${
          currentPage === page ? 'border-[#d3445b] bg-[#d3445b]' : ''
        } text-center leading-8 dark:text-white cursor-pointer`}
      >
        {page}
      </button>
    ))

    if (totalPages > 1) {
      if (pageStart > 1) {
        pagination.unshift(
          <li
            key="start-ellipsis"
            className="inline-flex h-8 w-8 items-center justify-center bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
          >
            <HiDotsHorizontal />
          </li>,
        )
      }

      if (pageEnd < totalPages) {
        pagination.push(
          <li
            key="end-ellipsis"
            className="inline-flex h-8 w-8 items-center justify-center bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
          >
            <HiDotsHorizontal />
          </li>,
        )
      }
    }

    return pagination
  }
  if (totalPages === 1) {
    return null
  }
  return (
    <ol className="flex justify-end gap-1 text-xs font-medium mx-auto max-w-screen-xl">
      <li>
        <button
          onClick={() => handlePageChange(1)}
          className={`${
            currentPage === 1 ? 'hidden' : ''
          } inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white`}
        >
          <FiChevronsLeft />
        </button>
      </li>
      <li>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`${
            currentPage === 1 ? 'hidden' : ''
          } inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white`}
        >
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>
      {renderPagination()}
      <li>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`${
            currentPage === totalPages ? 'hidden' : ''
          } inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white`}
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>
      <li>
        <button
          onClick={() => handlePageChange(totalPages)}
          className={`${
            currentPage === totalPages ? 'hidden' : ''
          } inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white`}
        >
          <FiChevronsRight />
        </button>
      </li>
    </ol>
  )
}

export default Pagination

'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Pagination from './Pagination'
import { Book } from '../types/books'
import SkeletonTable from './skeleton/SkeletonTable'
import NoData from './NoData'

interface TablePops {
  books: Book[]
  loading: boolean
  error: boolean
  setIsAdd: (b: boolean) => void
  openModal: () => void
  openModalDelete: () => void
  setItem: React.Dispatch<React.SetStateAction<Book>>
  page?: number | string
}
const Table: React.FC<TablePops> = ({
  books,
  loading,
  error,
  setIsAdd,
  openModal,
  openModalDelete,
  setItem,
  page,
}) => {
  const [pageData, setPagedData] = useState<Book[]>([])
  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = useState(Number(page))
  const router = useRouter()

  const setPageData = useCallback(() => {
    if (books.length > 0) {
      const start = (currentPage - 1) * itemsPerPage
      const end = start + itemsPerPage
      const slicedData: Book[] = books.slice(start, end)
      setPagedData(slicedData)
      // console.log(start, end, currentPage)
    }
  }, [books.length, currentPage, itemsPerPage])

  useEffect(() => {
    setPageData()
  }, [currentPage, setPageData])

  const handleOnClickEdit = (item: Book) => {
    setItem(item)
    setIsAdd(false)
    openModal()
  }
  const handleOnClickDelete = (item) => {
    setItem(item)
    openModalDelete()
  }

  if (loading) return <SkeletonTable />
  if (books.length === 0) return <NoData />
  if (error) return <div>Error</div>
  return (
    <>
      <div className="overflow-x-auto mt-6 mb-6 mx-auto max-w-screen-xl">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                Author
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                Topic
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {pageData.map((item) => {
              return (
                <tr key={item.id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                    {item.author}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                    {item.topic}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                      <button
                        onClick={() => handleOnClickEdit(item)}
                        className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative dark:text-gray-200 dark:hover:bg-gray-800"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => router.push(`/book/${item.id}`)}
                        className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative dark:text-gray-200 dark:hover:bg-gray-800"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleOnClickDelete(item)}
                        className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative dark:text-gray-200 dark:hover:bg-gray-800"
                      >
                        Delete
                      </button>
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        data={books}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}

export default Table

'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { BiArrowBack } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import { getBookById } from '../../../services/bookServices'
import Button from '../../../components/Button'
import { Book, initialBook } from '../../../types/books'
import NotFound from '../../../components/NotFound'
import ModalDelete from '../../../components/modal/ModalDelete'

const Page = ({ params }) => {
  const [bookItem, setBookItem] = useState(initialBook)
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const bookItem: Book | undefined = await getBookById(params.id)
      if (bookItem) {
        setBookItem(bookItem)
      }
    }
    fetchData()
  }, [])
  const router = useRouter()
  const closeModal = () => {
    setIsOpen(false)
  }
  const openModal = () => {
    setIsOpen(true)
  }
  if (bookItem.id === 0) return <NotFound />

  return (
    <>
      <div className="flex items-center justify-between">
        <Button
          onClick={() => router.back()}
          className="my-4"
          label={<BiArrowBack />}
          type="button"
          secondary
          fullWidth={false}
        />
        <Button
          onClick={openModal}
          label="Delete"
          type="button"
          secondary={false}
          fullWidth={false}
        />
      </div>

      <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm dark:border-gray-700">
        <dl className="-my-3 divide-y divide-gray-100 text-sm dark:divide-gray-700">
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900 dark:text-white">Name</dt>
            <dd className="text-gray-700 dark:text-gray-200 sm:col-span-2">
              {bookItem?.name}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900 dark:text-white">
              Author
            </dt>
            <dd className="text-gray-700 dark:text-gray-200 sm:col-span-2">
              {bookItem?.author}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900 dark:text-white">Topic</dt>
            <dd className="text-gray-700 dark:text-gray-200 sm:col-span-2">
              {bookItem?.topic}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900 dark:text-white">
              Thumbnail
            </dt>
            <dd className="text-gray-700 dark:text-gray-200 sm:col-span-2">
              {bookItem?.thumbnail && (
                <Image
                  width={100}
                  height={100}
                  src={bookItem?.thumbnail}
                  alt={bookItem?.name}
                />
              )}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900 dark:text-white">
              Description
            </dt>
            <dd className="text-gray-700 dark:text-gray-200 sm:col-span-2">
              {bookItem?.description}
            </dd>
          </div>
        </dl>
      </div>
      <ModalDelete isOpen={isOpen} closeModal={closeModal} item={bookItem} />
    </>
  )
}

export default Page

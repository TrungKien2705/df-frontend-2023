'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { debounce } from 'next/dist/server/utils'
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import Table from '../components/Table'
import ModalForm from '../components/modal/ModalForm'
import { Book, initialBook } from '../types/books'
import { getAllBooks } from '../services/bookServices'
import ModalDelete from '../components/modal/ModalDelete'

const defaultValues = {
  search: '',
} as {
  search: string
}
export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isAdd, setIsAdd] = useState(true)
  const [item, setItem] = useState<Book>(initialBook)
  const [dataFilter, setDataFilter] = useState<Book[]>([])
  const { register, watch, setValue } = useForm({ defaultValues })
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      if (!loading) {
        return
      }
      setLoading(true)
      const resBook = await getAllBooks()
      if (resBook) {
        setBooks(resBook)
        setLoading(false)
      } else {
        setError(true)
        setLoading(false)
      }
    }

    fetchData()
  }, [loading])

  const debouncedSearch = debounce((search: string) => {
    // router.push('/', { scroll: false })
    const filtered: Book[] = books.filter((book) =>
      book.name.toLowerCase().includes(search.trim().toLowerCase()),
    )
    setDataFilter(filtered)
  }, 300)
  useEffect(() => {
    debouncedSearch(watch('search'))
  }, [debouncedSearch])
  const closeModal = () => {
    setIsOpen(false)
    setIsOpenDelete(false)
  }

  const openModalAdd = () => {
    setIsOpen(true)
    setIsAdd(true)
  }
  const openModalEdit = () => {
    setIsOpen(true)
    setIsAdd(false)
  }
  const openModalDelete = () => {
    setIsOpenDelete(true)
  }
  // const onSubmitSearch = () => {}
  return (
    <>
      <div className=" mt-4 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl mb-auto h-10">
        <div className="relative">
          <form>
            <label htmlFor="Search" className="sr-only">
              Search for...{' '}
            </label>
            <input
              {...register('search')}
              type="search"
              id="Search"
              placeholder="Search Books"
              className="w-full rounded-md border-gray-200 py-2.5 pe-10 px-2.5 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
            />
          </form>

          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <span className="sr-only">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>
        <Button
          onClick={openModalAdd}
          secondary
          label="Add Books"
          type="button"
          fullWidth={false}
        />
      </div>
      <Table
        page={parseInt(searchParams.page || '1', 10)}
        books={dataFilter}
        loading={loading}
        error={error}
        setItem={setItem}
        setIsAdd={setIsAdd}
        openModalDelete={openModalDelete}
        openModal={openModalEdit}
      />
      <ModalForm
        item={item}
        setDataBooks={setBooks}
        isOpen={isOpen}
        closeModal={closeModal}
        isAdd={isAdd}
      />
      <ModalDelete
        isOpen={isOpenDelete}
        closeModal={closeModal}
        setDataBooks={setBooks}
        item={item}
      />
    </>
  )
}

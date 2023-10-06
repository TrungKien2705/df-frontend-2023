import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Book } from '../../types/books'
import { deleteBook, getAllBooks } from '../../services/bookServices'
import Button from '../Button'

interface ModalDeleteProps {
  isOpen: boolean
  closeModal: () => void
  setDataBooks?: React.Dispatch<React.SetStateAction<Book[]>>
  item: Book
}
const ModalDelete: React.FC<ModalDeleteProps> = ({
  isOpen,
  closeModal,
  setDataBooks,
  item,
}) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onClickDelete = async () => {
    if (item) {
      setLoading(true)
      const res = await deleteBook(item.id)
      if (res) {
        const res: Book[] | undefined = await getAllBooks()
        if (setDataBooks) {
          setDataBooks(res || [])
        }
        if (!setDataBooks) {
          router.push('/')
        }
        closeModal()
        setLoading(false)
      } else {
        setLoading(false)
      }
    }
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all  dark:bg-black dark:shadow-blue-500">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-amber-50"
                >
                  Delete Book
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {' '}
                    Do you want to delete{' '}
                    <strong className="delete-name">{item?.name}</strong> book ?
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-center gap-4">
                  <Button
                    label="Delete"
                    type="submit"
                    secondary={false}
                    fullWidth={false}
                    onClick={onClickDelete}
                  />
                  <Button
                    label="Canel"
                    type="button"
                    secondary
                    fullWidth={false}
                    onClick={closeModal}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ModalDelete

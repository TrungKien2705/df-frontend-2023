import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, ReactNode, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Button from '../Button'
import Input from '../Input'
import { Topic } from '../../types/topic'
import { getAllTopic } from '../../services/topicServices'
import {
  getAllBooks,
  postCreateBook,
  putUpdateBook,
} from '../../services/bookServices'
import { Book } from '../../types/books'
import Loading from '../Loading'

interface ModalFormProps {
  isOpen: boolean
  closeModal: () => void
  isAdd: boolean
  setDataBooks: React.Dispatch<React.SetStateAction<Book[]>>
  item: Book
}
const ModalForm: React.FC<ModalFormProps> = ({
  isOpen,
  closeModal,
  isAdd,
  setDataBooks,
  item,
}) => {
  const [loadingForm, setLoadingForm] = useState(false)
  const [topic, setTopic] = useState<Topic[]>([])
  const defaultValues = {
    name: '',
    author: '',
    topic: '',
  } as {
    name: string
    author: string
    topic: string
  }

  useEffect(() => {
    const fetchTopic = async () => {
      const res = await getAllTopic()
      if (res) {
        setTopic(res)
      }
    }
    fetchTopic()
  }, [])
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ defaultValues })
  useEffect(() => {
    const setFormData = () => {
      if (!isAdd) {
        setValue('name', item.name)
        setValue('author', item.author)
        setValue('topic', item.topic)
      } else {
        reset()
      }
    }
    setFormData()
  }, [isAdd, item, reset, setValue])
  const onSubmit = async (data) => {
    setLoadingForm(true)
    if (isAdd) {
      const response = await postCreateBook(data)
      if (response) {
        reset()
        setLoadingForm(false)
        const res: Book[] | undefined = await getAllBooks()
        setDataBooks(res || [])
        closeModal()
      } else {
        setLoadingForm(false)
      }
    } else {
      const response = await putUpdateBook(data, item.id)
      if (response) {
        reset()
        setLoadingForm(false)
        const res: Book[] | undefined = await getAllBooks()
        setDataBooks(res || [])

        closeModal()
      } else {
        setLoadingForm(false)
      }
    }
  }
  let buttonLabel: string | ReactNode
  if (loadingForm) {
    buttonLabel = <Loading />
  } else if (isAdd) {
    buttonLabel = 'Add Book'
  } else {
    buttonLabel = 'Save Book'
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
          <div className="fixed inset-0 bg-black bg-opacity-25 " />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-black dark:shadow-blue-500">
                <Dialog.Title
                  as="h3"
                  className="text-lg mb-4 font-medium leading-6 text-gray-900 dark:text-amber-50"
                >
                  {isAdd ? 'Add Book' : 'Edit Book'}
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
                  <Controller
                    control={control}
                    name="name"
                    rules={{ required: 'Last name is required.' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        errors={errors}
                        disabled={loadingForm}
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Enter Name Book"
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="author"
                    rules={{ required: 'Last author is required.' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        errors={errors}
                        disabled={loadingForm}
                        label="Author"
                        name="author"
                        type="text"
                        placeholder="Enter Author Books"
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="topic"
                    rules={{ required: 'Last Topic is required.' }}
                    render={({ field }) => (
                      <Input
                        dataSelect={topic}
                        {...field}
                        errors={errors}
                        disabled={loadingForm}
                        label="Topic"
                        name="topic"
                        type="select"
                      />
                    )}
                  />

                  <Button
                    label={buttonLabel}
                    type="submit"
                    secondary
                    fullWidth
                  />
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
export default ModalForm

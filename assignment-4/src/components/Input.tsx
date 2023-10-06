import React, { ChangeEvent, forwardRef, Ref } from 'react'
import { Topic } from '../types/topic'

interface InputProps {
  name: string
  dataSelect?: Topic[]
  type: 'text' | 'search' | 'select'
  label?: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  placeholder?: string
  disabled?: boolean
  errors?: NonNullable<unknown>
  value: string
}

const Input: React.FC<InputProps> = forwardRef(
  (
    {
      name,
      type,
      label,
      onChange,
      dataSelect,
      placeholder,
      disabled,
      value,
      errors,
    }: InputProps,
    ref: Ref<HTMLInputElement | HTMLSelectElement>,
  ) => {
    return (
      <>
        {type === 'select' ? (
          <div className="">
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              <select
                id={name}
                name={name}
                onChange={onChange}
                disabled={disabled}
                value={value}
                className="mb-4 relative block overflow-hidden rounded-md border border-gray-200 px-3 py-3 w-full outline-0 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white focus-within:ring-1 focus-within:border-blue-600  focus-within:ring-blue-600"
                ref={ref as Ref<HTMLSelectElement>}
              >
                <option value="">Select topic</option>
                {dataSelect &&
                  dataSelect.map((item, index) => {
                    return (
                      <option
                        key={index}
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    )
                  })}
              </select>
            </label>
          </div>
        ) : (
          <label
            htmlFor={name}
            className="mb-4 relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800"
          >
            <input
              id={name}
              name={name}
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              disabled={disabled}
              ref={ref as Ref<HTMLInputElement>}
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 dark:text-white sm:text-sm"
            />
            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs dark:text-gray-200">
              {label}
            </span>
          </label>
        )}
        {errors && errors[name] && (
          <small className="text-red-500 text-sm">{errors[name].message}</small>
        )}
      </>
    )
  },
)
Input.displayName = 'Input'
export default Input

'use client'

import { Popover } from '@headlessui/react'
import React from 'react'
import { MdOutlineLightMode, MdModeNight } from 'react-icons/md'
import { useTheme } from '../hook/useTheme'

export default function PopoverTheme() {
  const { theme, toggleTheme } = useTheme()
  console.log(theme)

  return (
    <div className={`px-4 ${theme ? 'dark' : ''}`}>
      <Popover className="relative">
        {({ open }) => (
          <Popover.Button
            className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md bg-${
                  theme ? 'black' : 'white'
                } px-3 py-2 text-base font-medium text-${
                  theme ? 'black' : 'white'
                } hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-${
                  theme ? 'white' : 'black'
                } focus-visible:ring-opacity-75 border-r-indigo-500`}
            onClick={toggleTheme}
          >
            <span>{theme ? <MdModeNight /> : <MdOutlineLightMode />}</span>
          </Popover.Button>
        )}
      </Popover>
    </div>
  )
}

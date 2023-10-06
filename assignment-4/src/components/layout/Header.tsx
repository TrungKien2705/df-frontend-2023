'use client'

import React, { useCallback, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ToastContainer } from 'react-toastify'
import PopoverTheme from '../Popover'
import ImageUser from '../../image/user.jpg'
import 'react-toastify/dist/ReactToastify.css'
import Theme from '../../types/theme'
import { useTheme } from '../../hook/useTheme'

const Header = () => {
  const { theme } = useTheme()
  const updateThemeAttribute = useCallback(() => {
    const bodyElement = document.querySelector('body')
    if (bodyElement) {
      bodyElement.setAttribute('data-theme', theme)
    }
  }, [theme])
  const toastTheme = useMemo(() => {
    return theme === Theme.LIGHT ? Theme.LIGHT : Theme.DARK
  }, [theme])
  useEffect(() => {
    updateThemeAttribute()
  }, [theme, updateThemeAttribute])
  return (
    <>
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-black border-b-2">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="https://flowbite.com" className="flex items-center">
              <svg
                width="39"
                height="41"
                viewBox="0 0 39 41"
                className="flex-none inline-block mr-4"
              >
                <title>logo</title>
                <g fillRule="nonzero" fill="none">
                  <path
                    d="M5.208 40.726c-2.804 0-5.074-2.279-5.074-5.093V5.093C.134 2.278 2.404 0 5.208 0l12.703.015c11.292 0 20.433 9.262 20.285 20.623-.149 11.183-9.438 20.088-20.582 20.088H5.208z"
                    fill="#E13F5E"
                  />
                  <path
                    d="M7.76 31.821h-.652a.634.634 0 0 1-.638-.64v-5.108c0-.357.282-.64.638-.64h5.09c.356 0 .638.283.638.64v.655c0 2.815-2.27 5.093-5.075 5.093zM7.108 16.528H22.97c2.804 0 5.075-2.278 5.075-5.092v-.61a.666.666 0 0 0-.668-.67H11.56c-2.805 0-5.075 2.278-5.075 5.092v.64c0 .358.282.64.623.64zM7.108 24.167h8.25c2.805 0 5.075-2.278 5.075-5.092v-.64a.634.634 0 0 0-.638-.64H7.108a.634.634 0 0 0-.638.64v5.092c.015.357.297.64.638.64z"
                    fill="#FFF"
                  />
                </g>
              </svg>
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Book Store
              </span>
            </a>
            <div className="dark:text-amber-50 flex items-center justify-center gap-1">
              <PopoverTheme />
              <Image
                className="rounded-full"
                width={30}
                height={30}
                src={ImageUser}
                alt="Image user"
              />
              <Link
                href="https://github.com/TrungKien2705"
                rel="noopener noreferrer"
                target="_blank"
              >
                Trung Kien
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={toastTheme}
      />
    </>
  )
}

export default Header

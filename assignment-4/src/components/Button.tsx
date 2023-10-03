import React from 'react'

interface ButtonProps {
  label: string
  type: 'submit' | 'button' | 'reset'
  // secondary: boolean
  fullWidth: boolean
  disabled?: boolean
  className?: string
  onClick?: () => void
}
const Button: React.FC<ButtonProps> = ({
  label,
  type,
  // secondary,
  fullWidth,
  disabled,
  className,
  onClick,
}) => {
  return (
    <div className="flex">
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
            ${className}
            ${fullWidth ? 'w-full' : 'w-fit'}
            
            middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
        `}
        data-ripple-light="true"
      >
        {label}
      </button>
      <button
        data-collapse-toggle="mobile-menu-2"
        type="button"
        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="mobile-menu-2"
        aria-expanded="false"
      />
    </div>
  )
}

export default Button

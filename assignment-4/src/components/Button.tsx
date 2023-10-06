import React, { ReactNode } from 'react'

interface ButtonProps {
  label: string | ReactNode
  type: 'submit' | 'button' | 'reset'
  secondary: boolean
  fullWidth: boolean
  disabled?: boolean
  className?: string
  onClick?: () => void
}
const Button: React.FC<ButtonProps> = ({
  label,
  type,
  secondary,
  fullWidth,
  disabled,
  className,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
            ${className || ''}
            ${fullWidth ? 'w-full' : 'w-fit'}
            ${
              secondary
                ? 'bg-[#d3445b] hover:text-[#d3445b] text-white active:text-[#d3445b] hover:bg-transparent'
                : 'hover:bg-[#d3445b] text-[#d3445b] hover:text-white active:bg-[#d3445b]'
            } 
            inline-block rounded border border-[#d3445b] px-8 py-2.5 text-sm font-medium   focus:outline-none
        `}
    >
      {label}
    </button>
  )
}

export default Button

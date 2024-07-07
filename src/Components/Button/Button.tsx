import React from 'react'

const shapes = {
  circle: 'rounded-[50%]',
  round: 'rounded-[5px]'
} as const

const variants = {
  fill: {
    blue_gray_900: 'bg-blue_gray-900',
    white_A700: 'bg-white-A700 text-black-900',
    blue_gray_900_03: 'bg-blue_gray_900_03 text-gray-400_02',
    blue_gray_900_07: 'bg-blue_gray-900_07 text-black',
    gray_800: 'bg-gray-800 text-blue_gray-100_06',
    indigo_100_7f: 'bg-indigo-100_7f text-black-900',
    blue_gray_900_05: 'bg-blue_gray-900 text-gray-500',
    blue_gray_800: 'bg-blue_gray-100_04 text-black-900',
    gray_800_01: 'bg-gray-800_01 text-gray-500',
    //---
    pink_normail: 'bg-pink-normail text-pink-light',
  },
  outline: {
    white_A700: 'border-white-A700 border border-solid shadow-lg'
  }
} as const

const sizes = {
  '4xl': 'h-[68px] px-4',
  '3xl': 'h-[56px] px-[35px] text-xl',
  md: 'h-[28px] px-[30px] text-base',
  xl: 'h-[37px] px-[35px] text-sm',
  '2xl': 'h-[40px] px-2',
  sm: 'h-[25px] px-2 text-[10px]',
  xs: 'h-[22px] px-[18px] text-[10px]',
  lg: 'h-[31px] px-[35px] text-xs'
} as const

type ButtonProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'onClick'
> &
  Partial<{
    className: string
    leftIcon: React.ReactNode
    rightIcon: React.ReactNode
    onClick: () => void
    shape: keyof typeof shapes
    variant: keyof typeof variants
    size: keyof typeof sizes
    color: string
  }>

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className = '',
  leftIcon,
  rightIcon,
  shape,
  variant = 'fill',
  size = 'sm',
  color = 'white-A700',
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center cursor-pointer ${(shape && shapes[shape]) || ''} ${(size && sizes[size]) || ''} ${(variant && variants[variant]?.[color as keyof (typeof variants)[typeof variant]]) || ''}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  )
}

export { Button }

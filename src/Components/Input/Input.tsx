import React, { HtmlHTMLAttributes } from 'react'

const shapes = {
  round: 'rounded-[10px]'
} as const

const variants = {
  fill: {
    gray_800: 'bg-gray-800 text-blue_gray-100_06',
    gray_800_01: 'bg-gray-800_01 text-blue_gray-100',
    gray_900_01: 'bg-gray-900_01 text-blue_gray-100_02',
    blue_gray_900_04: 'bg-blue_gray-900_04 text-gray-700_03'
  }
} as const
const sizes = {
  xs: 'h-[32px] pl-[13px] pr-[35px] text-xs',
  sm: 'h-[36px] pl-[35px] pr-[17px] text-sm',
  md: 'h-[56px] pl-[30px] pr-[35px] text-xl'
} as const

type InputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'size' | 'prefix' | 'type' | 'onChange'
> &
  Partial<{
    className: string
    name: string
    placeholder: string
    type: string
    label: string
    prefix: React.ReactNode
    suffix: React.ReactNode
    onChange: Function
    shape: keyof typeof shapes
    variant: keyof typeof variants
    size: keyof typeof sizes
    color: string
  }>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      name = '',
      placeholder = '',
      type = 'text',
      children,
      label = '',
      prefix,
      suffix,
      onChange,
      shape,
      variant = 'fill',
      size = 'md',
      color = 'blue_gray_900_04',
      ...restProps
    },
    ref
  ) => {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      if (onChange) onChange(e?.target?.value)
    }
    return (
      <>
        <label
          className={`${className} flex items-center justify-center self-stretch cursor-text ${(shape && shapes[shape]) || ''} ${variants[variant]?.[color as keyof (typeof variants)[typeof variant]] || variants[variant] || ''} ${sizes[size] || ''}`}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input
            ref={ref}
            type={type}
            name={name}
            onChange={handleChange}
            placeholder={placeholder}
            {...restProps}
          />
          {!!suffix && suffix}
        </label>
      </>
    )
  }
)

export { Input }

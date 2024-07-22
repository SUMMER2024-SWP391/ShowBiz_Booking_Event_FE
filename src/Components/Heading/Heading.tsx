import React from 'react'

const sizes = {
  '3xl': 'text-[32px] font-blod md:text-3xl sm:text-[28px]',
  '2xl': 'text-[20px] font-bold',
  xl: 'text-base font-bold',
  '4xl': 'text-4xl font-semibold  ',
  s: 'text-xs font-bold',
  md: 'text-[13px] font-semibold w-full',
  xs: 'text-[10px] font-bold',
  lg: 'text-sm font-semibold'
}

export type HeadingProps = Partial<{
  className: string
  as: any
  size: keyof typeof sizes
}> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >

const Heading: React.FC<React.PropsWithChildren<HeadingProps>> = ({
  children,
  className = '',
  size = 'xl',
  as,
  ...restProps
}) => {
  const Component = as || 'h6'

  return (
    <Component
      className={`text-black-900 font-euclid ${className} ${sizes[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  )
}
export { Heading }

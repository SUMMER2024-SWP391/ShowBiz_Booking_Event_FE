import React from 'react'

const sizes = {
  xs: 'text-[10px] font-light',
  lg: 'text-[14px] font-normal',
  s: 'text-xs font-medium',
  xl: 'text-xl font-normal',
  md: 'text-[13px] font-medium'
}

export type TextProps = Partial<{
  className: string
  as: any
  size: keyof typeof sizes
}> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  className = '',
  as,
  size = 'lg',
  ...restProps
}) => {
  const Component = as || 'p'

  return (
    <Component
      className={`text-black-900 font-euclid ${className} ${sizes[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  )
}

export { Text }

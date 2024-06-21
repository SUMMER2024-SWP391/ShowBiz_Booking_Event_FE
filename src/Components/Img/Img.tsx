import React from 'react'
import { UseFormRegister } from 'react-hook-form'

type ImgProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> &
  Partial<{
    className: string
    src: string
    alt: string
    register: UseFormRegister<any>
  }>

const Img: React.FC<React.PropsWithChildren<ImgProps>> = ({
  className,
  src = 'defaultNodata.png',
  alt = 'textImg',
  register,
  ...restProps
}) => {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      {...restProps}
      loading={'lazy'}
      {...register}
    />
  )
}

export { Img }

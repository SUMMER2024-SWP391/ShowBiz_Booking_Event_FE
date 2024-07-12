import { ReactNode } from 'react'

interface Props {
  title: string
  renderProps: ReactNode
}
const Modal = ({ title, renderProps }: Props) => {
  return (
    <div>
      <div className='fixed'>{title}</div>
      <div className='flex items-center justify-center mt-3'>{renderProps}</div>
    </div>
  )
}

export default Modal

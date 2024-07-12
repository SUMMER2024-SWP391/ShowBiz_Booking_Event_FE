import { ReactNode } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  children: ReactNode
}
const Modal = ({ open, onClose, children }: Props) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center
    items-center transition-colors ${open ? 'visible bg-black-900/20' : 'invisible'}`}
    >
      <div
        className={`bg-white-A700 rounded-xl shadow p-6 transition-all ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal

import React from 'react'

type Props = {
  open: boolean
  onClose: () => void
  children?: React.ReactNode
}

const ModalPopup: React.FC<Props> = ({ open, onClose, children }) => {
  return (
    <div
      className={` fixed inset-0 flex justify-center items-center transition-colors ${open ? 'visible bg-white-A700_d3' : 'invisible'}`}
      onClick={onClose}
    >
      <div
        className={` bg-white-A700 rounded-lg shadow p-6 transition-all max-w-md ${open ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type='button'
          className='absolute top-2 right-2
         py-1 px-2 border rounded-md text-black-900 bg-white-A700 hover:bg-gray-700 hover:text-gray-100'
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  )
}
export default ModalPopup
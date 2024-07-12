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
          className='w-8 h-8 absolute top-2 right-2
         py-1 px-1 border rounded-md text-black-900 bg-white-A700 hover:bg-gray-700 hover:text-gray-100'
          onClick={onClose}
        >
          X
        </button>
        {children}
        <button type='button' onClick={onClose} className='w-[50px] '>
          <div className='bg-blue_gray-800 hover:bg-white-A700 text-white-A700 hover:!text-black-900 font-bold border border-solid mt-3 rounded'>
            Done
          </div>
        </button>
      </div>
    </div>
  )
}
export default ModalPopup
import React from 'react'

type Props = {
  type: string
  open: boolean
  onClose: () => void
  children?: React.ReactNode
}

const ModalPopup: React.FC<Props> = ({ type, open, onClose, children }) => {
  return (
    <div
      className={` fixed inset-0 flex justify-center items-center transition-colors ${open ? 'visible bg-white-A700_d3' : 'invisible'}`}
      onClick={onClose}
    >
      <div
        className={` bg-white-A700 rounded-lg shadow p-6 transition-all max-w-md ${open ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {type === 'search' && (
          <button
            type='button'
            className='absolute top-2 right-2
         py-1 px-2 text-black-900 bg-white-A700 hover:text-red'
            onClick={onClose}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18 18 6M6 6l12 12'
              />
            </svg>
          </button>
        )}
        {children}
      </div>
    </div>
  )
}
export default ModalPopup

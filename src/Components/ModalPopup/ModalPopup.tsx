import React from 'react'

type Props = {
  type?: string
  open: boolean
  onClose: () => void
  children?: React.ReactNode
}

const ModalPopup: React.FC<Props> = ({ type, open, onClose, children }) => {
  return (
    <div
      className={` fixed inset-0 flex transition-colors ${open ? 'visible bg-white-A700_d3/70' : 'invisible'} ${type === 'search' ? 'justify-center items-start pt-8' : 'justify-center items-center'} `}
      onClick={onClose}
    >
      <div
        className={`rounded-[15px] p-6   max-w-md ${open ? 'scale-100 opacity-100' : 'scale-110 opacity-0'} bg-white-A700`}
        onClick={(e) => e.stopPropagation()}
      >
        {type != 'search' ? (
          <>
            <button
              type='button'
              className='absolute top-2 right-2
         py-1 px-2 text-black-900  hover:text-red'
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

            {children}

            {/* <button type='button' onClick={onClose} className='w-[50px] '>
              <div className='bg-blue_gray-800 hover:bg-white-A700 text-white-A700 hover:!text-black-900 font-bold border border-solid mt-3 rounded'>
                Done
              </div>
            </button> */}
          </>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
export default ModalPopup

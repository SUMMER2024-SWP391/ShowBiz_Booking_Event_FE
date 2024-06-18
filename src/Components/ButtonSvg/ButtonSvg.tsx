type Props = {
  id: string
  handleDeleteQuestion: (id: string) => () => void
}

const ButtonSvg = ({ id, handleDeleteQuestion }: Props) => {
  return (
    <button
      type='button'
      className='h-6 w-6 absolute right-3 bottom-[20%] rounded-md'
      onClick={handleDeleteQuestion(id)}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-full h-full rounded-sm hover:stroke-red hover:text-white-A700'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
        />
      </svg>
    </button>
  )
}

export default ButtonSvg

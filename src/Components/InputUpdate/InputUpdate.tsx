type Props = {
  question: {
    _id: string
    description: string
    messageError: string
  }
  index: number
  handleChangeElement: (
    id: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputUpdate = ({ index, question, handleChangeElement }: Props) => {
  return (
    <div className=''>
      <div className=''>
        {/* <label className='text-gray-600'>Question {index + 1}</label> */}
        <input
          type='text'
          className={`pl-4 h-[54px] w-[300px] outline-none text-black-900 bg-white-A700 rounded-xl border-[2px] duration-300  'hover:border-gray-800 focus:border-gray-700`}
          value={question.description}
          onChange={handleChangeElement(question._id)}
        />
      </div>
      <span className='text-rose-700  pt-1'>{question.messageError}</span>
    </div>
  )
}

export default InputUpdate

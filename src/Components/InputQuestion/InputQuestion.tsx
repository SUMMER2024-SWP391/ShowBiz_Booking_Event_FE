import ButtonSvg from '../ButtonSvg/ButtonSvg'

type Props = {
  question: {
    _id: string
    description: string
    messageError: string
  }
  index: number
  handleChangeElement: (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => void
  // handleDeleteQuestion: (id: string) => () => void
}

const InputQuestion = ({
  index,
  question,
  handleChangeElement
  // handleDeleteQuestion
}: Props) => {
  return (
    <input type='text' className={`pl-4 h-[54px] outline-none text-black-900 bg-white-A700 rounded-xl border-[2px] duration-300 `} value={question.description} onChange={handleChangeElement(question._id)} />
    // <div className='flex flex-col'>
    //   <div className='flex flex-col gap-2 relative'>
    //     <label className='text-gray-600'>Question {index + 1}</label>
    //     <input
    //       type='text'
    //       className={`pl-4 h-[54px] outline-none text-black-900 bg-white-A700 rounded-xl border-[2px] duration-300 ${question.messageError != '' ? 'border border-rose-700' : 'hover:border-gray-800 focus:border-gray-700'}`}
    //       value={question.description}
    //       onChange={handleChangeElement(question._id)}
    //     />

    //     <ButtonSvg
    //       id={question._id}
    //       handleDeleteQuestion={handleDeleteQuestion}
    //     />
    //   </div>
    //   <span className='text-rose-700  pt-1'>{question.messageError}</span>
    // </div>
  )
}

export default InputQuestion

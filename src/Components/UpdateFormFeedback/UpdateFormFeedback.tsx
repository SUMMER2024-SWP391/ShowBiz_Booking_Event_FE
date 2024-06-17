import { useParams } from 'react-router-dom'
import EventOfForm from '../EventOfForm/EventOfForm'

const UpdateFormFeedback = () => {
  const { id } = useParams()

  return (
    <>
      <div className='flex flex-col justify-center items-center w-[95%]'>
        <EventOfForm render={'Update form feedback'} id={id as string} />
        <form className='grid grid-cols-2 gap-2'>
          <div className='flex flex-col'>
            <label className='mb-2'>Question</label>
            <input
              type='text'
              className='w-[300px] h-[54px] text-slate-950 rounded-xl bg-white-A700 outline-none hover:border-gray-400 focus:border-gray-400 pl-2'
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default UpdateFormFeedback

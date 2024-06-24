import { useParams } from 'react-router-dom'
import EventOfForm from '../EventOfForm/EventOfForm'

const AssignCheckingStaff = () => {
  const { id } = useParams()
  return (
    <div className='flex flex-col gap-2 justify-center items-center'>
      <EventOfForm id={id as string} render='List Staff' />
      <div className='flex flex-col justify-center items-center gap-4'>
        <form className='flex flex-col'>
          <div className='flex flex-col mb-4'>
            <div className='text-slate-100 text-sm mb-2'>New Staff</div>
            <input
              type='text'
              className='text-black-900 w-[200px] h-[40px] outline-none border-2 hover:border-slate-400 rounded-lg bg-slate-50 pl-3 duration-500'
            />
          </div>
          <button className='w-[200px] h-[40px] text-slate-50 bg-[#0958d9] rounded-lg opacity-90 hover:opacity-100 duration-300'>
            Add checking staff
          </button>
        </form>
      </div>
    </div>
  )
}

export default AssignCheckingStaff

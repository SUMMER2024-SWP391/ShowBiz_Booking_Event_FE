import { useQuery } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'

type Props = {
  id: string
  render: string
}

const EventOfForm = ({ id, render }: Props) => {
  const { data } = useQuery({
    queryKey: ['form_register_event'],
    queryFn: () => eventApi.getEventById(id as string)
  })
  return (
    <>
      {data && (
        <div>
          <div className='flex flex-row gap-2 mb-8'>
            <div className='basis-1/2 rounded-3xl'>
              <img
                className='w-full h-full rounded-3xl'
                src={data?.data.data.event.image}
                alt=''
              />
            </div>
            <div className='basis-1/ ml-6'>
              <div className='text-white-A700 mb-8 font-bold'>
                {data?.data.data.event.name}
              </div>
              <div className='mb-8 text-white-A700 capitalize'>
                capacity : {data?.data.data.event.capacity}
              </div>
              <div className='text-slate-300 mb-8 capitalize'>
                status : {data?.data.data.event.status}
              </div>
              <div className='text-slate-300 capitalize'>
                ticket price :{' '}
                {data?.data.data.event.ticket_price == '0'
                  ? 'Free'
                  : data?.data.data.event.ticket_price}
              </div>
            </div>
          </div>
          <div className='flex flex-row justify-center items-center mb-6'>
            <div className='bg-white-A700 h-[0.5px] w-8'></div>
            <div className='mx-2 hover:text-gray-600'>{render}</div>
            <div className='bg-white-A700 h-[0.5px] w-8'></div>
          </div>
        </div>
      )}
    </>
  )
}

export default EventOfForm

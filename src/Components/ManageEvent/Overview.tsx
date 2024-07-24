import { Button, Modal } from 'antd'
import { useState } from 'react'
import { Text } from '../Text/Text'
import { Img } from '../Img/Img'
import { Event } from 'src/@types/event.type'
import { Heading } from '../Heading/Heading'
import { parse, format } from 'date-fns'
import { EnvironmentOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { EventStatus } from 'src/@types/enum'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'
import { toast } from 'react-toastify'
import useClipboardCopy from 'src/hooks/useClipboardCopy'
import { useForm } from 'react-hook-form'
import { InviteUserSchema, inviteUserSchemaYup } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'

interface Props {
  event: Event
}

type FormInvite = InviteUserSchema

export const Overview = ({ event }: Props) => {
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<FormInvite>({
    resolver: yupResolver(inviteUserSchemaYup)
  })
  const queryClient = useQueryClient()
  const cancelEventMutation = useMutation({
    mutationFn: (id: string) => eventApi.removeEventById(id)
  })

  const inviteUserMutation = useMutation({
    mutationFn: (body: { email: string; user_name: string }) =>
      eventApi.inviteUser(event._id, body)
  })

  const onSubmit = handleSubmit((data) => {
    inviteUserMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Inivte user success')
      }
    })
  })

  const handleCancelEvent = () => {
    cancelEventMutation.mutate(event._id, {
      onSuccess: () => {
        toast.success('Cancel success')
        queryClient.invalidateQueries({ queryKey: ['student', event._id] })
      }
    })
  }

  const time = event.date_event.split('/')
  const [dayStr, monthStr, yearStr] = time.map((item) => item.trim())
  const dateObj = new Date(`${yearStr}-${monthStr}-${dayStr}`)
  const [open, setOpen] = useState<boolean>(false)
  const copyToClipboard = useClipboardCopy()
  return (
    <div className='mt-10 m-auto w-[820px]flex flex-col justify-center items-center '>
      <div className=' flex flex-row items-center justify-between'>
        {[
          EventStatus.REJECTED,
          EventStatus.CANCELED,
          EventStatus.PENDING
        ].includes(event.status as EventStatus) ? (
          <>
            <Button
              type='default'
              className='w-[257px] h-[56px] rounded-[15px] !bg-white-A700 opacity-90'
              disabled
            >
              <div className='flex flex-1 items-center gap-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  className='w-[30px] '
                >
                  <path
                    fill='currentColor'
                    fill-rule='evenodd'
                    d='m18.36 12.301-4.529 3.622c-.559.42-1.195.63-1.829.63-.63 0-1.259-.208-1.807-.62L5.76 12.297a.57.57 0 0 1-.207-.438c0-2.201 1.466-3.623 3.736-3.623h5.548c2.27 0 3.734 1.422 3.734 3.623a.57.57 0 0 1-.211.442m2.8-5.323L14.111 2.09c-.025-.015-.052-.025-.077-.04a3.67 3.67 0 0 0-1.97-.55 3.66 3.66 0 0 0-1.972.55c-.026.015-.052.025-.078.04L2.965 6.978C1.869 7.8 1.25 8.996 1.25 10.274v6.68c0 3.421 2.212 5.546 5.775 5.546H17.1c3.562 0 5.774-2.125 5.774-5.547v-6.68c0-1.277-.619-2.474-1.715-3.295'
                  ></path>
                </svg>
                <Text className='!text-black-900 text-[16px] !font-euclid'>
                  Invite Guest
                </Text>
              </div>
            </Button>
            <Button
              type='default'
              className='w-[257px] h-[56px] rounded-[15px] !bg-white-A700'
              disabled
            >
              <div className='flex  flex-1 items-center gap-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  className='w-[30px]'
                >
                  <path
                    fill='currentColor'
                    fill-rule='evenodd'
                    d='M14.681 2h-5.25c-1.7 0-3.08 0-4.167.146-1.132.152-2.099.48-2.868 1.25-.77.77-1.098 1.736-1.25 2.868C1 7.351 1 8.731 1 10.432v7.378c0 .612 0 1.15.044 1.575.046.433.152.95.522 1.371.333.38.784.637 1.28.731.55.105 1.05-.067 1.446-.249.39-.178.852-.451 1.378-.762l1.935-1.143c.63-.372.788-.456.948-.5s.338-.052 1.07-.052h5.058c1.647 0 2.983 0 4.039-.137 1.098-.144 2.04-.452 2.802-1.178q.084-.08.163-.163c.726-.762 1.034-1.704 1.177-2.802.138-1.056.138-2.392.138-4.039v-.143c0-1.647 0-2.983-.138-4.039-.143-1.098-.45-2.04-1.177-2.802a5 5 0 0 0-.163-.163c-.762-.726-1.704-1.034-2.802-1.177C17.664 2 16.328 2 14.68 2M7.395 6.884a1 1 0 1 0 0 2h5.117a1 1 0 1 0 0-2zm0 4.093a1 1 0 0 0 0 2h2.936a1 1 0 1 0 0-2z'
                  ></path>
                </svg>
                <Text className='!text-black-900 text-[16px] !font-euclid'>
                  <Link to={`/event-operator/manage/${event._id}/staff`}>
                    Add checking staff
                  </Link>
                </Text>
              </div>
            </Button>
            <Button
              type='default'
              className='w-[257px] h-[56px] rounded-[15px] !bg-white-A700 opacity-90'
              disabled
            >
              <div className='flex flex-1 items-center gap-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  className='w-[30px]'
                >
                  <path
                    fill='currentColor'
                    fill-rule='evenodd'
                    d='m22.665 10.315-7.394-7.47c-.728-.735-1.982-.22-1.982.816v3.7c-5.34.912-9.956 4.243-12.246 11.412-.27.842.791 1.416 1.448.826 3.568-3.205 7.342-4.817 10.798-3.963v3.868c0 1.067 1.321 1.567 2.028.767l7.393-8.375a1.16 1.16 0 0 0-.045-1.581'
                  ></path>
                </svg>
                <Text className='!text-black-900 text-[16px] !font-euclid'>
                  Share Event
                </Text>
              </div>
            </Button>
          </>
        ) : (
          <>
            <Button
              type='default'
              className='w-[257px] h-[56px] rounded-[15px] !bg-white-A700'
              onClick={() => setOpen(true)}
            >
              <div className='flex flex-1 items-center gap-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  className='w-[30px] '
                >
                  <path
                    fill='currentColor'
                    fill-rule='evenodd'
                    d='m18.36 12.301-4.529 3.622c-.559.42-1.195.63-1.829.63-.63 0-1.259-.208-1.807-.62L5.76 12.297a.57.57 0 0 1-.207-.438c0-2.201 1.466-3.623 3.736-3.623h5.548c2.27 0 3.734 1.422 3.734 3.623a.57.57 0 0 1-.211.442m2.8-5.323L14.111 2.09c-.025-.015-.052-.025-.077-.04a3.67 3.67 0 0 0-1.97-.55 3.66 3.66 0 0 0-1.972.55c-.026.015-.052.025-.078.04L2.965 6.978C1.869 7.8 1.25 8.996 1.25 10.274v6.68c0 3.421 2.212 5.546 5.775 5.546H17.1c3.562 0 5.774-2.125 5.774-5.547v-6.68c0-1.277-.619-2.474-1.715-3.295'
                  ></path>
                </svg>
                <Text className='!text-black-900 text-[16px] !font-euclid'>
                  Invite Guest
                </Text>
              </div>
            </Button>
            <Modal
              open={open}
              onCancel={() => setOpen(false)}
              width={'350px'}
              title='Invite user here'
              centered
            >
              <form
                className='flex flex-col justify-center items-center'
                onSubmit={onSubmit}
              >
                <div className='flex flex-col mb-1'>
                  <div className=' text-sm mb-2 mt-3'>Full name</div>
                  <input
                    type='text'
                    className='text-black-900 w-[300px] h-[40px] outline-none border-2 hover:border-slate-400 rounded-lg bg-slate-50 pl-3 duration-500'
                    {...register('user_name')}
                  />
                  <span className='text-red mt-1 text-sm'>
                    {errors.user_name?.message}
                  </span>
                </div>
                <div className='flex flex-col mb-1'>
                  <div className=' text-sm mb-2 mt-3'>Email</div>
                  <input
                    type='text'
                    className='text-black-900 w-[300px] h-[40px] outline-none border-2 hover:border-slate-400 rounded-lg bg-slate-50 pl-3 duration-500'
                    {...register('email')}
                  />
                  <span className='text-red mt-1 text-sm'>
                    {errors.email?.message}
                  </span>
                </div>

                <button className='mt-1 w-[300px] h-[40px] text-slate-50 bg-[#0958d9] rounded-lg opacity-90 hover:opacity-100 duration-300'>
                  Send mail
                </button>
              </form>
            </Modal>
            <Button
              type='default'
              className='w-[257px] h-[56px] rounded-[15px]'
            >
              <div className='flex  flex-1 items-center gap-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  className='w-[30px]'
                >
                  <path
                    fill='currentColor'
                    fill-rule='evenodd'
                    d='M14.681 2h-5.25c-1.7 0-3.08 0-4.167.146-1.132.152-2.099.48-2.868 1.25-.77.77-1.098 1.736-1.25 2.868C1 7.351 1 8.731 1 10.432v7.378c0 .612 0 1.15.044 1.575.046.433.152.95.522 1.371.333.38.784.637 1.28.731.55.105 1.05-.067 1.446-.249.39-.178.852-.451 1.378-.762l1.935-1.143c.63-.372.788-.456.948-.5s.338-.052 1.07-.052h5.058c1.647 0 2.983 0 4.039-.137 1.098-.144 2.04-.452 2.802-1.178q.084-.08.163-.163c.726-.762 1.034-1.704 1.177-2.802.138-1.056.138-2.392.138-4.039v-.143c0-1.647 0-2.983-.138-4.039-.143-1.098-.45-2.04-1.177-2.802a5 5 0 0 0-.163-.163c-.762-.726-1.704-1.034-2.802-1.177C17.664 2 16.328 2 14.68 2M7.395 6.884a1 1 0 1 0 0 2h5.117a1 1 0 1 0 0-2zm0 4.093a1 1 0 0 0 0 2h2.936a1 1 0 1 0 0-2z'
                  ></path>
                </svg>
                <Text className='!text-black-900 text-[16px] !font-euclid'>
                  <Link to={`/event-operator/manage/${event._id}/staff`}>
                    Add checking staff
                  </Link>
                </Text>
              </div>
            </Button>
            <Button
              type='default'
              className='w-[257px] h-[56px] rounded-[15px]'
              onClick={() =>
                copyToClipboard(`http://localhost:3000/events/${event._id}`)
              }
            >
              <div className='flex flex-1 items-center gap-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  className='w-[30px]'
                >
                  <path
                    fill='currentColor'
                    fill-rule='evenodd'
                    d='m22.665 10.315-7.394-7.47c-.728-.735-1.982-.22-1.982.816v3.7c-5.34.912-9.956 4.243-12.246 11.412-.27.842.791 1.416 1.448.826 3.568-3.205 7.342-4.817 10.798-3.963v3.868c0 1.067 1.321 1.567 2.028.767l7.393-8.375a1.16 1.16 0 0 0-.045-1.581'
                  ></path>
                </svg>
                <Text className='!text-black-900 text-[16px] !font-euclid'>
                  Share Event
                </Text>
              </div>
            </Button>
          </>
        )}
      </div>
      <div className='mt-5'>
        <div className='bg-white-A700 border border-solid shadow-2xl rounded-[15px] w-[788px] h-[347px] p-3 flex flex-row justify-between items-center'>
          <div className='w-[45%] flex flex-col items-center '>
            <div className='w-[300px] h-[300px]'>
              <Img
                src={event.image}
                className='w-full h-full object-fill rounded-[15px] shadow-2xl'
              />
            </div>
          </div>
          <div className='w-[50%] flex flex-col mr-5'>
            <div className='flex flex-row justify-between items-center'>
              <Heading
                as='h3'
                className='!text-black-900 m-1 text-[20px] !font-medium'
              >
                When & Where
              </Heading>
              <div>
                {event.status === EventStatus.PENDING ? (
                  <div className='flex justify-between items-center'>
                    <span className='flex w-3 h-3 me-3 bg-blue rounded-full'></span>
                    {event.status}
                  </div>
                ) : event.status === EventStatus.APPROVED ? (
                  <div className='flex justify-between items-center'>
                    <span className='flex w-3 h-3 me-3 bg-green rounded-full'></span>
                    {event.status}
                  </div>
                ) : event.status === EventStatus.REJECTED ? (
                  <div className='flex justify-between items-center'>
                    <span className='flex w-3 h-3 me-3 bg-red rounded-full'></span>
                    {event.status}
                  </div>
                ) : (
                  <div className='flex justify-between items-center'>
                    <span className='flex w-3 h-3 me-3 bg-red rounded-full'></span>
                    {event.status}
                  </div>
                )}
              </div>
            </div>
            <div className='mt-[15px] flex items-center gap-[10px]'>
              <div className='w-11 h-11 flex flex-col items-center justify-start rounded-md border border-solid border-gray-300 shadow-sm'>
                <div className='flex w-11 justify-center rounded-tl-md rounded-tr-md border border-solid border-gray-300 bg-gray-300 '>
                  <Text
                    size='md'
                    as='h4'
                    className='!font-euclid !text-black-900 self-center '
                  >
                    {dateObj.toLocaleString('en-US', {
                      month: 'short'
                    })}
                  </Text>
                </div>
                <div className='flex flex-col justify-center'>
                  <Text
                    size='lg'
                    as='p'
                    className='!font-euclid !text-black-900 '
                  >
                    {time[0]}
                  </Text>
                </div>
              </div>
              <div className='flex flex-col items-start gap-1 self-start'>
                <Text as='h5' className='!text-black-900 text-[16px] '>
                  {/* Thursday, May 9 */}
                  {format(
                    parse(event.date_event, 'dd/MM/yyyy', new Date()),
                    'EEEE, MMM dd'
                  )}
                </Text>
                <Text size='md' as='p' className='!font-euclid !text-black-900'>
                  {/* 5:30 PM - 8:30 PM */}
                  {event.time_start} - {event.time_end}
                </Text>
              </div>
            </div>
            <div className='mt-[15px] flex items-center gap-[10px]'>
              <div className='flex w-11 h-11 flex-col items-center justify-center gap-[3px] rounded-md border border-solid border-gray-300 pb-0.5 shadow-sm'>
                <EnvironmentOutlined className='text-black-900' />
              </div>
              <div className='flex flex-col items-start gap-1 self-start'>
                <Text as='h5' className='!text-black-900 text-[16px] '>
                  {event.location}
                </Text>
                <Text
                  size='md'
                  as='p'
                  className='!font-euclid !text-black_supper_light whitespace-nowrap overflow-hidden text-ellipsis '
                >
                  FPT University
                </Text>
              </div>
            </div>
            <Link to={`/event-operator/manage/${event._id}/checkin`}>
              {[
                EventStatus.CANCELED,
                EventStatus.REJECTED,
                EventStatus.PENDING
              ].includes(event.status as EventStatus) ? (
                <Button
                  className='mt-3 w-full bg-gray-100 flex  items-center justify-center gap-2 opacity-90'
                  disabled
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 16 16'
                    className='w-[14px]'
                  >
                    <path
                      fill='currentColor'
                      fill-rule='evenodd'
                      d='M5.759 0H6a1 1 0 0 1 0 2h-.2l-1.889.038c-.438.036-.663.101-.819.18a2 2 0 0 0-.874.874c-.08.156-.145.381-.18.819C2.001 4.361 2 4.943 2 5.8V6a1 1 0 0 1-2 0v-.241l.044-2.011c.046-.562.144-1.079.392-1.564A4 4 0 0 1 2.184.436C2.669.189 3.186.09 3.748.044 4.289 0 4.954 0 5.759 0m0 16H6a1 1 0 0 0 0-2h-.2c-.857 0-1.439-.001-1.889-.038-.438-.036-.663-.101-.819-.18a2 2 0 0 1-.874-.874c-.08-.156-.145-.381-.18-.819C2.001 11.639 2 11.057 2 10.2V10a1 1 0 1 0-2 0v.241l.044 2.011c.046.562.144 1.079.392 1.564a4 4 0 0 0 1.748 1.748c.485.247 1.002.346 1.564.392C4.289 16 4.954 16 5.759 16M10.2 0h.041l2.011.044c.562.046 1.079.144 1.564.392a4 4 0 0 1 1.748 1.748c.247.485.346 1.002.392 1.564C16 4.289 16 4.954 16 5.759V6a1 1 0 0 1-2 0v-.2l-.038-1.889c-.036-.438-.101-.663-.18-.819a2 2 0 0 0-.874-.874c-.156-.08-.381-.145-.819-.18C11.639 2.001 11.057 2 10.2 2H10a1 1 0 1 1 0-2zm.041 16H10a1 1 0 1 1 0-2h.2l1.889-.038c.438-.036.663-.101.819-.18a2 2 0 0 0 .874-.874c.08-.156.145-.381.18-.819.037-.45.038-1.032.038-1.889V10a1 1 0 1 1 2 0v.241l-.044 2.011c-.046.562-.145 1.079-.392 1.564a4 4 0 0 1-1.748 1.748c-.485.247-1.002.346-1.564.392-.541.044-1.206.044-2.011.044M4 7a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z'
                    ></path>
                  </svg>
                  <p>Check In Guests</p>
                </Button>
              ) : (
                <Button className='mt-3 w-full bg-gray-100 flex  items-center justify-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 16 16'
                    className='w-[14px]'
                  >
                    <path
                      fill='currentColor'
                      fill-rule='evenodd'
                      d='M5.759 0H6a1 1 0 0 1 0 2h-.2l-1.889.038c-.438.036-.663.101-.819.18a2 2 0 0 0-.874.874c-.08.156-.145.381-.18.819C2.001 4.361 2 4.943 2 5.8V6a1 1 0 0 1-2 0v-.241l.044-2.011c.046-.562.144-1.079.392-1.564A4 4 0 0 1 2.184.436C2.669.189 3.186.09 3.748.044 4.289 0 4.954 0 5.759 0m0 16H6a1 1 0 0 0 0-2h-.2c-.857 0-1.439-.001-1.889-.038-.438-.036-.663-.101-.819-.18a2 2 0 0 1-.874-.874c-.08-.156-.145-.381-.18-.819C2.001 11.639 2 11.057 2 10.2V10a1 1 0 1 0-2 0v.241l.044 2.011c.046.562.144 1.079.392 1.564a4 4 0 0 0 1.748 1.748c.485.247 1.002.346 1.564.392C4.289 16 4.954 16 5.759 16M10.2 0h.041l2.011.044c.562.046 1.079.144 1.564.392a4 4 0 0 1 1.748 1.748c.247.485.346 1.002.392 1.564C16 4.289 16 4.954 16 5.759V6a1 1 0 0 1-2 0v-.2l-.038-1.889c-.036-.438-.101-.663-.18-.819a2 2 0 0 0-.874-.874c-.156-.08-.381-.145-.819-.18C11.639 2.001 11.057 2 10.2 2H10a1 1 0 1 1 0-2zm.041 16H10a1 1 0 1 1 0-2h.2l1.889-.038c.438-.036.663-.101.819-.18a2 2 0 0 0 .874-.874c.08-.156.145-.381.18-.819.037-.45.038-1.032.038-1.889V10a1 1 0 1 1 2 0v.241l-.044 2.011c-.046.562-.145 1.079-.392 1.564a4 4 0 0 1-1.748 1.748c-.485.247-1.002.346-1.564.392-.541.044-1.206.044-2.011.044M4 7a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z'
                    ></path>
                  </svg>
                  <p>Check In Guests</p>
                </Button>
              )}
            </Link>
            <div
              className={`mt-10 flex items-center ${event.status == EventStatus.APPROVED ? 'justify-center' : 'justify-between'}`}
            >
              {event.status == EventStatus.PENDING && (
                <>
                  <Button
                    className='w-[49%] bg-gray-100 shadow-2xl'
                    onClick={handleCancelEvent}
                  >
                    Cancel this event
                  </Button>
                  <Button className='w-[49%] bg-gray-100 shadow-2xl'>
                    Edit Event
                  </Button>
                </>
              )}

              {[EventStatus.CANCELED, EventStatus.REJECTED].includes(
                event.status as EventStatus
              ) && (
                <>
                  <Button
                    className='w-[49%] bg-gray-100 shadow-2xl opacity-80'
                    disabled
                  >
                    Cancel this event
                  </Button>
                  <Button
                    className='w-[49%] bg-gray-100 shadow-2xl opacity-80'
                    disabled
                  >
                    Edit Event
                  </Button>
                </>
              )}

              {event.status == EventStatus.APPROVED && (
                <Button className='w-[49%] bg-gray-100 shadow-2xl'>
                  Edit Event
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Overview

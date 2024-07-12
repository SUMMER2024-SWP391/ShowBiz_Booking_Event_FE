import {
  AlignCenterOutlined,
  EditOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  RightOutlined,
  YoutubeOutlined
} from '@ant-design/icons'
import { Button, Heading, Img, Text } from 'src/Components'
import subriceIcon from 'src/assets/images/subrice.png'
import logoOperator from 'src/assets/images/4cfdb889-3c60-4e0f-be90-f3d8e01c504a.webp'
import Banner from 'src/assets/images/baner.png'
import {
  Col,
  DatePicker,
  DatePickerProps,
  Row,
  Switch,
  TimePicker,
  TimePickerProps
} from 'antd'
import { useState } from 'react'
import dayjs from 'dayjs'
import {
  CreateEvent as CreateEventBody,
  EventTypeEnum,
  LocationType
} from 'src/@types/event.type'
import { useMutation } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'
import { toast } from 'react-toastify'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/@types/utils.type'
import { omit } from 'lodash'

import EditorText from '../EditorText/EditorText'
import RangeStatic from 'quill'
import './style.css'
import ModalPopup from '../ModalPopup/ModalPopup'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { imageDB } from 'src/config/firebase.config'
import { v4 } from 'uuid'

interface LastChangeState {
  ops?: any[]
}

const defaultValueOfTime = {
  timeStart: dayjs('15:00', 'HH:MM'),
  timeEnd: dayjs('17:00', 'HH:MM'),
  dataEvent: dayjs('06/10/2024', 'DD/MM/YYYY')
}

const initForm = {
  type_event: 'Public',
  name: '',
  speaker_name: '',
  sponsor_name: '',
  description: '',
  ticket_price: '',
  capacity: '',
  date_event: '06/12/2024',
  location: LocationType.HALL_A,
  time_start: '15:00',
  time_end: '17:00'
}

const errorForm = {
  type_event: '',
  name: '',
  speaker_name: '',
  sponsor_name: '',
  description: '',
  ticket_price: '',
  capacity: '',
  date_event: '',
  location: '',
  time_start: '',
  time_end: ''
}

const CreateEvent = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [form, setForm] = useState<typeof initForm>(initForm)
  const [formError, setFormError] = useState<typeof errorForm>(errorForm)
  const [checked, setChecked] = useState<boolean>(false)
  const [range, setRange] = useState<RangeStatic | null>(null)
  const [lastChange, setLastChange] = useState<LastChangeState | null>(null)
  const [readOnly, setReadOnly] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  // Use a ref to access the quill instance directly
  const createEventMutation = useMutation({
    mutationFn: (body: CreateEventBody) => eventApi.createEvent(body)
  })

  // const readFileAsDataURL = (file: File): Promise<string> => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader()
  //     reader.readAsDataURL(file)
  //     reader.onload = () => {
  //       resolve(reader.result as string)
  //     }
  //     reader.onerror = (error) => reject(error)
  //   })
  // }
  //when image change you can call function to get url previewImage:

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const imgRef = ref(imageDB, `files/${v4()}`)
      await uploadBytes(imgRef, event.target.files[0]).then((value) => {
        getDownloadURL(value.ref).then((url) => setPreviewImage(url))
      })
    }
  }

  //handlechange time
  const handleChangeTime: (
    name: 'time_start' | 'time_end'
  ) => TimePickerProps['onChange'] = (name: 'time_start' | 'time_end') => {
    return (timeString) => {
      if (name === 'time_start') {
        timeString !== null
          ? setForm((prevForm) => ({
              ...prevForm,
              time_start: timeString.format('HH:MM').toString()
            }))
          : setForm((prevForm) => ({
              ...prevForm,
              time_start: defaultValueOfTime.timeStart
                .format('HH:MM')
                .toString()
            }))
      }

      if (name === 'time_end') {
        timeString !== null
          ? setForm((prevForm) => ({
              ...prevForm,
              time_end: timeString.format('HH:MM').toString()
            }))
          : setForm((prevForm) => ({
              ...prevForm,
              time_end: defaultValueOfTime.timeEnd.format('HH:MM').toString()
            }))
      }
    }
  }

  console.log(checked)
  //handle onChange datetime
  const onChangeDate: DatePickerProps['onChange'] = (dateString) => {
    dateString !== null
      ? setForm((prevForm) => ({
          ...prevForm,
          date_event: dateString.format('DD/MM/YYYY').toString()
        }))
      : setForm((prevForm) => ({
          ...prevForm,
          date_event: defaultValueOfTime.dataEvent
            .format('DD/MM/YYYY')
            .toString()
        }))
  }

  //handle on change switch
  const onChangeSwitch = () => {
    setChecked((pre) => !pre)
  }
  //handle change description
  const handleDescriptionChange = (content: string) => {
    setForm((prevForm) => ({ ...prevForm, description: content }))
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const bodyCreateEvent = {
      ...form,
      ticket_price: form.ticket_price ? form.ticket_price : 0,
      image: previewImage,
      is_required_form_register: checked
    }
    createEventMutation.mutate(bodyCreateEvent as any, {
      onSuccess: (data) => {
        toast.success(data.data.message)
      },
      onError: (error) => {
        if (
          isAxiosUnprocessableEntityError<ErrorResponse<typeof errorForm>>(
            error
          )
        ) {
          if (
            error.response?.data.errors?.time_end ||
            error.response?.data.errors?.time_start ||
            error.response?.data.errors?.date_event
          ) {
            toast.error('Time is duplicate with another different event')
          }
          const err = omit(error.response?.data.errors, [
            'date_event',
            'time_end',
            'time_end'
          ])
          setFormError((prev) => ({ ...prev, ...(err as typeof errorForm) }))
          toast.error('Please check your input')
        }
      }
    })
  }

  return (
    <div className='flex w-full flex-col items-center gap-[61px] bg-blue_gray-900'>
      <div className='flex container-xs justify-center'>
        <form
          className='flex justify-center'
          noValidate
          onSubmit={handleSubmit}
        >
          <div className='flex md:flex-col justify-center'>
            <div className='flex w-[50%] flex-row items-start pb-[31px] md:w-full sm:pb-5 justify-center'>
              <div className='w-[50%] m-[40px]'>
                <div className='relative flex h-[300px] w-[300px] rounded-[30px] items-center justify-center'>
                  {previewImage ? (
                    <Img
                      src={previewImage}
                      alt='Name Image'
                      className='h-[280px] w-[350px] rounded-[20px] object-cover mb-[40px]'
                    />
                  ) : (
                    <Img
                      src={Banner}
                      alt='thumnal_event'
                      className='h-[286px] w-[375px] rounded-[30px] object-cover mb-[40px]'
                    />
                  )}
                  <input
                    type='file'
                    className='absolute opacity-0 top-0 left-0 w-full h-full cursor-pointer'
                    onChange={handleChange}
                  />
                </div>

                <div className='flex flex-col'>
                  <div className='flex flex-col items-start justify-between gap-5'>
                    <div className='flex items-center justify-between gap-[15px]'>
                      <Img
                        src={logoOperator}
                        alt='subriceIcon'
                        className='h-[32px] w-[32px] rounded-[5px] object-cover'
                      />
                      <div className='flex flex-col items-start gap-0.5'>
                        <Text
                          size='xs'
                          as='p'
                          className='!font-medium !text-white-A700_cc'
                        >
                          Presented by
                        </Text>
                        <Text size='s' as='p'>
                          <span className='font-semibold text-white-A700'>
                            CLB Cóc Sài Gòn
                          </span>
                        </Text>
                      </div>
                      <RightOutlined className='mt-4 text-white-A700_cc' />
                      <Img
                        src={subriceIcon}
                        alt='subriceicon'
                        className='h-[49px] w-[14%] ml-9 object-cover'
                      />
                    </div>
                    <div className='flex gap-[15px]'>
                      <InstagramOutlined className='h-[16px] w-[16px] text-white-A700_cc' />
                      <YoutubeOutlined className='h-[16px] w-[16px] text-white-A700_cc' />
                      <FacebookOutlined className='h-[16px] w-[16px] text-white-A700_cc' />
                    </div>
                  </div>
                </div>
                <div className='mt-[34px] flex w-[93%] flex-col items-start gap-2 md:w-full'>
                  <div className='self-stretch'>
                    <div className='flex flex-col w-full items-start gap-[11px]'>
                      <div className='flex flex-row w-full'>
                        <Text
                          size='lg'
                          as='p'
                          className='!text-white-A700_cc w-[50%]'
                        >
                          Speaker by
                        </Text>
                        <input
                          type='text'
                          className='w-[50%] text-[14px] bg-blue_gray-900 outline-none border-none text-end !text-white-A700_bf [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                          placeholder='Name of Host'
                          value={form.speaker_name}
                          onChange={(event) => {
                            setForm((prev) => ({
                              ...prev,
                              speaker_name: event.target.value
                            }))
                          }}
                        />
                        <div className='mt-1 text-sm text-red'>
                          {formError.speaker_name}
                        </div>
                      </div>
                      <div className='ml-5 h-px self-stretch bg-white-A700_5e md:ml-0' />
                    </div>
                  </div>
                </div>
                <div className='mt-[34px] flex w-[93%] flex-col items-start gap-2 md:w-full'>
                  <div className='self-stretch'>
                    <div className='flex flex-col w-full items-start gap-[11px]'>
                      <div className='flex flex-row w-full'>
                        <Text
                          size='lg'
                          as='p'
                          className='!text-white-A700_cc w-[50%]'
                        >
                          Sponsor
                        </Text>
                        <input
                          type='text'
                          className='w-[50%] text-[14px] bg-blue_gray-900 outline-none border-none text-end !text-white-A700_bf [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                          placeholder='Name of Speacker'
                          value={form.sponsor_name}
                          onChange={(event) => {
                            setForm((prev) => ({
                              ...prev,
                              sponsor_name: event.target.value
                            }))
                          }}
                        />
                        <div className='mt-1 text-sm text-red'>
                          {formError.sponsor_name}
                        </div>
                      </div>
                      <div className='ml-5 h-px self-stretch bg-white-A700_5e md:ml-0' />
                    </div>
                  </div>
                </div>

                <Text size='s' as='p' className='mt-[19px] !text-white-A700_cc'>
                  Contact the Host
                </Text>
                <Text size='s' as='p' className='mt-[19px] !text-white-A700_cc'>
                  Report Event
                </Text>
              </div>
              <div className='flex w-[50%] flex-coll gap-5 md:w-full'>
                <div className='flex flex-col items-start'>
                  <div className='flex justify-between gap-5 self-stretch mt-5'>
                    <Heading
                      size='s'
                      as='h1'
                      className='flex items-center justify-center rounded-[10px] bg-gray-800_01 p-2 !text-black-900'
                    >
                      <span className='text-white-A700_bf'>Featured in</span>
                      <span className='text-white-A700 ml-2'>
                        Ho Chi Minh City
                      </span>
                    </Heading>
                    <select
                      className='bg-blue_gray-900_01 text-[14px] max-w-xs rounded-lg text-white-A700 font-euclid'
                      value={form.type_event}
                      onChange={(event) => {
                        setForm((prev) => ({
                          ...prev,
                          type_event: event.target.value
                        }))
                      }}
                    >
                      <option value={EventTypeEnum.PRIVATE}>Private</option>
                      <option value={EventTypeEnum.PUBLIC}>Public</option>
                    </select>
                  </div>
                  <input
                    className='mt-2 h-14 font-bold text-[30px] bg-blue_gray-900 !text-white-A700 outline-none border-none w-full'
                    placeholder='Event Name'
                    value={form.name}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, name: event.target.value }))
                    }
                  />
                  <div className='mt-1 text-sm text-red'>{formError.name}</div>
                  <div className='mt-2 flex justify-around items-center gap-5 rounded-[10px] p-3 h-auto w-full bg-gray-800_01 sm:pl-5'>
                    <Col>
                      <Row>
                        <Text
                          as='p'
                          className='m-2 !text-blue_gray-100 !font-bold'
                        >
                          Time
                        </Text>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <DatePicker
                          size='middle'
                          onChange={onChangeDate}
                          format={'DD/MM/YYYY'}
                        />
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <TimePicker
                          format='HH:mm'
                          showNow={false}
                          onChange={handleChangeTime('time_start')}
                          value={dayjs(form.time_start, 'HH:MM')}
                        />
                      </Row>
                    </Col>
                    -
                    <Col>
                      <Row>
                        <TimePicker
                          format='HH:mm'
                          showNow={false}
                          onChange={handleChangeTime('time_end')}
                          value={dayjs(form.time_end, 'HH:MM')}
                        />
                      </Row>
                    </Col>
                  </div>
                  <div className='flex flex-row  p-2 mt-5 rounded-[10px] h-auto w-full bg-gray-800_01 sm:pl-5'>
                    <EnvironmentOutlined className='' />
                    <div className='flex flex-col items-start ml-2'>
                      <Text
                        as='p'
                        size='lg'
                        className=' !text-blue_gray-100 !font-bold'
                      >
                        Add Event Location
                      </Text>
                      <select
                        className='font-normal !text-blue_gray-100 bg-gray-800_01 outline-none border-none text-sm w-full'
                        value={form.location}
                        onChange={(event) => {
                          setForm((prev) => ({
                            ...prev,
                            location: event.target.value as LocationType
                          }))
                        }}
                      >
                        <option value={LocationType.HALL_A}>Hall A</option>
                        <option value={LocationType.HALL_B}>Hall B</option>
                        <option value={LocationType.HALL_C}>Hall C</option>
                        <option value={LocationType.HALL_D}>Hall D</option>
                        <option value={LocationType.HALL_E}>Hall E</option>
                      </select>
                      <div className='mt-1 text-sm text-red'>
                        {errorForm.location}
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-row items-center p-2 mt-5 rounded-[10px] h-auto w-full bg-gray-800_01 sm:pl-5'>
                    <div className='col-span-1 flex justify-center items-center'>
                      <AlignCenterOutlined />
                    </div>

                    <div className='flex-col items-start ml-2 '>
                      <button
                        type='button'
                        onClick={() => setOpen(true)}
                        className='ml-3 !text-blue_gray-100 !font-bold '
                      >
                        Add Description
                      </button>
                      <ModalPopup
                        type=''
                        open={open}
                        onClose={() => setOpen(false)}
                      >
                        <EditorText
                          value={form.description}
                          onChange={handleDescriptionChange}
                          readOnly={readOnly}
                        />
                      </ModalPopup>

                      <div className='mt-1 text-sm text-red'>
                        {errorForm.description}
                      </div>
                    </div>
                  </div>
                  <Text as='h1' size='lg' className='mt-3 !font-medium'>
                    Event Option
                  </Text>
                  <div className='mt-2 flex flex-col gap-5 rounded-[10px] p-3 h-auto w-full bg-gray-800_01 sm:pl-5'>
                    <div className='flex flex-col'>
                      <div className='flex flex-row'>
                        <div className='flex self-center m-auto w-[10%]'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='size-5 '
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z'
                            />
                          </svg>
                        </div>
                        <div className='flex items-center w-[40%]'>
                          <Text
                            as='p'
                            className='!text-[16px] !font-medium !text-white-A700_bf'
                          >
                            Tickets
                          </Text>
                        </div>
                        <div className='flex flex-row-reverse w-[50%] '>
                          <EditOutlined className='ml-1' />
                          <input
                            type='text'
                            className='bg-gray-800_01 outline-none border-none text-end !text-white-A700_bf [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                            placeholder='Free'
                            value={form.ticket_price}
                            onChange={(event) => {
                              setForm((prev) => ({
                                ...prev,
                                ticket_price: event.target.value
                              }))
                            }}
                          />
                          <div className='mt-1 text-sm text-red'>
                            {errorForm.ticket_price}
                          </div>
                        </div>
                      </div>
                      <div className='mt-2 ml-5 h-[0.4px] opacity-20 self-stretch bg-white-A700_5e md:ml-0' />
                    </div>
                    <div className='flex flex-col'>
                      <div className='flex flex-row'>
                        <div className='flex self-center m-auto w-[10%]'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 16 16'
                            stroke='currentColor'
                            className='size-5 '
                          >
                            <path
                              fill='currentColor'
                              fillRule='evenodd'
                              d='M7.75.25C5.336.25 3.5 2.086 3.5 4.5c0 1.225.474 2.007.9 2.575.09.12.165.216.23.298.102.13.18.228.255.345.101.158.115.233.115.282 0 .34-.126.536-.392.728-.3.217-.708.375-1.25.585l-.13.05c-.55.215-1.233.49-1.767.954C.88 10.821.5 11.524.5 12.5c0 .752.341 1.354.85 1.799.488.427 1.133.717 1.81.92 1.354.406 3.065.531 4.59.531a.75.75 0 0 0 0-1.5c-1.475 0-3.014-.125-4.16-.468-.573-.173-.99-.383-1.252-.612-.242-.211-.338-.422-.338-.67 0-.524.18-.821.446-1.052.309-.269.751-.463 1.326-.687l.159-.061c.493-.19 1.087-.418 1.555-.756C6.064 9.527 6.5 8.91 6.5 8c0-.451-.174-.813-.353-1.093-.112-.173-.265-.37-.397-.537l-.15-.195c-.324-.432-.6-.9-.6-1.675 0-1.586 1.164-2.75 2.75-2.75S10.5 2.914 10.5 4.5c0 .672-.208 1.11-.463 1.484a.75.75 0 1 0 1.24.843A3.96 3.96 0 0 0 12 4.5C12 2.086 10.164.25 7.75.25m7.561 9.247a.75.75 0 0 0-1.122-.994l-2.962 3.34-.896-1.096a.75.75 0 0 0-1.161.95l1.454 1.778a.75.75 0 0 0 1.142.023z'
                            ></path>
                          </svg>
                        </div>
                        <div className='flex w-[70%]'>
                          <Text
                            as='p'
                            className='w-full !text-[16px] !font-medium !text-white-A700_bf'
                          >
                            Require Approval
                          </Text>
                        </div>
                        <div className='flex flex-row-reverse items-center w-[20%] '>
                          <Switch
                            defaultChecked={false}
                            size='small'
                            onChange={onChangeSwitch}
                            className='ml-1'
                          />
                        </div>
                      </div>
                      <div className='mt-2 ml-5 h-[0.2px] opacity-20 self-stretch bg-white-A700_5e md:ml-0' />
                    </div>
                    <div className='flex flex-col'>
                      <div className='flex flex-row'>
                        <div className='flex self-center m-auto w-[10%]'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 16 16'
                            className='size-5 '
                          >
                            <path
                              fill='currentColor'
                              fillRule='evenodd'
                              d='M8 15.5a.75.75 0 0 0 .75-.75V10.5h.041c.872 0 1.609 0 2.159-.08s1.195-.277 1.5-.928c.305-.65.043-1.273-.248-1.746-.29-.474-.762-1.04-1.32-1.71l-.04-.047-.422-.507-.033-.04c-.399-.478-.748-.897-1.072-1.19-.348-.314-.769-.578-1.315-.578s-.966.264-1.315.578c-.324.293-.673.712-1.071 1.19l-.034.04-.422.507-.04.047c-.557.67-1.03 1.236-1.32 1.71-.29.473-.552 1.096-.248 1.746.305.651.95.848 1.5.928s1.288.08 2.16.08h.04v4.25c0 .414.336.75.75.75M4.921 8.85c.046.022.145.057.345.086C5.695 8.998 6.321 9 7.27 9h1.46c.95 0 1.576-.002 2.004-.064.2-.03.3-.064.345-.086a1.3 1.3 0 0 0-.155-.32c-.227-.369-.626-.851-1.234-1.58l-.422-.507c-.442-.53-.723-.865-.958-1.077-.213-.193-.29-.192-.308-.192h-.003c-.02 0-.096 0-.308.192-.235.212-.516.546-.958 1.077l-.423.507c-.608.729-1.007 1.211-1.234 1.58-.106.173-.143.271-.155.32M14 2a.75.75 0 0 0 0-1.5H2A.75.75 0 1 0 2 2z'
                            ></path>
                          </svg>
                        </div>
                        <div className='flex w-[70%]'>
                          <Text
                            as='p'
                            className='w-full !text-[16px] !font-medium !text-white-A700_bf'
                          >
                            Capacity
                          </Text>
                        </div>
                        <div className='flex flex-row-reverse items-center w-[20%] h-[45psx] '>
                          <EditOutlined className='ml-1' />
                          <input
                            type='number'
                            className='bg-gray-800_01 outline-none border-none text-end !text-white-A700_bf [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                            placeholder='Unlimited'
                            value={form.capacity}
                            onChange={(event) => {
                              setForm((prev) => ({
                                ...prev,
                                capacity: event.target.value
                              }))
                            }}
                          />
                        </div>
                      </div>
                      <div className=' flex justify-end items-center w-[200px] mt-1 text-sm text-red '>
                        {formError.capacity}
                      </div>
                    </div>
                  </div>
                  <Button
                    type='submit'
                    size='xl'
                    color='white_A700'
                    className='mt-5 w-full rounded-[10px] border border-solid border-white-A700 font-medium sm:px-5'
                  >
                    Create Event
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent

import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../Button/Button'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterEventSchema, RegisterEventSchemaYup } from 'src/utils/rules'
import eventApi from 'src/apis/event.api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'react-router-dom'
import InputVerTwo from '../InputVerTwo/InputVerTwo'
import { Text } from '../Text/Text'
type Props = {
  className?: string
  setTrigger?: (value: boolean) => void
  _id: string
}

export type FormData = RegisterEventSchema

// const {
//   register,
//   handleSubmit,
//   setError,
//   formState: { errors }
// } = useForm<FormData>({
//   resolver: yupResolver(RegisterEventSchemaYup)
// })
// const registerMutation = useMutation({
//   mutationFn: (body: FormData) => eventApi.registerEvent(body)
// })
// const onSubmit = handleSubmit((data) => {
//   registerMutation.mutate(data, {
//     onSuccess: (data) => {
//       console.log(data)
//     },
//     onError: (error) => {
//       console.log(error)
//       // if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
//       //   console.log(error.response?.data.errors)
//       //   const formError = error.response?.data.errors

//       // if (formError) {
//       //   Object.keys(formError).forEach((key) => {
//       //     setError(key as keyof FormData, {
//       //       message: formError[key as keyof FormData],
//       //       type: 'Server'
//       //     })
//       //   })
//       // }
//       // }
//     }
//   })
// })
export const FormRegister = ({ className, setTrigger, _id }: Props) => {
  console.log('id', _id)

  const { data } = useQuery({
    queryKey: ['eventId', _id],
    queryFn: () => eventApi.getListQuestion(_id)
  })
  console.log('hi', data)

  return (
    <div className={`${className} flex flex-col view_detail fixed inset-0`}>
      <Button
        className='w-10 h-10 text-[20px] !text-white-A700 absolute top-5 right-5 z-50'
        onClick={() => setTrigger && setTrigger(false)}
      >
        X
      </Button>
      <div className='mt-[100px] flex justify-center items-center'>
        <div className='w-[300px] flex flex-col gap-5 self-end'>
          <h1 className='text-2xl font-bold text-center !text-white-A700'>
            Register
          </h1>
          <form className='mt-10'>
            <div className='flex flex-col gap-2'>
              <Text
                as='p'
                size='xl'
                className='!text-white-A700 font-monterat !font-medium'
              >
                Ho Va Ten
              </Text>
              <InputVerTwo
                type='text'
                name='full_name'
                placeholder={`Input your Full Name`}
                classNameInput='rounded-[10px] border border-solid
                   border-white-A700 font-bold sm:pr-5 w-full font-euclid p-2 outline-none
                    focus:border-gray-700'
                // register={register}
                // errorMessage={errors.full_name?.message}
              />
              <Text
                as='p'
                size='xl'
                className='!text-white-A700 font-monterat !font-medium'
              >
                Phone Number
              </Text>
              <InputVerTwo
                type='text'
                name='phone_number'
                placeholder={`Input your phone number`}
                classNameInput='rounded-[10px] border border-solid
                   border-white-A700 font-bold sm:pr-5 w-full font-euclid p-2 outline-none
                    focus:border-gray-700'
                // register={register}
                // errorMessage={errors.phone_number?.message}
              />
              <Text
                as='p'
                size='xl'
                className='!text-white-A700 font-monterat !font-medium'
              >
                MSSV
              </Text>
              <InputVerTwo
                type='text'
                name='mssv'
                placeholder={`Input your MSSV`}
                classNameInput='rounded-[10px] border border-solid
                   border-white-A700 font-bold sm:pr-5 w-full font-euclid p-2 outline-none
                    focus:border-gray-700'
                // register={register}
                // errorMessage={errors.mssv?.message}
              />
              <Button
                size='xl'
                color='white_A700'
                className='mt-[10px] w-full rounded-[10px] border border-solid border-white-A700 font-medium sm:px-5'
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
const Background = styled.div`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`

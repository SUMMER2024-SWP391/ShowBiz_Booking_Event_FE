import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../Button/Button'
import { RegisterEventSchema, RegisterEventSchemaYup } from 'src/utils/rules'
import eventApi from 'src/apis/event.api'
import { useMutation, useQuery } from '@tanstack/react-query'
import InputVerTwo from '../InputVerTwo/InputVerTwo'
import { Text } from '../Text/Text'
import { useForm } from 'react-hook-form'
import { FormEventRegister } from 'src/@types/event.type'

type Props = {
  className?: string
  setTrigger?: (value: boolean) => void
  _id: string
}
export type FormDataEvent = FormEventRegister
const initFormData: FormDataEvent = {
  answer: [
    {
      _id: '',
      description: ''
    }
  ]
}

export const FormRegister = ({ className, setTrigger, _id }: Props) => {
  console.log('id', _id)
  const [form, setForm] = useState<FormDataEvent>(initFormData)
  const getQuestion = useQuery({
    queryKey: ['eventId', _id],
    queryFn: () => eventApi.getListQuestion(_id)
  })
  // console.log('getQuestion', getQuestion.data?.data.data.formRegister);
  const registerEventMutation = useMutation({
    mutationFn: (body: FormDataEvent) => eventApi.registerEvent(_id, body)
  })
  const handleChange =  (questionId: string) => async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
  
    // Ensure getQuestion data is available before updating form
    if (!getQuestion.isSuccess) {
      console.warn('Question data not yet loaded. Ignoring change.');
      return;
    }
  
    const question = getQuestion.data?.data.data.formRegister.map((item) => item._id === questionId);
    if (!question) {
      console.warn(`Question with ID ${questionId} not found. Ignoring change.`);
      return;
    }
    console.log('question', question);
    
     setForm((prevForm) => ({
      ...prevForm,
      answer: prevForm.answer.map((answer) =>
        answer._id === questionId ? { ...answer, description: value } : answer
      ),
    }));
  };

    
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    registerEventMutation.mutate(form, {
      onSuccess: () => {
        console.log('success', form)
      },
      onError: (error) => {
        console.log('error', error)
      }
    })
  }
  console.log(initFormData)

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
          <form className='mt-10' onSubmit={handleSubmit}>
            {getQuestion.data?.data.data.formRegister.map((item) => (
              <>
                <div className='flex flex-col gap-2' key={item._id}>
                  <Text
                    as='p'
                    size='xl'
                    className='!text-white-A700 font-monterat !font-medium'
                  >
                    {item.description}
                  </Text>
                  <InputVerTwo
                    type='text'
                    name={item._id}
                    placeholder={`Input your Full Name`}
                    classNameInput='rounded-[10px] border border-solid
                   border-white-A700 font-bold sm:pr-5 w-full font-euclid p-2 outline-none
                    focus:border-gray-700'
                    onChange={handleChange(item._id)}
                    // register={register}
                    // errorMessage={errors.full_name?.message}
                  />
                </div>
              </>
            ))}
            <Button
              color='blue_gray_900'
              size='xl'
              className='min-w-[345px] p-5 h-[37px] gap-1.5 rounded-[10px] border border-solid
                 border-blue_gray-100_04 font-semibold sm:px-5 text-white-A700 text-center 
                 flex justify-center items-center hover:bg-white-A700 hover:text-black-900'
            >
              Register
            </Button>
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

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../Button/Button'
import eventApi from 'src/apis/event.api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FormEventRegister } from 'src/@types/event.type'
import { toast } from 'react-toastify'
import { EventQuestionType } from 'src/@types/form.type'

type Props = {
  className?: string
  setTrigger?: (value: boolean) => void
  _id: string
}
export type FormDataEvent = FormEventRegister
const initFormData: FormDataEvent = {
  answers: []
}

export const FormRegister = ({ className, setTrigger, _id }: Props) => {
  const [form, setForm] = useState<FormDataEvent>(initFormData)
  const getQuestion = useQuery({
    queryKey: ['eventId', _id],
    queryFn: () => eventApi.getListQuestion(_id, EventQuestionType.REGISTER)
  })
  const registerEventMutation = useMutation({
    mutationFn: (body: FormDataEvent) => eventApi.registerEvent(_id, body)
  })

  const handleChange =
    (questionId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value

      setForm((pre) => ({
        ...pre,
        answers: pre.answers.map((item) => {
          if (item._id === questionId) return { ...item, description: value }
          return item
        })
      }))
    }

  useEffect(() => {
    if (getQuestion.data) {
      const answers: Array<{
        _id: string
        description: string
        question: string
      }> = []
      const listQuestion = getQuestion.data.data.data.formRegister
      for (let i = 0; i < listQuestion.length; i++) {
        answers.push({
          _id: listQuestion[i]._id,
          question: listQuestion[i].description,
          description: ''
        })
      }
      setForm((pre) => ({ ...pre, answers: [...answers] }))
    }
  }, [getQuestion.data])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    registerEventMutation.mutate(form as FormEventRegister, {
      onSuccess: () => {
        toast.success('Register event success')
      },
      onError: () => {
        toast.error('Something error')
      }
    })
  }

  console.log(form)

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
            {form.answers.length !== 0 &&
              form.answers.map((item) => (
                <div className='flex flex-col gap-2 pb-2' key={item._id}>
                  <div className='mb-2 text-white-A700'>{item.question}</div>
                  <input
                    type='text'
                    className='input w-[300px] focus:border-gray-300'
                    name={item._id}
                    value={item.description}
                    onChange={handleChange(item._id)}
                  />
                </div>
              ))}
            <Button
              color='blue_gray_900'
              size='xl'
              className='min-w-[300px] p-5 h-[37px] gap-1.5 rounded-[10px] border border-solid
                 border-blue_gray-100_04 font-semibold sm:px-5 text-white-A700 text-center 
                 flex justify-center items-center hover:bg-white-A700 hover:text-black-900 mt-4'
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

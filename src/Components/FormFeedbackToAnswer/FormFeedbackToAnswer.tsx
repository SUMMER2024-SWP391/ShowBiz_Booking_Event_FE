import React, { useEffect, useState } from 'react'
import { Button } from '../Button/Button'
import eventApi from 'src/apis/event.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FormEventRegister } from 'src/@types/event.type'
import { toast } from 'react-toastify'
import { isAxiosError } from 'src/utils/utils'
import { ErrorResponse } from 'src/@types/utils.type'

type Props = {
  _id: string
}
export type FormDataEvent = FormEventRegister
const initFormData: FormDataEvent = {
  answers: []
}

export const FormFeedbackToAnswer = ({ _id }: Props) => {
  const queryClient = useQueryClient()
  const [form, setForm] = useState<FormDataEvent>(initFormData)
  const getQuestion = useQuery({
    queryKey: ['eventId', _id],
    queryFn: () => eventApi.getFormFeedback(_id)
  })
  const feedbackEventMutation = useMutation({
    mutationFn: (body: FormDataEvent) => eventApi.feedbackEvent(_id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticket-detail'] })
    }
  })

  const handleChange =
    (questionId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value

      setForm((pre) => ({
        ...pre,
        answers: pre.answers.map((item) => {
          if (item.question_id === questionId)
            return { ...item, description: value }
          return item
        })
      }))
    }

  useEffect(() => {
    if (getQuestion.data) {
      const answers: Array<{
        question_id: string
        description: string
        question: string
      }> = []
      const listQuestion = getQuestion.data.data.data.formQuestion
      for (let i = 0; i < listQuestion.length; i++) {
        answers.push({
          question_id: listQuestion[i]._id,
          question: listQuestion[i].description,
          description: ''
        })
      }
      setForm((pre) => ({ ...pre, answers: [...answers] }))
    }
  }, [getQuestion.data])
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    feedbackEventMutation.mutate(form as FormEventRegister, {
      onSuccess: () => {
        toast.success('Feedback event success')
      },
      onError: (error) => {
        if (isAxiosError<ErrorResponse<{}>>(error)) {
          toast.error(error.response?.data.message)
        }
      }
    })
  }

  return (
    <form className='mt-1' onSubmit={handleSubmit}>
      {form.answers.length !== 0 &&
        form.answers.map((item) => (
          <div className='flex flex-col gap-2 pb-2' key={item.question_id}>
            <div className='mb-2 text-black-900'>{item.question}</div>
            <input
              type='text'
              className='bg-white-A700_bf h-[35px] w-[300px] outline-none border focus:border-gray-300 text-black-900 pl-2 rounded-md'
              name={item.question_id}
              value={item.description}
              onChange={handleChange(item.question_id)}
            />
          </div>
        ))}
      <Button
        color=''
        size='xl'
        className='min-w-[300px] p-5 h-[37px] gap-1.5 rounded-md border border-solid
                 border-blue_gray-100_04 font-semibold sm:px-5 text-white-A700 text-center 
                 flex justify-center items-center bg-[#0958d9] hover:bg-[#4096ff] mt-4'
      >
        Feedback
      </Button>
    </form>
  )
}

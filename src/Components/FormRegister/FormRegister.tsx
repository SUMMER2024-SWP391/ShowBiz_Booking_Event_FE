import React, { useEffect, useState } from 'react'
import { Text } from '../Text/Text'
import { Button, Modal } from 'antd'
import { CreateFormRegister } from './CreateFormRegister'
import eventApi from 'src/apis/event.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import InputUpdate from '../InputUpdate/InputUpdate'
import { EventQuestionType } from 'src/@types/form.type'
import { formAPI } from 'src/apis/form.api'
import { toast } from 'react-toastify'

type Props = {
  isOpen: boolean
}
type Question = {
  _id: string
  description: string
  messageError: string
}
export const FormRegister = () => {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['form_feedback'],
    queryFn: () => eventApi.getListQuestion(id as string)
  })
  const [form, setForm] = useState<Array<Question>>([])
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()
  const deleteQuestion = useMutation({
    mutationFn: (id: string) => formAPI.deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['form_register'], exact: true })
      toast.success('Delete question success')
    }
  })
  const updateFormEventMutation = useMutation({
    mutationFn: (body: {
      id?: string
      body: {
        questions: Array<{ _id: string; description: string }>
        type: EventQuestionType
      }
    }) => formAPI.updateForm(body.id as string, body.body)
  })

  useEffect(() => {
    if (data?.data.data.formQuestion) {
      const { formQuestion } = data.data.data
      formQuestion.map((question) => ({ ...question, messageError: '' }))
      setForm(formQuestion as Array<Question>)
    }
  }, [data?.data.data.formQuestion])

  const handleChangeElement = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setForm((prevForm) =>
      prevForm.map((question) => {
        if (question._id === id) {
          return { ...question, description: value }
        }
        return question
      })
    )
  }
  const handleValidateQuestion = (): {
    listQuestionError: Array<Question>
    count: number
  } => {
    const listQuestionError = form
    let count = 0
    listQuestionError.map((question) => {
      if (!question.description) {
        count++
        return (question.messageError = 'This field is required')
      }
      return question
    })

    return { listQuestionError, count }
  }

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const result = handleValidateQuestion()

    if (result.count > 0) {
      setForm(result.listQuestionError)
      return
    }

    const questions: Array<{ _id: string; description: string }> = []
    for (let index = 0; index < form.length; index++) {
      questions.push({
        _id: form[index]._id,
        description: form[index].description
      })
    }

    updateFormEventMutation.mutate(
      {
        id,
        body: {
          questions,
          type: EventQuestionType.REGISTER
        }
      },
      {
        onSuccess: () => {
          toast.success('Update form register event sucessfully')
        },
        onError : () => {
          toast.error('Event had approve by admin, you can not update')
        }
      }
    )
  }
  const handleDeleteQuestion = (id: string) => {
    deleteQuestion.mutate(id as string)
  }
  return (
    <div className='mt-5 flex flex-col'>
      <div className='mt-3 flex flex-row items-center'>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='w-[16px] h-[16px]'>
          <path
            fill='currentColor'
            fill-rule='evenodd'
            d='M6.414 0c-1.17 0-2.293.465-3.121 1.293a1 1 0 1 0 1.414 1.414A2.41 2.41 0 0 1 6.414 2h11.172c.64 0 1.254.254 1.707.707a1 1 0 1 0 1.414-1.414A4.41 4.41 0 0 0 17.586 0zM0 13c0-3.75 0-5.625.955-6.939A5 5 0 0 1 2.06 4.955C3.375 4 5.251 4 9 4h6c3.75 0 5.625 0 6.939.955a5 5 0 0 1 1.106 1.106C24 7.375 24 9.251 24 13s0 5.625-.955 6.939a5 5 0 0 1-1.106 1.106C20.625 22 18.749 22 15 22H9c-3.75 0-5.625 0-6.939-.955A5 5 0 0 1 .955 19.94C0 18.625 0 16.749 0 13m10.84-2.943c0-.476.183-.689.376-.82C11.46 9.066 11.79 9 12 9s.539.068.784.236c.193.132.376.345.376.821 0 .285-.104.401-.73.938-.583.499-1.43 1.27-1.43 2.765a1 1 0 1 0 2 0c0-.563.233-.82.73-1.246l.111-.093c.484-.406 1.319-1.105 1.319-2.364 0-1.17-.537-1.985-1.245-2.47A3.5 3.5 0 0 0 12 7c-.51 0-1.261.138-1.916.587-.707.485-1.244 1.3-1.244 2.47a1 1 0 1 0 2 0M12 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5'
            clip-rule='evenodd'
          ></path>
        </svg>
        <Text className='ml-3 text-[16px] _bf'>Custom Questions</Text>
      </div>
      <div className='mt-3 flex flex-col'>
        <div className='w-full '>
          <form className=''>
            <div className='w-full  rounded-xl flex flex-col items-stretch justify-between'>
              {data &&
                form.length > 3 &&
                form.slice(3).map((question, index) => (
                  <>
                    <div className='border shadow-md px-4 py-2 rounded-xl flex flex-row items-center justify-between mt-3'>
                      <InputUpdate index={index} question={question} key={question._id} handleChangeElement={handleChangeElement} />

                      <button
                        className=' px-4 py-2 text-white-A700 bg-red rounded-xl opacity-90 hover:opacity-100 hover:text-slate-50 hover:border-2 hover:border-[#42C2FF] duration-300'
                        type='button'
                        onClick={() => handleDeleteQuestion(question._id)}
                      >
                        Delete
                      </button>
                      <button
                        className='px-4 py-2 text-white-A700 bg-[#34B3F1] rounded-xl opacity-90 hover:opacity-100 hover:text-slate-50 hover:border-2 hover:border-[#42C2FF] duration-300'
                        type='button'
                        onClick={handleSubmit}
                      >
                        Update
                      </button>
                    </div>
                  </>
                ))}
            </div>
          </form>
        </div>
        <Button className='w-[150px] mt-5  bg-gray-300 !hover:bg-gray-400 flex flex-row items-center justify-between' onClick={() => setOpen(true)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            viewBox='0 0 24 24'
            className='w-[16px] h-[16px]'
          >
            <path d='M12 5v14M5 12h14'></path>
          </svg>
          <Text>Add Question</Text>
        </Button>
      </div>
      <Modal title='Add New Question' footer centered open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)}>
        <CreateFormRegister  isHaveForm={true} />
      </Modal>
    </div>
  )
}

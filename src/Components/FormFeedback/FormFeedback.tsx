import { useMutation, useQuery } from '@tanstack/react-query'
import { Skeleton } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { EventStatus } from 'src/@types/enum'
import { EventQuestionType } from 'src/@types/form.type'
import eventApi from 'src/apis/event.api'
import { formAPI } from 'src/apis/form.api'

type Question = {
  id: string
  description: string
  messageError: string
}

type FormFeedBack = {
  questions: Array<Question>
}

const initForm: FormFeedBack = {
  questions: [
    {
      id: new Date().toISOString(),
      description: '',
      messageError: ''
    }
  ]
}

const FormFeedback = () => {
  const [form, setForm] = useState<FormFeedBack>(initForm)
  const { id } = useParams()

  const { data, isFetching } = useQuery({
    queryKey: ['form_register_event'],
    queryFn: () => eventApi.getEventById(id as string)
  })

  const createFormEventFeedBackMutation = useMutation({
    mutationFn: ({
      id,
      body
    }: {
      id?: string
      body: { questions: Array<string>; type: EventQuestionType }
    }) => formAPI.createForm(id, body)
  })

  const handleNewQuestion = () => {
    const question = {
      id: new Date().toISOString(),
      description: '',
      messageError: ''
    }

    setForm((prevForm) => {
      const newQuestions = form.questions
      newQuestions.push(question)
      return {
        ...prevForm,
        questions: newQuestions
      }
    })
  }

  const handleChangeElement =
    (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target

      setForm((prevForm) => ({
        ...prevForm,
        questions: prevForm.questions.map((question) => {
          if (question.id === id) {
            return { ...question, description: value }
          }
          return question
        })
      }))
    }

  const handleDeleteQuestion = (id: string) => () => {
    setForm((prevForm) => {
      const listQuestion = prevForm.questions
      const result = listQuestion.filter((question) => question.id !== id)

      return {
        ...prevForm,
        questions: result
      }
    })
  }

  const handleValidateQuestion = (): {
    listQuestionError: Array<Question>
    count: number
  } => {
    const listQuestionError = form.questions
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
      setForm((prevForm) => ({
        ...prevForm,
        questions: result.listQuestionError
      }))
      return
    }

    const questions: Array<string> = []
    for (let index = 0; index < form.questions.length; index++) {
      questions.push(form.questions[index].description)
    }

    createFormEventFeedBackMutation.mutate(
      {
        id,
        body: {
          questions,
          type: EventQuestionType.FEEDBACK
        }
      },
      {
        onSuccess: (data) => {
          console.log(data)
          toast.success('Create form feedback event sucessfully')
        }
      }
    )
  }

  return (
    <>
      {isFetching && (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      )}
      {!isFetching && (
        <div className='flex flex-col justify-center items-center w-[95%]'>
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
            <div className='mx-2 hover:text-gray-600'>Create Form Feedback</div>
            <div className='bg-white-A700 h-[0.5px] w-8'></div>
          </div>
          <div>
            {' '}
            <button
              type='button'
              className='mt-8 w-[300px] h-[54px] text-white-A700 bg-[#41B06E] hover:opacity-90 rounded-xl hover:text-slate-300 hover:border-gray-700 duration-300'
              onClick={handleNewQuestion}
            >
              New Question
            </button>
          </div>
          <form className='grid grid-cols-2 gap-4'>
            {form.questions.map((question, index) => (
              <div className='flex flex-col' key={question.id}>
                <div className='flex flex-col gap-2 relative' key={question.id}>
                  <label className='text-gray-600'>Question {index + 1}</label>
                  <input
                    type='text'
                    className={`pl-4 h-[54px] outline-none text-black-900 bg-white-A700 rounded-xl border-[2px] duration-300 ${question.messageError != '' ? 'border border-rose-700' : 'hover:border-gray-800 focus:border-gray-700'}`}
                    value={question.description}
                    onChange={handleChangeElement(question.id)}
                  />

                  <button
                    type='button'
                    className='h-6 w-6 absolute right-3 bottom-[20%] rounded-md'
                    onClick={handleDeleteQuestion(question.id)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-full h-full rounded-sm hover:stroke-red hover:text-white-A700'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                      />
                    </svg>
                  </button>
                </div>
                <span className='text-rose-700  pt-1'>
                  {question.messageError}
                </span>
              </div>
            ))}

            <button
              type='submit'
              className='mt-8 w-[300px] h-[54px] text-white-A700 bg-[#3DC2EC] hover:opacity-90 rounded-xl hover:text-slate-300  hover:border-gray-700 duration-300 disabled:opacity-75'
              disabled={form.questions.length !== 0 ? false : true}
              onClick={handleSubmit}
            >
              Create form feedback
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default FormFeedback

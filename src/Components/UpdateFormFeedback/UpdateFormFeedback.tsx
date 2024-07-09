import { useParams } from 'react-router-dom'
import EventOfForm from '../EventOfForm/EventOfForm'
import { useMutation, useQuery } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'
import { EventQuestionType } from 'src/@types/form.type'
import { useEffect, useState } from 'react'
import InputUpdate from '../InputUpdate/InputUpdate'
import { formAPI } from 'src/apis/form.api'
import { toast } from 'react-toastify'

type Question = {
  _id: string
  description: string
  messageError: string
}

const UpdateFormFeedback = () => {
  const [form, setForm] = useState<Array<Question>>([])
  const { id } = useParams()

  const { data } = useQuery({
    queryKey: ['form_feedback_update'],
    queryFn: () => eventApi.getFormFeedback(id as string)
  })

  const updateFormEventFeedBackMutation = useMutation({
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

  const handleChangeElement =
    (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

    updateFormEventFeedBackMutation.mutate(
      {
        id,
        body: {
          questions,
          type: EventQuestionType.FEEDBACK
        }
      },
      {
        onSuccess: () => {
          toast.success('Update form feedback event sucessfully')
        }
      }
    )
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center w-[95%]'>
        <EventOfForm render={'Update form feedback'} id={id as string} />
        <form className='grid grid-cols-2 gap-4'>
          {data &&
            form.length !== 0 &&
            form.map((question, index) => (
              <InputUpdate
                index={index}
                question={question}
                key={question._id}
                handleChangeElement={handleChangeElement}
              />
            ))}
          <button
            className='mt-8 h-[54px] w-[300px] text-white-A700 bg-[#34B3F1] rounded-xl opacity-90 hover:opacity-100 hover:text-slate-50 hover:border-2 hover:border-[#42C2FF] duration-300'
            type='button'
            onClick={handleSubmit}
          >
            Update question
          </button>
        </form>
      </div>
    </>
  )
}

export default UpdateFormFeedback
